
import dataGridColumn from './datagridcolumn.js';

const dataGridTemplate = `
<div class="fd-datagrid" @dragover=dragOver @drop=drop :style=elemStyle >
	<table>
		<tr>
			<DataGridColumn v-for="(c, ix) in item.Items" :item=c :key=ix :cont=cont />
		</tr>
	</table>
	<div class="fd-grid-handle">▷</div>
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
	},
	methods: {
		dragOver(ev) {
			ev.preventDefault();
		},
		drop(ev) {
			alert('drop data grid');
		}
	},
	computed: {
		elemStyle() {
			return {
			}
		}
	}
};
