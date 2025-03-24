
import layoutItem from './layoutelem.js';

const buttonTemplate = `
<button @click.stop.prevent="select" class="btn a2-inline" :class="{ selected, 'btn-primary': item.Primary }" :draggable=true
	@dragstart.stop=dragStart v-text="item.Label">
</button>
`;

export default {
	template: buttonTemplate,
	extends: layoutItem,
	computed: {
	},
	methods: {
		dragStart(ev) {
			console.dir('drag start button');
			this.cont.select(this.item);
			ev.dataTransfer.effectAllowed = "move";
			ev.dataTransfer.setData('text/plain', this.item.Is);
		}
	}
};
