
import layoutItem from './layoutelem.js';

const dataGridColumnTemplate = `
<td class="fd-datagrid-column" @click.stop.prevent="select" :class="{ selected }"
	:draggable=true @dragstart.stop=dragStart>
	<div v-text="item.Label" class="label" />
	<div v-text="item.Data" class="column" />
</td>
`;

export default {
	template: dataGridColumnTemplate,
	extends: layoutItem,
	methods: {
		dragStart(ev) {
			console.dir('drag start column');
			this.cont.select(this.item);
			ev.dataTransfer.effectAllowed = "move";
			ev.dataTransfer.setData('text/plain', JSON.stringify({ row: this.row, col: this.col }));
		}
	}
};
