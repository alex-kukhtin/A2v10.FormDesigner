
import control from "./control";
import button from "./tbbutton";

export default {
	template: `<div class="toolbar">
		<Button v-for="(item, ix) in item.Items" :item="item" :key="ix" :cont=cont />
	</div>`,
	extends: control,
	components: {
		'Button': button
	}
};
