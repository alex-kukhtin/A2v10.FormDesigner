
import layoutItem from './layoutelem.js';

const buttonTemplate = `
<button class="btn btn-tb" @click.stop.prevent="select" :class="{ selected }" :draggable=true
		@dragstart.stop=dragStart >
	<i class="ico" :class=icon />
	<span v-if="item.Label" v-text="item.Label" />	
</button>
`;

export default {
	template: buttonTemplate,
	extends: layoutItem,
	computed: {
		icon() {
			switch (this.item.Command.Command) {
				case 'Edit':
				case 'EditSelected':
					return 'ico-edit';
				case 'New': return 'ico-add';
				case 'Save': return 'ico-save-outline';
				case 'SaveAndClose': return 'ico-save-close-outline';
				case 'Apply': return 'ico-apply';
				case 'Create': return 'ico-add';
				case 'Delete': return 'ico-clear';
				case 'Reload': return 'ico-reload';
			}
			return 'ico-menu';
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
