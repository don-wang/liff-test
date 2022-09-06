import { defineConfig } from 'vite';
import path from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [svelte({ hot: !process.env.VITEST })],
	test: {
		globals: true,
		environment: 'jsdom',
		deps: {
			external: ['promise-polyfill'],
		},
		coverage: {
			reporter: ['text', 'json', 'lcov'],
		},
		exclude: ['**/node_modules/**', '**/build/**'],
	},
	resolve: {
		alias: {
			'@app': path.resolve(__dirname, '/src'),
			'@lib': path.resolve(__dirname, '/src/lib'),
			'@components': path.resolve(__dirname, '/src/components'),
		},
	},
});
