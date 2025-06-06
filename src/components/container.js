
import taskpad from './taskpad';
import gridElem from './elems/grid';
import stackPanelElem from './elems/stackpanel';
import lineElem from './elems/line';
import dlgButtons from './elems/dlgbuttons';
import frmTaskpad from './elems/taskpad';
import itemToolbar from './elems/toolbar';

function dataType2Is(dt) {
	switch (dt) {
		case "reference": return "Selector";
		case "bit": return "CheckBox";
		case "date":
		case "datetime": return "DatePicker";
	}
	return "TextBox";
}

function field2component(f) {
	return {
		Data: f.Name,
		Label: f.Label || `@${f.Name}`,
		Is: dataType2Is(f.DataType)
	};
}

const containerTemplate = `
<div class="fd-container" @keyup.self=keyUp tabindex=0 >
	<fd-taskpad :item=selectedItem :fields=componentFields :cont=cont :components=components :host=host />
	<div class="fd-main" @click.stop.stop=clickBody>
		<div class=fd-body  @click.stop.stop=clickBody :class="bodyClass" :style="bodyStyle">
			<div v-if="isDialog" class="modal-header">
				<span class="modal-title" v-text="form.Label"/>
				<button tabindex="-1" class="btnclose">✕</button>
			</div>
			<div v-if="isPage" class="fd-tabs-header">
				<div class="fd-tab-title" v-text="form.Label"/>
			</div>
			<div class="fd-content">
				<div v-if="hasToolbar" class="form-toolbar">
					<Toolbar :item="form.Toolbar" :cont=cont class="page-toolbar" :is-page="true"/>
				</div>
				<component v-for="(itm, ix) in form.Items" :key="ix" :is="itm.Is"
					:item="itm" :cont=cont />
				<Taskpad :item="form.Taskpad" :cont=cont v-if="hasTaskpad"/>
			</div>
			<dlg-buttons v-if="isDialog" :elems="form.Buttons" :cont=cont />
		</div>
	</div>
</div>
`;

function isContainer(isElem) {
	return isElem === 'Grid' || isElem === 'StackPanel';
}

Vue.component('Grid', gridElem);
Vue.component('StackPanel', stackPanelElem);

Vue.component('fd-container', {
	template: containerTemplate,
	components: {
		'fd-taskpad': taskpad,
		'dlg-buttons': dlgButtons,
		'HLine': lineElem,
		'Taskpad': frmTaskpad,
		'Toolbar': itemToolbar
	},
	props: {
		form: Object,
		fields: Array,
		components: Array,
		host: Object
	},
	data() {
		return {
			selectedItem: null
		};
	},
	computed: {
		cont() {
			return {
				select: this.$selectItem,
				drop: this.$dropItem,
				isActive: (itm) => itm === this.selectedItem,
				canDrop: this.$canDrop
			}
		},
		hasTaskpad() {
			return this.form.Taskpad && this.form.Taskpad.Items.length;
		},
		hasToolbar() {
			return this.form.Toolbar && this.form.Toolbar.Items.length;
		},
		bodyClass() {
			return this.form.Is.toLowerCase();
		},
		bodyStyle() {
			let el = {};
			if (this.isDialog)
				el.width = this.form.Width;
			return el;
		},
		isDialog() {
			return this.form.Is === 'Dialog';
		},
		isPage() {
			return this.form.Is === 'Page';
		},
		componentFields() {
			return this.fields.map(field2component);
		},
		canDeleteItem() {
			return this.selectedItem && this.selectedItem !== this.form;
		},
	},
	watch: {
		canDeleteItem(val) {
			if (this.host)
				this.host.canDeleteItemChanged(val);
		}
	},
	methods: {
		clickBody() {
			this.selectedItem = this.form;	
		},
		keyUp(ev) {
			console.dir(ev.which);
			switch (ev.which) {
				case 46: /* del */ this.deleteItem();
					break;
			}
		},
		deleteItem() {
			if (!this.selectedItem) return;
			if (this.selectedItem === this.form) return;
			this.selectedItem.$remove();
			this.selectedItem = this.form;
		},
		$selectItem(item) {
			this.selectedItem = item;
		},
		$canDrop(target) {
			let si = this.selectedItem;
			if (!si) return false;
			if (target === 'grid')
				return si.Is !== 'Button' && si.Is !== 'DataGridColumn';
			return true;
		},
		$dropItem(rc) {
			if (!this.selectedItem) return;

			//console.dir(this.selectedItem);
			//console.dir(rc);

			let sg = this.selectedItem || {};

			if (!sg.Grid) {
				// clone element
				let no = rc.grid.Items.$append(this.selectedItem);
				no.Grid = { Row: rc.row, Col: rc.col };	
				this.selectedItem = no;
				return;
			}

			let fg = this.selectedItem.$parent;

			if (fg && fg.Is === 'Grid' && fg !== rc.grid) {
				this.selectedItem.$remove();
				rc.grid.Items.$append(this.selectedItem);
			}
			this.selectedItem.Grid = { Row: rc.row, Col: rc.col, ColSpan: sg.ColSpan, RowSpan: sg.RowSpan };
		}
	},
	mounted() {
		this.selectedItem = this.form;
		this.host.init(this);
	}
});
