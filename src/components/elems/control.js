

export default {
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
