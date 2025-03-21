
import dataGridColumn from './datagridcolumn.js';

const dataGridTemplate = `
<div class="fd-datagrid">
	<DataGridColumn v-for="(c, ix) in item.Items" :item=c :key=ix :cont=cont />
</div>
`;

export default {
	template: dataGridTemplate,
	props: {
		item: Object,
		cont: Object
	},
	components: {
		'DataGridColumn': dataGridColumn
	}
};
