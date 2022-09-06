import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';
import Demo from '@app/routes/demo/+page.svelte';

describe('Hello.svelte', () => {
	vi.mock('@line/liff', () => {
		return {
			default: {
				init: vi.fn(() => Promise.resolve()),
				getVersion: vi.fn(),
				isInClient: vi.fn(),
				getIDToken: vi.fn(),
			},
		};
	});
	// @testing-library/svelte claims to add this automatically but it doesn't work without explicit afterEach

	afterEach(() => {
		vi.clearAllMocks();
		cleanup();
	});

	it('mounts', () => {
		const { container } = render(Demo, { name: 'test' });
		expect(container).toBeTruthy();
		expect(container.innerHTML).toContain('Hello test');
	});
});
