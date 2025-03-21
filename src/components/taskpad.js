
const taskpadTemplate = `
<div class="fd-taskpad">
	<ul class="fd-tabbar">
		<li :class="{active: activeTab === 'tbox'}" @click.stop.prevent="activeTab = 'tbox'">Toolbox</li>
		<li :class="{active: activeTab === 'props'}" @click.stop.prevent="activeTab = 'props'">Properties</li>
	</ul>
	<div>{{props}}</div>
</div>
`;

export default {
	template: taskpadTemplate,
	props: {
		item: Object	
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
