import textBox from './textbox';
import selector from './selector';
import datePicker from './datepicker';
import periodPicker from './periodpicker';
import datagrid from './datagrid';
import pager from './pager';
import toolbar from './toolbar';
import label from './label';
import header from './header';
import tabs from './tabs';
import inputControls from './inputcontrol';

const gridItem = `
<div class="fd-grid-item" :draggable="true"
	@dragstart.stop=dragStart @dragend=dragEnd
	:style="style" @click.stop.prevent=select :class="{ selected }">
		<component :is="item.Is" :item="item" :cont="cont" />
</div>
`;

export default {
	template: gridItem,
	props: {
		item: Object,
		cont: Object
	},
	components: {
		'TextBox': textBox,
		'Selector': selector,
		'DatePicker': datePicker,
		'PeriodPicker': periodPicker,
		'DataGrid': datagrid,
		'CheckBox': inputControls.checkBox,
		'Label': label, 
		'Header': header,
		'Pager': pager,
		'Toolbar': toolbar,
		'Tabs': tabs
	},
	computed: {
		grid() {
			return this.item.Grid || {};
		},
		row() {
			return this.grid.Row || '';
		},
		col() {
			return this.grid.Col || '';
		},
		rowSpan() {
			return this.grid.RowSpan || '';
		},
		colSpan() {
			return this.grid.ColSpan || '';
		},
		style() {
			let row = this.row;
			if (this.rowSpan)
				row += `/ span ${this.rowSpan}`;
			let col = this.col;
			if (this.colSpan)
				col += `/ span ${this.colSpan}`;
			return {
				gridRow: row,
				gridColumn: col,
				height: this.item.Height || ''
			};
		},
		selected() {
			return this.cont.isActive(this.item);
		}
	},
	methods: {
		select() {
			this.cont.select(this.item);
		},
		dragStart(ev) {
			console.dir('drag start');
			this.cont.select(this.item);
			ev.dataTransfer.effectAllowed = "move";
			ev.dataTransfer.setData('text/plain', JSON.stringify({ row: this.row, col: this.col}));
		},
		dragEnd() {
			console.dir('drag end');
		}
	}
};
