

export default {
	props: {
		item: Object,
		cont: Object,
	},
	computed: {
		controlStyle() {
			return {
				width: this.item.Width || ''
			};
		}
	}
};
