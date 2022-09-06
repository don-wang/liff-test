<script lang="ts">
	export let name = 'world';
	import { onMount } from 'svelte';
	import QrCode from '@components/QrCode.svelte';
	import { env } from '@lib/env';
	const liffId = env.LIFF_ID;
	import type { Liff } from '@liff/liff-types';
	let liff: Liff; // LIFF module
	let liffStatus = false;
	onMount(async () => {
		const l = await import('@line/liff');

		liff = l.default;
		liff
			.init({ liffId })
			.then(() => {
				liffStatus = true;
				console.log('LIFF init succeeded.');
			})
			.catch((error: Error) => {
				liffStatus = false;
				console.log('LIFF init failed.');
				return Promise.reject(error);
			});
	});
</script>

<svelte:head>
	<title>LIFF TEST</title>
	<script
		src="https://www.line-website.com/social-plugins/js/thirdparty/loader.min.js"
		async="async"
		defer="defer"></script>
</svelte:head>

<div class="content">
	<h1>Hello {name}</h1>
	{#if liffStatus}
		<h2>LIFF起動できました</h2>
		<div class="referral">
			<h3>QR Code</h3>
			<QrCode url="hello" />

			<div class="line-button">
				<a href="https://line.me/R/nv/recommendOA/@6Xza53N"
					><img
						src="https://developers.line.biz/media/line-social-plugins/ja/wide-default.png"
						alt="LINEで送る"
						height="36"
					/>
				</a>

				<div
					class="line-it-button"
					data-lang="ja"
					data-type="share-a"
					data-env="REAL"
					data-url="https://line.me/R/nv/recommendOA/%406Xza53N"
					data-color="default"
					data-size="small"
					data-count="false"
					data-ver="3"
					style="display: none;"
				/>
			</div>
		</div>
		<div class="liff-info">
			<h3>LIFF Info</h3>
			<dl>
				<dt>LIFF Version:</dt>
				<dd>{liff.getVersion()}</dd>
				<dt>LIFF Clinet:</dt>
				<dd>{liff.isInClient()}</dd>
				<dt>ID Token:</dt>
				<dd>{liff.getIDToken()}</dd>
			</dl>
		</div>
	{:else}
		<p>LIFF起動失敗しました</p>
	{/if}
</div>

<style>
	dl {
		font-size: 1.2em;
	}

	dd {
		overflow-wrap: break-word;
		margin-bottom: 20px;
	}
</style>
