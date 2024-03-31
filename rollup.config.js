import { createRequire } from 'node:module';
import { dts } from 'rollup-plugin-dts';
import { swc, defineRollupSwcOption } from 'rollup-plugin-swc3';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

export default [
	{
		input: 'src/main.js',
		output: [{ file: pkg.module, format: 'es' }],
		plugins: [swc()],
	},
	{
		input: 'src/main.js',
		output: [
			{ name: 'morseKeyframes', file: pkg.browser, format: 'umd' },
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module.replace('js', 'min.js'), format: 'es' },
		],
		plugins: [swc(defineRollupSwcOption({ minify: true }))],
	},
	{
		input: 'src/main.js',
		output: [{ file: pkg.types, format: 'es' }],
		plugins: [dts({ compilerOptions: { allowJs: true } })],
	},
];
