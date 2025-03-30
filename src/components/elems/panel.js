
import layoutelem from './layoutelem';

const panelTemplate = `
<div class="fd-panel panel panel-transparent" @click.stop=select :class="{selected}">
	<div class="panel-header">
		<div v-text="item.Label" class="panel-header-slot" />
		<span class="ico panel-collapse-handle" />
	</div>
	<component v-for="(itm, ix) in item.Items" :key="ix" :is="itm.Is"
		:item="itm" :cont=cont />
</div>
`;

export default {
	template: panelTemplate,
	extends: layoutelem,
	props: {
		item: Object,
		cont: Object
	}
};
