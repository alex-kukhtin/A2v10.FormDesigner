
import control from './control.js';

const textBoxTemplate = `
<div class="fd-textbox" @click.stop.self=select>
TEXTBOX
{{item}}
</div>
`;

export default {
	template: textBoxTemplate,
	extends: control,
	props: {
		item: Object	
	}
};
