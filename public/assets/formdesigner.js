(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
})((function () { 'use strict';

	const toolboxItemTemplate = `
<li class="fd-tbox-item" :draggable="true" @dragstart.stop=dragStart>
	<i class="ico ico-grid" />
	<span v-text=label />
</li>
`;

	var toolboxItem = {
		template: toolboxItemTemplate,
		props: {
			icon: String,
			label: String,
			item: Object,
			cont: Object
		},
		methods: {
			dragStart(ev) {
				console.dir(this.cont);
				this.cont.select(this.item);
				ev.dataTransfer.effectAllowed = "move";
			}
		}
	};

	const toolboxTemplate = `
<div class="fd-toolbox">
	<details open>
		<summary>Form Controls</summary>
		<ul>
			<toolboxitem v-for="(f, ix) in components" :key=ix :item=f :label=f.Is :cont=cont />
		</ul>
	</details>
	<details open>
		<summary>Data</summary>
		<ul>
			<toolboxitem v-for="(f, ix) in fields" :key=ix :item=f :label=f.Data :cont=cont />
		</ul>
	</details>
</div>
`;

	var toolboxElem = {
		template: toolboxTemplate,
		components: {
			toolboxitem: toolboxItem
		},
		props: {
			fields: Array,
			components: Array,
			cont: Object
		},
		computed: {
		},
		methods: {

		}
	};

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

	var propsheetElem = {
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

	const taskpadTemplate = `
<div class="fd-taskpad">
	<ul class="fd-tabbar">
		<li :class="{active: activeTab === 'tbox'}" @click.stop.prevent="activeTab = 'tbox'">Toolbox</li>
		<li :class="{active: activeTab === 'props'}" @click.stop.prevent="activeTab = 'props'">Properties</li>
	</ul>
	<toolbox v-if="activeTab === 'tbox'" :fields=fields :cont=cont :components=components />
	<propsheet v-if="activeTab === 'props'" :item=item  />
</div>
`;

	var taskpad = {
		template: taskpadTemplate,
		props: {
			item: Object,
			fields: Array,
			components: Array,
			cont: Object
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

	var toolbar$1 = {
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
				if (!this.cont.canDrop('grid'))
					return;
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
<label v-text="item.Label" v-if="item.Label"/>
<span v-text="item.Data" class="input-group" />
</div>
`;

	var textBox = {
		template: textBoxTemplate,
		extends: control
	};

	const selectorTemplate = `
<div class="fd-selector form-group">
<label v-text="item.Label" v-if="item.Label"/>
<span v-text="item.Data" class="input-group" />
</div>
`;

	var selector = {
		template: selectorTemplate,
		extends: control
	};

	var layoutelem = {
		props: {
			item: Object,
			cont: Object	
		},
		methods: {
			select() {
				this.cont.select(this.item);
			}
		},
		computed: {
			selected() {
				return this.cont.isActive(this.item);
			}
		}
	};

	const dataGridColumnTemplate = `
<div class="fd-datagrid-column" @click.stop.prevent="select" :class="{ selected }"
	:draggable=true @dragstart.stop=dragStart>
	<div v-text="item.Label" class="label" />
	<div v-text="item.Data" class="column" />
</div>
`;

	var dataGridColumn = {
		template: dataGridColumnTemplate,
		extends: layoutelem,
		methods: {
			dragStart(ev) {
				console.dir('drag start column');
				this.cont.select(this.item);
				ev.dataTransfer.effectAllowed = "move";
				ev.dataTransfer.setData('text/plain', JSON.stringify({ row: this.row, col: this.col }));
			}
		}
	};

	const dataGridTemplate = `
<div class="fd-datagrid" @dragover=dragOver @drop=drop >
	<DataGridColumn v-for="(c, ix) in item.Items" :item=c :key=ix :cont=cont />
</div>
`;

	var datagrid = {
		template: dataGridTemplate,
		props: {
			item: Object,
			cont: Object
		},
		components: {
			'DataGridColumn': dataGridColumn
		},
		methods: {
			dragOver(ev) {
				ev.preventDefault();
			},
			drop(ev) {
				alert('drop data grid');
			}
		}
	};

	var pager = {
		template: `<div class="a2-pager">
		<button>
			<i class="ico ico-chevron-left" />
		</button>
		<button>1</button>
		<button>2</button>
		<button>3</button>
		<button>4</button>
		<button>5</button>
		<span class="a2-pager-dots">...</span>
		<button>8</button>
		<button>
			<i class="ico ico-chevron-right" />
		</button>
		<div class="a2-pager-divider" />
		<span class="a2-pager-title">items: <b>1</b>-<b>20</b> of <b>500</b></span>
	</div>`,
		props: {
			item: Object,
			cont: Object	
		}
	};

	const buttonTemplate = `
<button class="btn btn-tb" @click.stop.prevent="select" :class="{ selected }" :draggable=true
		@dragstart.stop=dragStart >
	<i class="ico" :class=icon />
	<span v-if="item.Label" v-text="item.Label" />	
</button>
`;

	var button = {
		template: buttonTemplate,
		extends: layoutelem,
		computed: {
			icon() {
				switch (this.item.Command) {
					case 'Edit': return 'ico-edit';
					case 'New': return 'ico-add';
					case 'Delete': return 'ico-clear';
					case 'Reload': return 'ico-reload';
				}
				return 'ico-menu';
			}
		},
		methods: {
			dragStart(ev) {
				console.dir('drag start button');
				this.cont.select(this.item);
				ev.dataTransfer.effectAllowed = "move";
				ev.dataTransfer.setData('text/plain', this.item.Is);
			}
		}
	};

	var toolbar = {
		template: `<div class="toolbar" @dragover=dragOver @drop=drop >
		<Button v-for="(item, ix) in item.Items" :item="item" :key="ix" :cont=cont />
	</div>`,
		extends: control,
		components: {
			'Button': button
		},
		methods: {
			dragOver(ev) {
				ev.preventDefault();
			},
			drop(ev) {
				alert('drop toolbar');
			}
		}
	};

	var label = {
		template: '<label v-text="item.Label" />',
		extends: control
	};

	const gridItem = `
<div class="fd-grid-item" :draggable="true"
	@dragstart.stop=dragStart @dragend=dragEnd
	:style="style" @click.stop.prevent=select :class="{ selected }">
		<div class="handle" v-if=hasHandle></div>
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

	const gridTemplate = `
<div class="fd-elem-grid" @click=select :style=gridStyle :class="{selected}">
	<template v-for="row in rows">
		<fd-grid-ph v-for="col in cols" :row=row :col="col" ref=ph
			:key="row + ':' + col" :cont=cont />
	</template>
	<fd-grid-item v-for="(itm, ix) in item.Items" :item=itm :key=ix :cont=cont />
</div>
`;

	var gridElem = {
		name: 'grid',
		extends: layoutelem,
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
				return this.item.Columns.split(' ').map((c, ix) => ix + 1);
			},
			rows() {
				return this.item.Rows.split(' ').map((r, ix) => ix + 1);
			},
			gridStyle() {
				return {
					gridTemplateColumns: this.item.Columns,
					gridTemplateRows: this.item.Rows
				}
			},
		}
	};

	var lineElem = {
		template: '<div class="line" @click.stop.prevent=select :class="{selected}"><hr></div>',
		extends: layoutelem
	};

	const containerTemplate = `
<div class="fd-container" @keyup=keyUp tabindex=0 >
	<fd-toolbar></fd-toolbar>
	<fd-taskpad :item=selectedItem :fields=fields :cont=cont :components=components />
	<div class="fd-main" @click.stop.self=clickBody>
		<div class=fd-body  @click.stop.self=clickBody :class="bodyClass">
			<component v-for="(itm, ix) in form.Items" :key="ix" :is="itm.Is"
				:item="itm" :cont=cont />
		</div>
		<div class="fd-page-taskpad">
		</div>
	</div>
</div>
`;

	function isContainer(isElem) {
		return isElem === 'Grid';
	}

	Vue.component('Grid', gridElem);

	Vue.component('fd-container', {
		template: containerTemplate,
		components: {
			'fd-toolbar': toolbar$1,
			'fd-taskpad': taskpad,
			'HLine': lineElem
		},
		props: {
			form: Object,
			fields: Array,
			components: Array
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
					isActive: (itm) => itm === this.selectedItem,
					canDrop: this.$canDrop
				}
			},
			bodyClass() {
				return this.form.Is.toLowerCase();
			}
		},
		methods: {
			clickBody() {
				this.selectedItem = this.form;	
			},
			keyUp(ev) {
				console.dir(ev.which);
				switch (ev.which) {
					case 46: /* del */ this.deleteItem();
						break;
				}
			},
			deleteItem() {
				if (this.selectedItem)
					alert('delete item');
			},
			findGridByItem(tf) {
				function findInContainer(el, tf) {
					if (!el || !el.Items) return null;
					for (let i = 0; i < el.Items.length; i++) {
						let x = el.Items[i];
						if (x === tf) return el;
						if (!isContainer(x.Is))
							continue;
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
			$canDrop(target) {
				let si = this.selectedItem;
				if (!si) return false;
				console.dir(si.Is);
				if (target === 'grid')
					return si.Is !== 'Button' && si.Is !== 'DataGridColumn';
				return true;
			},
			$dropItem(rc) {
				if (!this.selectedItem) return;
				console.dir(this.selectedItem);
				console.dir(rc);

				if (!this.selectedItem.row && !this.selectedItem.col) {
					let no = Object.assign({}, this.selectedItem);
					no.Items = [];
					no.row = rc.row;	
					no.col = rc.col;	
					rc.grid.Items.push(no);
					this.selectedItem = no;
					return;
				}

				// selectedItem ����� ���� ����� ���������	
				let fg = this.findGridByItem(this.selectedItem);
				if (fg && fg.Is === 'Grid' && fg !== rc.grid) {
					let ix = fg.Items.indexOf(this.selectedItem);
					fg.Items.splice(ix, 1);
					rc.grid.Items.push(this.selectedItem);
				}
				this.selectedItem.row = rc.row;
				this.selectedItem.col = rc.col;			
			}
		},
		mounted() {
			this.selectedItem = this.form;
		}
	});

}));
//# sourceMappingURL=formdesigner.js.map
