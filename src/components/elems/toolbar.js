﻿
import layout from './layoutelem';
import button from './tbbutton';
import aligner from './aligner';
import textBox from './textbox';

import inputControls from './inputcontrol'

export default {
	template: `<div class="toolbar" @dragover=dragOver @drop=drop >
		<component :is="item.Is" v-for="(item, ix) in item.Items" :item="item" :key="ix" :cont=cont />
		<div v-if="!isPage" class="fd-grid-handle">▷</div>
	</div>`,
	extends: layout,
	props: {
		isPage: Boolean,
	},
	components: {
		'Button': button,
		'Aligner': aligner,
		'TextBox': textBox,
		'SearchBox': inputControls.searchBox,
		'Separator': inputControls.separator,
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
