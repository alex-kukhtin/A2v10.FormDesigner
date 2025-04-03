
import control from './control.js';


function is2icon(is) {
	switch (is) {
		case 'SearchBox': return 'ico-search';
	}
	return '';
}

const inputControlTemplate = `
<div class="control-group" :style=controlStyle @click=itemClick :class="{ selected }">
<label v-text="item.Label" v-if="item.Label"/>
	<div class="input-group">
		<span v-text="item.Data" class="input" />
		<a v-if="icon">
			<i class="ico" :class="icon" />
		</a>
	</div>
</div>
`;

const searchBox = {
	template: inputControlTemplate,
	extends: control,
	computed: {
		icon() { return is2icon(this.item.Is); },
		controlStyle() {
			return undefined;
		},
		selected() {
			return this.cont.isActive(this.item);
		}
	},
	methods: {
		itemClick(ev) {
			// todo: check if toolbar
			ev.preventDefault();
			ev.stopPropagation();
			this.cont.select(this.item);
		}
	}
};


export default {
	searchBox
};
