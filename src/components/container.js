
import taskpad from './taskpad';
import toolbar from './toolbar';
import gridElem from './elems/grid';

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

Vue.component('fd-container', {
	template: containerTemplate,
	components: {
		'fd-toolbar': toolbar,
		'fd-taskpad': taskpad,
		'Grid': gridElem
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
				select: this.$selectItem
			}
		}
	},
	methods: {
		clickBody() {
			this.selectedItem = null;	
		},
		$selectItem(item) {
			this.selectedItem = item;
		}
	}
});
