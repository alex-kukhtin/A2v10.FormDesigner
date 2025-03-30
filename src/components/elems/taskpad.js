
import panel from './panel';
import layoutelem from './layoutelem';

const taskpadTemplate = `
<div class="fd-elem-taskpad"  @click.stop=select :class="{selected}">
	<component v-for="(itm, ix) in item.Items" :key="ix" :is="itm.Is"
		:item="itm" :cont=cont />
</div>
`;

export default {
	template: taskpadTemplate,
	extends: layoutelem,
	components: {
		'Panel': panel
	},
	props: {
		item: Object,
		cont: Object
	}
};
