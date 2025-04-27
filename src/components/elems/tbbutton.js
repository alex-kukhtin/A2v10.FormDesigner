
import layoutItem from './layoutelem.js';

const buttonTemplate = `
<button class="btn btn-tb" @click.stop.prevent="select" :class="{ selected }" :draggable=true
		@dragstart.stop=dragStart >
	<i class="ico" :class=icon />
	<span v-if="item.Label" v-text="item.Label" />	
</button>
`;

const cmdMap = {
	Edit: 'ico-edit',
	EditSelected: 'ico-edit',
	New: 'ico-add',
	Save: 'ico-save-outline',
	SaveAndClose: 'ico-save-close-outline',
	Apply: 'ico-apply',
	UnApply: 'ico-unapply',
	Create: 'ico-add',
	Delete: 'ico-clear',
	Reload: 'ico-reload',
	Print: 'ico-print',
	DeleteSelected: 'ico-clear',
}

export default {
	template: buttonTemplate,
	extends: layoutItem,
	computed: {
		icon() {
			return cmdMap[this.item.Command.Command] || 'ico-menu';
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
