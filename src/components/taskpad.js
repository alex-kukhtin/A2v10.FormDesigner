
import toolboxElem from './toolbox';
import propsheetElem from './propsheet';

const taskpadTemplate = `
<div class="fd-taskpad">
	<ul class="fd-tabbar">
		<li :class="{active: activeTab === 'tbox'}" @click.stop.prevent="activeTab = 'tbox'">Toolbox</li>
		<li :class="{active: activeTab === 'props'}" @click.stop.prevent="activeTab = 'props'">Properties</li>
	</ul>
	<toolbox v-if="activeTab === 'tbox'" />	
	<propsheet v-if="activeTab === 'props'" :item=item />
</div>
`;

export default {
	template: taskpadTemplate,
	props: {
		item: Object	
	},
	components: {
		'toolbox': toolboxElem,
		'propsheet': propsheetElem
	},
	data() { 
		return {
			activeTab: 'tbox'
		};
	},
	computed: {
		props() {
			return this.item ? this.item.Props : [];
		}
	},
	methods: {

	}
};
