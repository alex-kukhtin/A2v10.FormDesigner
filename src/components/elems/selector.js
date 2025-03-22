
import control from './control.js';

const selectorTemplate = `
<div class="fd-selector form-group">
<label v-text="item.Label" v-if="item.Label"/>
<span v-text="item.Data" class="input-group" />
</div>
`;

export default {
	template: selectorTemplate,
	extends: control
};
