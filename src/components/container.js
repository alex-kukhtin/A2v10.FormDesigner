
import taskpad from './taskpad';
import toolbar from './toolbar';
import gridElem from './elems/grid';
import lineElem from './elems/line';

const containerTemplate = `
<div class="fd-container" @click.stop.self=clickBody>
	<fd-toolbar></fd-toolbar>
	<fd-taskpad :item=selectedItem :fields=fields :cont=cont :components=components />
	<div class="fd-main">
		<div class=fd-body  @click.stop.self=clickBody>
			<component v-for="(itm, ix) in form.Items" :key="ix" :is="itm.Is"
				:item="itm" :cont=cont />
		</div>
		<div class="fd-page-taskpad">
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
		'HLine': lineElem
	},
	props: {
		form: Object,
		fields: Array,
		components: Array
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
				isActive: (itm) => itm === this.selectedItem
			}
		}
	},
	methods: {
		clickBody() {
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
