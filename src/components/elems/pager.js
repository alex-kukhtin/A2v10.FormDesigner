
const locale = window.$$locale || {};

export default {
	template: `<div class="a2-pager">
		<button>
			<i class="ico ico-chevron-left" />
		</button>
		<button class="active">1</button>
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
		<span class="a2-pager-title" v-html=pagerText></span>
	</div>`,
	props: {
		item: Object,
		cont: Object	
	},
	computed: {
		pagerText() {
			let elems = locale['$PagerElements'] || 'items';
			let ofStr = locale['$Of'] || 'of';
			return `${elems}: <b>1</b>-<b>20</b> ${ofStr} <b>150</b>`;
		}
	}
};
