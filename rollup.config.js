import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		file: production ? 'public/assets/formdesigner.min.js' : 'public/assets/formdesigner.js',
		name: "A2v10-FormDesigner",
		format: 'umd',
		sourcemap: true
	},
	plugins: [
		nodeResolve({
			browser: true
		}),
		commonjs(), // converts date-fns to ES modules
		production && terser()
	]
};