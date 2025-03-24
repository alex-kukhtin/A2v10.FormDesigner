
import control from './control.js';

const datePickerTemplate = `
<div class="control-group">
	<label v-text="item.Label" v-if="item.Label"/>
	<div class="input-group">
		<span v-text="item.Data" class="input text-center"/>
		<a>
			<i class="ico ico-calendar" />
		</a>
	</div>
</div>
`;

export default {
	template: datePickerTemplate,
	extends: control
};
