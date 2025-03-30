

const tabsTemplate = `
<div class="fd-elem-tabs">
	TABS
	<ul>
		<li v-for="(itm, ix) in item.Items" v-text="itm.Label" :key=ix />
	</ul>
</div>
`;

export default {
	template: tabsTemplate,
	props: {
		item: Object,
		cont: Object
	}
};
