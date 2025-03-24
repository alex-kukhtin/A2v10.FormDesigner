
import layoutItem from './layoutelem.js';

const alignerTemplate = `
<div class="aligner" @click.stop.prevent="select" :class="{ selected }" :draggable=true
		@dragstart.stop=dragStart >
</div>
`;

export default {
	template: alignerTemplate,
	extends: layoutItem,
	methods: {
		dragStart(ev) {
			console.dir('drag start aligner');
			this.cont.select(this.item);
			ev.dataTransfer.effectAllowed = "move";
			ev.dataTransfer.setData('text/plain', this.item.Is);
		}
	}
};
