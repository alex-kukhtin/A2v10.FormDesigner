
import control from './control.js';

const selectorTemplate = `
<div class="control-group">
<label v-text="item.Label" v-if="item.Label"/>
	<div class="input-group">
		<span v-text="item.Data" class="input" />
		<a>
			<i class="ico ico-search" />
		</a>
	</div>
</div>
`;

export default {
	template: selectorTemplate,
	extends: control
};
