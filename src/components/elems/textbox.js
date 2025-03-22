
import control from './control.js';

const textBoxTemplate = `
<div class="fd-textbox form-group">
<label v-text="item.Label" v-if="item.Label"/>
<span v-text="item.Data" class="input-group" />
</div>
`;

export default {
	template: textBoxTemplate,
	extends: control
};
