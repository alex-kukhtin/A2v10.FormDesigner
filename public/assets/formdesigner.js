(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
})((function () { 'use strict';

	const toolboxTemplate = `
<div class="fd-toolbox">
	<details open>
		<summary>Form Controls</summary>
		<ul>
			<li>Grid</li>
			<li>Line</li>
		</ul>
	</details>
	<details open>
		<summary>Data</summary>
		<ul>
			<li>Contract.Name</li>
			<li>Contract.Agent</li>
		</ul>
	</details>
</div>
`;

	var toolboxElem = {
		template: toolboxTemplate,
		props: {
		},
		computed: {
		},
		methods: {

		}
	};

	const propsheetTemplate = `
<div class="fd-propsheet">
	PROPERTY SHEET HERE
	{{item}}
</div>
`;

	var propsheetElem = {
		template: propsheetTemplate,
		props: {
			item: Object
		},
		computed: {
		},
		methods: {

		}
	};

	const taskpadTemplate = `
<div class="fd-taskpad">
	<ul class="fd-tabbar">
		<li :class="{active: activeTab === 'tbox'}" @click.stop.prevent="activeTab = 'tbox'">Toolbox</li>
		<li :class="{active: activeTab === 'props'}" @click.stop.prevent="activeTab = 'props'">Properties</li>
	</ul>
	<toolbox v-if="activeTab === 'tbox'" />	
	<propsheet v-if="activeTab === 'props'" :item=item />
</div>
`;

	var taskpad = {
		template: taskpadTemplate,
		props: {
			item: Object	
		},
		components: {
			'toolbox': toolboxElem,
			'propsheet': propsheetElem
		},
		data() { 
			return {
				activeTab: 'tbox'
			};
		},
		computed: {
			props() {
				return this.item ? this.item.Props : [];
			}
		},
		methods: {

		}
	};

	const toolbarTemplate = `
<div class="fd-toolbar">
	TOOLBAR
	<button>Delete</button>
</div>
`;

	var toolbar = {
		template: toolbarTemplate,
		props: {
			form: Object	
		}
	};

	const gridPlaceholder = `
<div class="fd-grid-ph" :style="style"
	@drop=drop @dragover=dragOver @dragenter=dragEnter @dragleave=dragLeave
		:class="{hover}"/>
`;

	var gridPlaceholder$1 = {
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

	var control = {
		props: {
			item: Object,
			cont: Object	
		}
	};

	const textBoxTemplate = `
<div class="fd-textbox form-group">
<label>Form Label</label>
<span v-text="item.Props.Data" class="input-group"></span>
</div>
`;

	var textBox = {
		template: textBoxTemplate,
		extends: control,
		props: {
			item: Object	
		}
	};

	const selectorTemplate = `
<div class="fd-selector">
SELECTOR
{{item}}
</div>
`;

	var selector = {
		template: selectorTemplate,
		extends: control,
		props: {
			item: Object	
		},
	};

	const gridItem = `
<div class="fd-grid-item" :draggable="true"
	@dragstart.stop=dragStart @dragend=dragEnd
	:style="style" @click.stop.prevent=select :class="{ selected }">
		<component :is="item.Is" :item="item" :cont="cont" />
</div>
`;

	var gridItem$1 = {
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

	const gridTemplate = `
<div class="fd-elem-grid" @click=select :style=gridStyle>
	<template v-for="row in rows">
		<fd-grid-ph v-for="col in cols" :row=row :col="col" ref=ph
			:key="row + ':' + col" :cont=cont />
	</template>
	<fd-grid-item v-for="(itm, ix) in item.Items" :item=itm :key=ix :cont=cont />
</div>
`;

	var gridElem = {
		name: 'grid',
		template: gridTemplate,
		components: {
			'fd-grid-ph': gridPlaceholder$1,
			'fd-grid-item': gridItem$1
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

	var lineElem = {
		template: '<hr />',
		props: {
			item: Object,
			cont: Object	
		}
	};

	const containerTemplate = `
<div class="fd-container" @click.stop.self=clickBody>
	<fd-toolbar></fd-toolbar>
	<fd-taskpad :item=selectedItem></fd-taskpad>
	<div class=fd-body  @click.stop.self=clickBody>
		<component v-for="(itm, ix) in form.Items" :key="ix" :is="itm.Is"
			:item="itm" :cont=cont></component>
	</div>
</div>
`;

	Vue.component('Grid', gridElem);

	Vue.component('fd-container', {
		template: containerTemplate,
		components: {
			'fd-toolbar': toolbar,
			'fd-taskpad': taskpad,
			'HLine': lineElem
		},
		props: {
			form: Object
		},
		data() {
			return {
				selectedItem: null
			};
		},
		computed: {
			cont() {
				return {
					select: this.$selectItem,
					drop: this.$dropItem,
					isActive: (itm) => itm === this.selectedItem
				}
			}
		},
		methods: {
			clickBody() {
				this.selectedItem = null;	
			},
			findGridByItem(tf) {
				function findInContainer(el, tf) {
					if (!el || !el.Items) return null;
					for (let i = 0; i < el.Items.length; i++) {
						let x = el.Items[i];
						if (x === tf) return el;
						let res = findInContainer(x, tf);
						if (res) return res;	
					}
					return null;
				}
				return findInContainer(this.form, tf);
			},
			$selectItem(item) {
				this.selectedItem = item;
			},
			$dropItem(rc) {
				if (!this.selectedItem) return;
				console.dir(this.selectedItem);
				console.dir(rc);
				let fg = this.findGridByItem(this.selectedItem);
				if (fg && fg.Is === 'Grid' && fg !== rc.grid) {
					let ix = fg.Items.indexOf(this.selectedItem);
					fg.Items.splice(ix, 1);
					rc.grid.Items.push(this.selectedItem);
				}
				this.selectedItem.Props['Grid.Row'] = rc.row;
				this.selectedItem.Props['Grid.Col'] = rc.col;
				
			}
		}
	});

}));
//# sourceMappingURL=formdesigner.js.map
