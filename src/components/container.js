
import taskpad from './taskpad';
import toolbar from './toolbar';
import gridElem from './elems/grid';
import lineElem from './elems/line';
import dlgButtons from './elems/dlgbuttons';
import frmTaskpad from './elems/taskpad';

const containerTemplate = `
<div class="fd-container" @keyup.self=keyUp tabindex=0 >
	<fd-toolbar :host=host></fd-toolbar>
	<fd-taskpad :item=selectedItem :fields=fields :cont=cont :components=components :host=host />
	<div class="fd-main" @click.stop.stop=clickBody>
		<div class=fd-body  @click.stop.stop=clickBody :class="bodyClass" :style="bodyStyle">
			<div v-if="isDialog" class="modal-header">
				<span class="modal-title" v-text="form.Label"/>
				<button tabindex="-1" class="btnclose">✕</button>
			</div>
			<div class="fd-content">
				<component v-for="(itm, ix) in form.Items" :key="ix" :is="itm.Is"
					:item="itm" :cont=cont />
			</div>
			<component :is="form.Taskpad.Is" :item="form.Taskpad" :cont=cont v-if="form.Taskpad" />
			<dlg-buttons v-if="isDialog" :elems="form.Buttons" :cont=cont />
		</div>
	</div>
</div>
`;

function isContainer(isElem) {
	return isElem === 'Grid';
}

Vue.component('Grid', gridElem);

Vue.component('fd-container', {
	template: containerTemplate,
	components: {
		'fd-toolbar': toolbar,
		'fd-taskpad': taskpad,
		'dlg-buttons': dlgButtons,
		'HLine': lineElem,
		'Taskpad': frmTaskpad
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
			console.dir(this.form);
			return this.form.Is === 'Dialog';
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
			let g = this.findGridByItem(this.selectedItem);
			if (!g || g.Is !== 'Grid') return;
			let ix = g.Items.indexOf(this.selectedItem);
			if (ix < 0) return;
			g.Items.splice(ix, 1);
			this.selectedItem = this.form;
		},
		findGridByItem(tf) {
			function findInContainer(el, tf) {
				if (!el || !el.Items) return null;
				for (let i = 0; i < el.Items.length; i++) {
					let x = el.Items[i];
					if (x === tf) return el;
					if (!isContainer(x.Is))
						continue;
					let res = findInContainer(x, tf);
					if (res) return res;	
				}
				return null;
			}
			return findInContainer(this.form, tf);
		},
		$selectItem(item) {
			this.selectedItem = item;
		},
		$canDrop(target) {
			let si = this.selectedItem;
			if (!si) return false;
			console.dir(si.Is);
			if (target === 'grid')
				return si.Is !== 'Button' && si.Is !== 'DataGridColumn';
			return true;
		},
		$dropItem(rc) {
			if (!this.selectedItem) return;
			console.dir(this.selectedItem);
			console.dir(rc);

			if (!this.selectedItem.row && !this.selectedItem.col) {
				let no = Object.assign({}, this.selectedItem);
				no.Items = [];
				no.row = rc.row;	
				no.col = rc.col;	
				rc.grid.Items.push(no);
				this.selectedItem = no;
				return;
			}

			// selectedItem может быть новым элементом	
			let fg = this.findGridByItem(this.selectedItem);
			if (fg && fg.Is === 'Grid' && fg !== rc.grid) {
				let ix = fg.Items.indexOf(this.selectedItem);
				fg.Items.splice(ix, 1);
				rc.grid.Items.push(this.selectedItem);
			}
			this.selectedItem.row = rc.row;
			this.selectedItem.col = rc.col;			
		}
	},
	mounted() {
		this.selectedItem = this.form;
	}
});
