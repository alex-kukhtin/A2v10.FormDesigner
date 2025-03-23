import textBox from './textbox';
import selector from './selector';
import datagrid from './datagrid';
import pager from './pager';
import toolbar from './toolbar';
import label from './label';

const gridItem = `
<div class="fd-grid-item" :draggable="true"
	@dragstart.stop=dragStart @dragend=dragEnd
	:style="style" @click.stop.prevent=select :class="{ selected }">
		<div class="handle" v-if=hasHandle></div>
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
		'DataGrid': datagrid,
		'CLabel': label, 
		'Pager': pager,
		'Toolbar': toolbar
	},
	computed: {
		row() {
			return this.item.row;
		},
		col() {
			return this.item.col;
		},
		rowSpan() {
			return this.item.rowSpan || 1;
		},
		colSpan() {
			return this.item.colSpan || 1;
		},
		style() {
			return `grid-area: ${this.row} / ${this.col} / span ${this.rowSpan} / span ${this.colSpan}`;
		},
		selected() {
			return this.cont.isActive(this.item);
		},
		hasHandle() {
			return this.item.Is == 'DataGrid' || this.item.Is === "Toolbar";
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
