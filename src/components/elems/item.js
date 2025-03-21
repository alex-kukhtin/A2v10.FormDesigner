import textBox from './textbox';
import selector from './selector';

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
		'Selector': selector
	},
	computed: {
		row() {
			return this.item.Props['Grid.Row'];
		},
		col() {
			return this.item.Props['Grid.Col'];
		},
		style() {
			return `grid-area: ${this.row} / ${this.col}`;
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
