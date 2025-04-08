
import gridPlaceholder from './placeholder';
import gridItem from './item';
import layoutelem from './layoutelem';

const gridTemplate = `
<div class="fd-elem-grid grid" @click.stop=select :style=gridStyle :class="{selected}">
	<template v-for="row in rows">
		<fd-grid-ph v-for="col in cols" :row=row :col="col" ref=ph
			:key="row + ':' + col" :cont=cont />
	</template>
	<fd-grid-item v-for="(itm, ix) in item.Items" :item=itm :key=ix :cont=cont />
	<div class="fd-grid-handle">▷</div>
</div>
`;

export default {
	name: 'grid',
	extends: layoutelem,
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
		props() {
			return this.item.Props || {};
		},
		cols() {
			if (!this.props.Columns) return 1;
			return this.props.Columns.split(' ').map((c, ix) => ix + 1);
		},
		rows() {
			if (!this.props.Rows) return 1;
			return this.props.Rows.split(' ').map((r, ix) => ix + 1);
		},
		gridStyle() {
			return {
				gridTemplateColumns: this.props.Columns || 'auto',
				gridTemplateRows: this.props.Rows || 'auto',
				height: this.item.Height || ''
			}
		},
	}
};
