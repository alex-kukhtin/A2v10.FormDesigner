
import gridPlaceholder from './placeholder';
import gridItem from './item';
import layoutelem from './layoutelem';

const stackPanelTemplate = `
<div class="fd-elem-stackpanel stack-panel" @click.stop=select :style=spStyle :class="{selected}">
	<fd-grid-item v-for="(itm, ix) in item.Items" :item=itm :key=ix :cont=cont />
</div>
`;

export default {
	name: 'stackpanel',
	extends: layoutelem,
	template: stackPanelTemplate,
	components: {
		'fd-grid-ph': gridPlaceholder,
		'fd-grid-item': gridItem
	},
	props: {
		item: Object,
		cont: Object
	},
	computed: {
		props() {
			return this.item.Props || {};
		},
		stStyle() {
			return {
				height: this.item.Height || ''
			}
		},
	}
};
