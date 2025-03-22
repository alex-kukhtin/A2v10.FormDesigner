
const propsheetTemplate = `
<div class="fd-propsheet">
	{{item.Is}}
	<table border=1>
		<tr v-for="(p, ix) in itemProps" :key=ix>
			<td v-text="p.name" />
			<td>
				<input v-model.lazy.trim="p.value" />
			</td>
		</tr>	
	</table>
</div>
`;

const PROP_MAP = {
	Grid: ['Rows', 'Columns'],
	TextBox: ["Data", 'Label', 'row', 'col', 'rowSpan', 'colSpan'],
	Selector: ["Data", 'Label', 'row', 'col'],
	DataGrid: ["Source", 'row', 'col'],
	CLabel: ["Label", 'row', 'col'],
	DataGridColumn: ["Data", 'Label'],
	Toolbar: ["row", 'col'],
	Pager: ["row", 'col'],
	Dialog: ['Title', 'Width'],
	Button: ['Label', 'Command'],
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
					set value(v) { item[p] = v; }	
				};
				return r;
			})
		}
	},
	methods: {
	}
};
