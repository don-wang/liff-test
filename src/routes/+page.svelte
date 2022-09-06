<script lang="ts">
	export let name = 'world';
	import { onMount } from 'svelte';
	import QrCode from '@components/QrCode.svelte';
	import { env } from '@lib/env';

	let log: string;

	const liffId = env.LIFF_ID;
	import type { Liff } from '@liff/liff-types';
	let liff: Liff; // LIFF module
	let liffStatus = false;
	let liffError = '';

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
				liffError = 'LIFF init failed.';
				console.log('LIFF init failed.');
				return Promise.reject(error);
			});
	});

	const lineShare = (type: string) => {
		let messages: { type: 'text'; text: string }[];
		if (liff.isApiAvailable('shareTargetPicker')) {
			if (type === 'auto') {
				messages = [
					{
						type: 'text',
						text: 'いいもの招待するよ',
					},
					{
						type: 'text',
						text: `https://liff.line.me/1657077671-2VxpX4Md/referral?referralId=123TEST`,
					},
				];
			} else {
				messages = [
					{
						type: 'text',
						text: '友だち追加URL:',
					},
					{
						type: 'text',
						text: `https://line.me/R/ti/p/@061ycxil`,
					},
					{
						type: 'text',
						text: '紹介コード入力URL:',
					},
					{
						type: 'text',
						text: `https://liff.line.me/1657077671-2VxpX4Md/code-input?referralCode=123TEST`,
					},
				];
			}
			liff
				.shareTargetPicker([...messages], {
					isMultiple: true,
				})
				.then(function (res) {
					if (res) {
						// succeeded in sending a message through TargetPicker
						console.log(`[${res.status}] Message sent!`);
						log = JSON.stringify(res);
						liff.closeWindow();
					} else {
						log = 'TargetPicker failed';
					}
				})
				.catch(function (error) {
					// something went wrong before sending a message
					console.log('something wrong happen');
					log = error;
				});
		}
	};
</script>

<svelte:head>
	<title>LIFF TEST</title>
</svelte:head>

<div class="content">
	<h1>Hello {name}</h1>
	{#if liffStatus}
		<h2>LIFF起動できました</h2>
		<div class="referral">
			<h3>紹介コード入力</h3>
			<div class="line-button">
				<a on:click|preventDefault={() => lineShare('code')} href="./">
					<img
						src="https://developers.line.biz/media/line-social-plugins/ja/wide-default.png"
						alt="LINEで送る"
						height="36"
					/>
				</a>
			</div>
			<h3>友だち追加検知</h3>
			<div class="line-button">
				<a on:click|preventDefault={() => lineShare('auto')} href="./">
					<img
						src="https://developers.line.biz/media/line-social-plugins/ja/wide-default.png"
						alt="LINEで送る"
						height="36"
					/>
				</a>
			</div>
			<h3>QR Code Sample</h3>
			<QrCode url={`https://liff.line.me/1657077671-2VxpX4Md/referral?referralId=123TEST`} />
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
				<dt>Debug Log:</dt>
				<dd>{log}</dd>
			</dl>
		</div>
	{:else if liffError}
		<p>{liffError}</p>
	{:else}
		<p>Loading</p>
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
