
import control from './control.js';

const periodPickerTemplate = `
<div class="control-group period-picker" :style=controlStyle >
	<label v-text="item.Label" v-if="item.Label"/>
	<div class="input-group">
		<span v-text="item.Data" class="input text-center"/>
		<span class="caret" />
	</div>
</div>
`;

export default {
	template: periodPickerTemplate,
	extends: control
};
