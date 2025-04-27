
import toolboxItem from './toolboxitem';

const defaultControls = [
	{ Is: 'Grid', Props: {Rows: 'auto auto', Columns: 'auto auto'} },
	{ Is: 'Button' },
	{ Is: 'Panel' },
]

const toolboxTemplate = `
<div class="fd-toolbox">
	<details open>
		<summary>Form Controls</summary>
		<ul>
			<toolboxitem v-for="(f, ix) in components" :key=ix :item=f :label=f.Is :cont=cont />
		</ul>
	</details>
	<details open>
		<summary>Data</summary>
		<ul>
			<toolboxitem v-for="(f, ix) in fields" :key=ix :item=f :label=f.Data :cont=cont />
		</ul>
	</details>
</div>
`;

export default {
	template: toolboxTemplate,
	components: {
		toolboxitem: toolboxItem
	},
	props: {
		fields: Array,
		cont: Object
	},
	computed: {
		components() {
			return defaultControls;
		}
	},
	methods: {

	}
};
