
import toolboxItem from './toolboxitem';

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
		components: Array,
		cont: Object
	},
	computed: {
	},
	methods: {

	}
};
