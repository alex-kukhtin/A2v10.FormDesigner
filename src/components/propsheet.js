
const propsheetTemplate = `
<div class="fd-propsheet">
	<div class="fd-item-is" v-text="item.Is" />
	<table>
		<tr>
			<td colspan=2 class="fd-ps-header">General</td>
		</tr>
		<tr v-for="(p, ix) in itemProps" :key="'i:'+ix">
			<td v-text="p.name" />
			<td>
				<input v-model.lazy.trim="p.value" />
			</td>
		</tr>
		<tr v-for="(p, ix) in otherProps" :key="'o:'+ix">
			<td v-text="p.name" />
			<td>
				<input v-model.lazy.trim="p.value" />
			</td>
		</tr>
		<tr v-if="item.Grid">
			<td colspan=2 class="fd-ps-header">Grid</td>
		</tr>
		<tr v-if="item.Grid" v-for="(p, ix) in gridProps" :key="'g:' + ix">
			<td v-text="p.name"/>
			<td>
				<input v-model.lazy.trim="p.value" type=number />
			</td>
		</tr>
		<tr v-if="item.Command">
			<td colspan=2 class="fd-ps-header">Command</td>
		</tr>
		<tr v-if="item.Command" v-for="(p, ix) in commandProps" :key="'c:' + ix">
			<td v-text="p.name"/>
			<td>
				<input v-model.lazy.trim="p.value" />
			</td>
		</tr>
	</table>
</div>
`;

// TODO: переадресация свойств Dialog.Label => Dialog.Title?
const PROP_MAP = {
	Grid: ["Height"],
	TextBox: ["Data", 'Label', "Width"],
	DatePicker: ["Data", 'Label', "Width"],
	PeriodPicker: ["Data", 'Label', "Width"],
	Selector: ["Data", 'Label', "Width"],
	DataGrid: ["Data", 'Height'],
	CLabel: ["Label"],
	DataGridColumn: ["Data", 'Label'],
	Toolbar: [],
	Pager: ['Data'],
	Dialog: ['Label', 'Width', 'Height', "Data"],
	Page: ['Label', "Data", "UseCollectionView"],
	Button: ['Label'],
	GRID_PROPS: ['Row', 'Col', 'RowSpan', 'ColSpan'],
	COMMAND_PROPS: ['Command', 'Argument', 'Url'],
	OTHER_PROPS: {
		Grid: ["Rows", "Columns"]
	}
};

export default {
	template: propsheetTemplate,
	props: {
		item: Object,
		host: Object
	},
	computed: {
		itemProps() {
			if (!this.item) return [];
			const type = this.item.Is;
			return this.getProps(PROP_MAP[type], this.item);
		},
		otherProps() {
			if (!this.item) return [];
			const type = this.item.Is;
			return this.getProps(PROP_MAP.OTHER_PROPS[type], this.item.Props);
		},
		gridProps() {
			let g = this.item.Grid;
			if (!g) return [];
			return this.getProps(PROP_MAP['GRID_PROPS'], this.item.Grid);
		},
		commandProps() {
			let g = this.item.Command;
			if (!g) return [];
			return this.getProps(PROP_MAP['COMMAND_PROPS'], this.item.Command);
		}
	},
	methods: {
		setDirty() {
			if (!this.host) return;
			this.host.setDirty();
		},
		getProps(props, item) {
			if (!props) return [];
			let that = this;
			return props.map(p => {
				const r = {
					name: p,
					get value() { return item[p] || ''; },
					set value(v) { Vue.set(item, p, v); that.setDirty() }
				};
				return r;
			});
		}
	}
};
