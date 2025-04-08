

const tabsTemplate = `
<div class="fd-elem-tabs a2-tab-bar">
	<div class="a2-tab-bar-item active" v-for="(itm, ix) in item.Items" :key=ix>
		<a class="a2-tab-button active">
			<span class="content" v-text="itm.Label" />
		</a>
	</div>
	<div class="fd-grid-handle">▷</div>
</div>
`;

export default {
	template: tabsTemplate,
	props: {
		item: Object,
		cont: Object
	}
};
