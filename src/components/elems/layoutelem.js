

export default {
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
