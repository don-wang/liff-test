import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			fallback: 'index.html',
		}),
		prerender: {
			// This can be false if you're using a fallback (i.e. SPA mode)
			default: false,
		},
		alias: {
			'@app': 'src',
			'@lib': 'src/lib',
			'@components': 'src/components',
		},
	},
};

export default config;
