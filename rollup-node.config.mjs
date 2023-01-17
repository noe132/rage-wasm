import rust from "@wasm-tool/rollup-plugin-rust";
import replace from 'rollup-plugin-re'

export default {
	input: 'index.js',
	output: {
		dir: 'dist/node',
		format: 'cjs',
	},
	plugins: [
		rust({
			cargoArgs: ["-Zbuild-std=std,panic_abort", "-Zbuild-std-features=panic_immediate_abort"],
			wasmOptArgs: ["-Oz"],
			verbose: true,
			nodejs: true,
			// inlineWasm: true
		}),
		replace({
			patterns: [
				{
					test: 'input = import.meta.url.replace(/\\.js$/, \'_bg.wasm\');',
					replace: ''
				},
				{
					test: 'input = new URL(\'index_bg.wasm\', import.meta.url);',
					replace: ''
				},
				{
					test: 'require("fs").readFile(url',
					replace: 'require("fs").readFile(require("path").join(__dirname, url)'
				}
			]
		})
	],
};
