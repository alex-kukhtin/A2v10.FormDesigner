
import taskpad from './taskpad';
import toolbar from './toolbar';
import gridElem from './elems/grid';
import lineElem from './elems/line';

const containerTemplate = `
<div class="fd-container" @click.stop.self=clickBody>
	<fd-toolbar></fd-toolbar>
	<fd-taskpad :item=selectedItem></fd-taskpad>
	<div class=fd-body  @click.stop.self=clickBody>
		<component v-for="(itm, ix) in form.Items" :key="ix" :is="itm.Is"
			:item="itm" :cont=cont></component>
	</div>
</div>
`;

Vue.component('Grid', gridElem);

Vue.component('fd-container', {
	template: containerTemplate,
	components: {
		'fd-toolbar': toolbar,
		'fd-taskpad': taskpad,
		'HLine': lineElem
	},
	props: {
		form: Object
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
			this.selectedItem = null;	
		},
		findGridByItem(tf) {
			function findInContainer(el, tf) {
				if (!el || !el.Items) return null;
				for (let i = 0; i < el.Items.length; i++) {
					let x = el.Items[i];
					if (x === tf) return el;
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
			let fg = this.findGridByItem(this.selectedItem);
			if (fg && fg.Is === 'Grid' && fg !== rc.grid) {
				let ix = fg.Items.indexOf(this.selectedItem);
				fg.Items.splice(ix, 1);
				rc.grid.Items.push(this.selectedItem);
			}
			this.selectedItem.Props['Grid.Row'] = rc.row;
			this.selectedItem.Props['Grid.Col'] = rc.col;
			
		}
	}
});
