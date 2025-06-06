
const toolboxItemTemplate = `
<li class="fd-tbox-item" :draggable="true" @dragstart.stop=dragStart>
	<i class="ico" :class="icon"/>
	<span v-text=label />
	<span v-text=item.Is v-if="false" />
</li>
`;

function itemIcon(itmis) {
	switch (itmis) {
		case 'Grid': return 'ico-table';
		case 'CheckBox': return 'ico-checkbox-checked';
		case 'TextBox': return 'ico-rename';
	}
	return 'ico-grid';
}

export default {
	template: toolboxItemTemplate,
	props: {
		label: String,
		item: Object,
		cont: Object
	},
	computed: {
		icon() { return itemIcon(this.item.Is); }
	},
	methods: {
		dragStart(ev) {
			console.dir(this.cont);
			this.cont.select(this.item);
			ev.dataTransfer.effectAllowed = "move";
		}
	}
};
