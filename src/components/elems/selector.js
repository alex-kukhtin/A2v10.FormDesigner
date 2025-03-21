
import control from './control.js';

const selectorTemplate = `
<div class="fd-selector">
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
