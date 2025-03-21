
import textBox from './textbox.js';
import selector from './selector.js';
import control from './control.js';

const gridTemplate = `
<div class="fd-elem-grid" @click=select>
	GRID
	{{item}}
	<component @click="select" v-for="(itm, ix) in item.Items"
		:key="ix" :is="itm.Is" :item="itm" :cont="cont"></component>
</div>
`;

export default {
	template: gridTemplate,
	extends: control,
	components: {
		'TextBox': textBox,
		'Selector': selector
	},
	props: {
		item: Object,
		cont: Object
	}
};
