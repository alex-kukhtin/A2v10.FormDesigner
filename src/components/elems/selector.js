
import control from './control.js';

const selectorTemplate = `
<div class="fd-selector" @click.stop.self=select>
SELECTOR
{{item}}
</div>
`;

export default {
	template: selectorTemplate,
	extends: control,
	props: {
		item: Object	
	},
};
