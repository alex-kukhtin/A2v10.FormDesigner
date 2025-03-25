
const toolbarTemplate = `
<div class="toolbar fd-toolbar">
	<button class="btn btn-tb btn-icon">
		<i class="ico ico-save-outline" />
	</button>
	<button class="btn btn-tb btn-icon">
		<i class="ico ico-clear" />
	</button>
	<div class="divider" />
	<button class="btn btn-tb btn-icon">
		<i class="ico ico-reload" />
	</button> 
</div>
`;

export default {
	template: toolbarTemplate,
	props: {
		form: Object	
	}
};
