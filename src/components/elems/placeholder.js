
const gridPlaceholder = `
<div class="fd-grid-ph" :style="style"
	@drop=drop @dragover=dragOver @dragenter=dragEnter @dragleave=dragLeave
		:class="{hover}"/>
`;

export default {
	template: gridPlaceholder,
	props: {
		row: Number,
		col: Number,
		cont: Object
	},
	data() {
		return {
			hover: false
		};
	},
	computed: {
		style() {
			return `grid-area: ${this.row} / ${this.col}`;
		}
	},
	methods: {
		dragOver(ev) {
			//console.dir("drag over");
			ev.preventDefault();	
		},
		dragEnter(ev) {
			//console.dir("drag enter");
			this.hover = true;
		},
		dragLeave(ev) {
			//console.dir("drag leave");
			this.hover = false;
		},
		drop(ev) {
			this.hover = false;
			//let dropData = ev.dataTransfer.getData('text/plain');
			this.cont.drop({row: this.row, col: this.col, grid: this.$parent.item});
		}
	}
};
