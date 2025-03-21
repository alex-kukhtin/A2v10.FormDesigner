
import gridPlaceholder from './placeholder.js';
import gridItem from './item.js';

const gridTemplate = `
<div class="fd-elem-grid" @click=select :style=gridStyle>
	<template v-for="row in rows">
		<fd-grid-ph v-for="col in cols" :row=row :col="col" ref=ph
			:key="row + ':' + col" :cont=cont />
	</template>
	<fd-grid-item v-for="(itm, ix) in item.Items" :item=itm :key=ix :cont=cont />
</div>
`;

export default {
	name: 'grid',
	template: gridTemplate,
	components: {
		'fd-grid-ph': gridPlaceholder,
		'fd-grid-item': gridItem
	},
	props: {
		item: Object,
		cont: Object
	},
	computed: {
		cols() {
			return this.item.Props.Columns;
		},
		rows() {
			return this.item.Props.Rows || 1;
		},
		colWidth() {
			return this.item.Props.ColumnWidth;
		},
		gridStyle() {
			return {
				gridTemplateColumns: `repeat(${this.cols}, ${this.colWidth}px)`,
				gridTemplateRows: `repeat(${this.rows}, auto) 1fr`
			}
		},
	},
	methods: {
		select() {
			this.cont.select(this.item);
		}
	}
};
