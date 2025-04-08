
const toolbarTemplate = `
<div class="toolbar fd-toolbar">
	<button class="btn btn-tb btn-icon" @click="clickCmd('save')" :disabled="disabled()">
		<i class="ico ico-save-outline" />
	</button>
	<button class="btn btn-tb btn-icon" >
		<i class="ico ico-clear" @click=deleteItem />
	</button>
	<div class="divider" />
	<button class="btn btn-tb btn-icon" @click="clickCmd('reload')">
		<i class="ico ico-reload" />
	</button> 
</div>
`;

export default {
	template: toolbarTemplate,
	props: {
		host: Object	
	},
	methods: {
		clickCmd(cmd) {
			if (!this.host) return;
			this.host.exec(cmd);
		},
		deleteItem() {
			this.$parent.deleteItem();
		},
		disabled() {
			if (!this.host) return true;
			return !this.host.isDirty();
		}
	}
};
