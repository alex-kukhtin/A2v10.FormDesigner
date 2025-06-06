
import control from './control.js';
import layoutItem from './layoutelem.js';


function is2icon(is) {
	switch (is) {
		case 'SearchBox': return 'ico-search';
		case 'ComboBox': return 'ico-chevron-down';
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

const inputControlSimpleTemplate = `
<div class="control-group" :style=controlStyle >
<label v-text="item.Label" v-if="item.Label" />
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


const checkBoxTemplate = `
<label class="checkbox" :label="item.Label" :style=controlStyle >
	<input type="checkbox" xcheck="true" checked />
	<span v-text=item.Label />
</label>
`;

const checkBox = {
	template: checkBoxTemplate,
	extends: control
}

const separatorTemplate = `
<div role="separator" class="divider" @click.stop.prevent="select" :class="{ selected }" :draggable=true
		@dragstart.stop=dragStart />
`;

const separator = {
	template: separatorTemplate,
	extends: layoutItem
}

const comboBox = {
	template: inputControlSimpleTemplate,
	extends: control,
	computed: {
		icon() { return is2icon(this.item.Is); }
	}
};

const staticBox = {
	template: inputControlSimpleTemplate,
	extends: control,
	computed: {
		icon() { return undefined }
	}
};

export default {
	searchBox,
	checkBox,
	comboBox,
	staticBox,
	separator
};
