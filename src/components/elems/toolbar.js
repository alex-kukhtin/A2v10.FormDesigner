﻿
import layout from './layoutelem';
import button from './tbbutton';
import aligner from './aligner';
import textBox from './textbox';

import inputControls from './inputcontrol'

export default {
	template: `<div class="toolbar" @dragover=dragOver @drop=drop @click.stop.prevent=select :class="{ selected }">
		<component :is="item.Is" v-for="(item, ix) in item.Items" :item="item" :key="ix" :cont=cont />
		<div class="fd-grid-handle">▷</div>
	</div>`,
	extends: layout,
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
