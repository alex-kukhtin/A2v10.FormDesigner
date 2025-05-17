
const toolboxItemTemplate = `
<li class="fd-tbox-item" :draggable="true" @dragstart.stop=dragStart>
	<i class="ico ico-rename" />
	<span v-text=label />
</li>
`;

export default {
	template: toolboxItemTemplate,
	props: {
		icon: String,
		label: String,
		item: Object,
		cont: Object
	},
	methods: {
		dragStart(ev) {
			console.dir(this.cont);
			this.cont.select(this.item);
			ev.dataTransfer.effectAllowed = "move";
		}
	}
};
