
import layoutItem from './layoutelem.js';

const buttonTemplate = `
<button @click.stop.prevent="select" class="btn a2-inline" :class="btnClass" :draggable=true
	@dragstart.stop=dragStart v-text="item.Label">
</button>
`;

export default {
	template: buttonTemplate,
	extends: layoutItem,
	computed: {
		btnClass() {
			return {
				selected: this.selected,
				'btn-primary': this.item.Props?.Style === 'Primary'
			};
		}
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
