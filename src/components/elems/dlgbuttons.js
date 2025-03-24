
import control from "./control";
import button from "./button";

export default {
	template: `<div class="modal-footer" @dragover=dragOver @drop=drop >
		<component :is="itm.Is" v-for="(itm, ix) in elems"
			:item="itm" :key="ix" :cont=cont />
	</div>`,
	extends: control,
	props: {
		elems: Array
	},
	components: {
		'Button': button,
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
