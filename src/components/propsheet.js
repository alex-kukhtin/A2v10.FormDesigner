
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
		<tr v-if="hasGrid">
			<td colspan=2 class="fd-ps-header">Grid</td>
		</tr>
		<tr v-if="hasGrid" v-for="(p, ix) in gridProps" :key="'g:' + ix">
			<td v-text="p.name"/>
			<td>
				<input v-model.lazy.trim="p.value" type=number />
			</td>
		</tr>
		<tr v-if="hasCommand">
			<td colspan=2 class="fd-ps-header">Command</td>
		</tr>
		<tr v-if="hasCommand" v-for="(p, ix) in commandProps" :key="'c:' + ix">
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
	Grid: ["Height", "CssClass"],
	TextBox: ['Data', 'Label', 'Width'],
	ComboBox: ['Data', 'Label', 'Width'],
	SearchBox: ['Data', 'Label', 'Width'],
	Static: ['Data', 'Label', 'Width'],
	DatePicker: ['Data', 'Label', 'Width'],
	PeriodPicker: ['Data', 'Label', 'Width'],
	Selector: ['Data', 'Label', 'Width'],
	Header: ['Data', 'Label'],
	DataGrid: ['Data', 'Height'],
	Label: ['Label'],
	Panel: ["Label"],
	DataGridColumn: ['Data', 'Label'],
	Toolbar: ['CssClass'],
	Tabs: ['CssClass'],
	Pager: ['Data'],
	Dialog: ['Label', 'Width', 'Height', 'Data'],
	Page: ['Label', 'Data', "CssClass", "UseCollectionView"],
	Button: ['Label', 'CssClass', 'If'],
	GRID_PROPS: ['Row', 'Col', 'RowSpan', 'ColSpan'],
	COMMAND_PROPS: ['Command', 'Argument', 'Url'],
	OTHER_PROPS: {
		Grid: ['Rows', 'Columns'],
		TextBox: ['Multiline', 'Placeholder'],
		DataGridColumn: ['Fit', 'NoWrap', 'LineClamp'],
		Selector: ['Placeholder', 'ShowClear'],
		ComboBox: ['ItemsSource'],
	}
};

export default {
	template: propsheetTemplate,
	props: {
		item: Object,
		host: Object
	},
	computed: {
		hasGrid() {
			return this.item.$parent.$parent.Is === 'Grid';
		},
		hasCommand() {
			return this.item.Is === 'Button';
		},
		itemProps() {
			if (!this.item) return [];
			const type = this.item.Is;
			return this.getProps(PROP_MAP[type], this.item);
		},
		otherProps() {
			if (!this.item) return [];
			const type = this.item.Is;
			return this.getProps(PROP_MAP.OTHER_PROPS[type], this.item.Props || {});
		},
		gridProps() {
			let g = this.item.Grid;
			if (!g) return [];
			return this.getProps(PROP_MAP['GRID_PROPS'], this.item.Grid || {});
		},
		commandProps() {
			let g = this.item.Command;
			if (!g) return [];
			return this.getProps(PROP_MAP['COMMAND_PROPS'], this.item.Command || {});
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
