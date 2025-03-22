
import layoutelem from './layoutelem';

export default {
	template: '<div class="line" @click.stop.prevent=select :class="{selected}"><hr></div>',
	extends: layoutelem
};
