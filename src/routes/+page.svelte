<script lang="ts">
	export let name = 'world';
	import { onMount } from 'svelte';
	import QrCode from '@components/QrCode.svelte';
	import { env } from '@lib/env';
	import { page } from '$app/stores';

	let log:string
	
	const liffId = env.LIFF_ID;
	import type { Liff } from '@liff/liff-types';
import { goto } from '$app/navigation';
	let liff: Liff; // LIFF module
	let liffStatus = false;
	let liffError = ''
	
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
				liffError = 'LIFF init failed.'
				console.log('LIFF init failed.');
				return Promise.reject(error);
			});
	});

	const lineShare = () => {
		console.log($page.url)
		goto(`${$page.url.origin}/referral?referralId=123TEST`)
		if (liff.isApiAvailable("shareTargetPicker")) {
			liff
    .shareTargetPicker(
      [
        {
          type: "text",
          text: "いいもの招待するよ",
        },
				{
          type: "text",
          text: `${$page.url.origin}/referral?referralId=123TEST`,
        },
      ],
      {
        isMultiple: true,
      }
    )
    .then(function (res) {
      if (res) {
        // succeeded in sending a message through TargetPicker
        console.log(`[${res.status}] Message sent!`);
				log = JSON.stringify(res)
      } else {
				log ="TargetPicker failed"
      }
    })
    .catch(function (error) {
      // something went wrong before sending a message
      console.log("something wrong happen");
			log = error
    });
		}
	}
</script>

<svelte:head>
	<title>LIFF TEST</title>
</svelte:head>

<div class="content">
	<h1>Hello {name}</h1>
	{#if liffStatus}
		<h2>LIFF起動できました</h2>
		<div class="referral">
			<h3>QR Code</h3>
			<QrCode url={`${$page.url.origin}/referral?referralId=123TEST`} />

			<div class="line-button">
				<a on:click|preventDefault={lineShare}	href="https://line.me/R/nv/recommendOA/@6Xza53N">
					<img
						src="https://developers.line.biz/media/line-social-plugins/ja/wide-default.png"
						alt="LINEで送る"
						height="36"
					/>
				</a>
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
				<dt>Debug Log:</dt>
				<dd>{log}</dd>
			</dl>
		</div>
	{:else}
		{#if liffError}
			<p>{liffError}</p>
		{:else}
			<p>Loading</p>
		{/if}
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
