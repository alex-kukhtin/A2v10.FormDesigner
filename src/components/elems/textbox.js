
import control from './control.js';

const textBoxTemplate = `
<div class="fd-textbox form-group">
<label>Form Label</label>
<span v-text="item.Props.Data" class="input-group"></span>
</div>
`;

export default {
	template: textBoxTemplate,
	extends: control,
	props: {
		item: Object	
	}
};
