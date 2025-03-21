(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
})((function () { 'use strict';

	const taskpadTemplate = `
<div class="fd-taskpad">
	<ul class="fd-tabbar">
		<li :class="{active: activeTab === 'tbox'}" @click.stop.prevent="activeTab = 'tbox'">Toolbox</li>
		<li :class="{active: activeTab === 'props'}" @click.stop.prevent="activeTab = 'props'">Properties</li>
	</ul>
	<div>{{props}}</div>
</div>
`;

	var taskpad = {
		template: taskpadTemplate,
		props: {
			item: Object	
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
</div>
`;

	var toolbar = {
		template: toolbarTemplate,
		props: {
			form: Object	
		}
	};

	var control = {
		props: {
			item: Object,
			cont: Object	
		},
		methods: {
			select() {
				this.cont.select(this.item);
			}
		}
	};

	const textBoxTemplate = `
<div class="fd-textbox" @click.stop.self=select>
TEXTBOX
{{item}}
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
<div class="fd-selector" @click.stop.self=select>
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

	const gridTemplate = `
<div class="fd-elem-grid" @click=select>
	GRID
	{{item}}
	<component @click="select" v-for="(itm, ix) in item.Items"
		:key="ix" :is="itm.Is" :item="itm" :cont="cont"></component>
</div>
`;

	var gridElem = {
		template: gridTemplate,
		extends: control,
		components: {
			'TextBox': textBox,
			'Selector': selector
		},
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

	Vue.component('fd-container', {
		template: containerTemplate,
		components: {
			'fd-toolbar': toolbar,
			'fd-taskpad': taskpad,
			'Grid': gridElem
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
					select: this.$selectItem
				}
			}
		},
		methods: {
			clickBody() {
				this.selectedItem = null;	
			},
			$selectItem(item) {
				this.selectedItem = item;
			}
		}
	});

}));
//# sourceMappingURL=formdesigner.js.map
