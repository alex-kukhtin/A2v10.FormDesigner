
import control from "./control";
import button from "./tbbutton";

export default {
	template: `<div class="toolbar" @dragover=dragOver @drop=drop >
		<Button v-for="(item, ix) in item.Items" :item="item" :key="ix" :cont=cont />
	</div>`,
	extends: control,
	components: {
		'Button': button
	},
	methods: {
		dragOver(ev) {
			ev.preventDefault();
		},
		drop(ev) {
			alert('drop toolbar');
		}
	}
};
