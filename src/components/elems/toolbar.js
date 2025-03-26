
import control from './control';
import button from './tbbutton';
import aligner from './aligner';
import textBox from './textbox';

import inputControls from './inputcontrol'

export default {
	template: `<div class="toolbar" @dragover=dragOver @drop=drop >
		<component :is="item.Is" v-for="(item, ix) in item.Items" :item="item" :key="ix" :cont=cont />
	</div>`,
	extends: control,
	components: {
		'Button': button,
		'Aligner': aligner,
		'TextBox': textBox,
		'SearchBox': inputControls.searchBox
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
