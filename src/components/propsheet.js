
const propsheetTemplate = `
<div class="fd-propsheet">
	{{item.Is}}
	<table>
		<tr v-for="(p, ix) in itemProps" :key=ix>
			<td v-text="p.name" />
			<td>
				<input v-model.lazy.trim="p.value" />
			</td>
		</tr>	
	</table>
</div>
`;

// TODO: переадресация свойств Dialog.Label => Dialog.Title?
const PROP_MAP = {
	Grid: ['Rows', 'Columns', "Height"],
	TextBox: ["Data", 'Label', "Width", 'row', 'col', 'rowSpan', 'colSpan'],
	DatePicker: ["Data", 'Label', "Width", 'row', 'col', 'rowSpan', 'colSpan'],
	Selector: ["Data", 'Label', "Width", 'row', 'col', 'rowSpan', 'colSpan'],
	DataGrid: ["Data", 'Height', 'row', 'col'],
	CLabel: ["Label", 'row', 'col'],
	DataGridColumn: ["Data", 'Label'],
	Toolbar: ["row", 'col'],
	Pager: ["row", 'col', 'Data'],
	Dialog: ['Label', 'Width', 'Height', "Data"],
	Page: ['Label', "Data"],
	Button: ['Label', 'Command', "Parameter"],
};

export default {
	template: propsheetTemplate,
	props: {
		item: Object
	},
	computed: {
		itemProps() {
			if (!this.item) return [];
			const type = this.item.Is;
			const props = PROP_MAP[type];
			if (!props) return [];
			return props.map(p => {
				const item = this.item;
				const r = {
					name: p,
					get value() { return item[p]; },
					set value(v) { Vue.set(item, p, v); }	
				};
				return r;
			})
		}
	},
	methods: {
	}
};
