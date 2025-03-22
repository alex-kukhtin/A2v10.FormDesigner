
import layoutItem from './layoutelem.js';

const buttonTemplate = `
<button class="btn btn-tb" @click.stop.prevent="select" :class="{ selected }" :draggable=true >
	<i class="ico ico-reload" />
	<span v-if="item.Label" v-text="item.Label" />	
</button>
`;

export default {
	template: buttonTemplate,
	extends: layoutItem
};
