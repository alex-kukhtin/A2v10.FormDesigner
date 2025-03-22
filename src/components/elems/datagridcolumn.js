
import layoutItem from './layoutelem.js';

const dataGridColumnTemplate = `
<div class="fd-datagrid-column" @click.stop.prevent="select" :class="{ selected }"
	:draggable=true >
	<div v-text="item.Label" class="label" />
	<div v-text="item.Data" class="column" />
</div>
`;

export default {
	template: dataGridColumnTemplate,
	extends: layoutItem
};
