
import control from './control.js';

const textBoxTemplate = `
<div class="control-group" :style=controlStyle >
<label v-text="item.Label" v-if="item.Label" />
	<div class="input-group">
		<span v-text="item.Data" class="input" :class="inputClass"/>
	</div>
</div>
`;

export default {
	template: textBoxTemplate,
	extends: control,
	computed: {
		inputClass() {
			return this.item.Props && this.item.Props.Multiline ? 'multiline' : undefined;
		}
	}
};
