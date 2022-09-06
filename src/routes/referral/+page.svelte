<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let log: string;
	let referralId = $page.url.searchParams.get('referralId');
	onMount(async () => {
		log = '招待元確認後(仮 3秒)、友だち追加画面に遷移する';
		setTimeout(() => {
			log = 'redirectting to LINE friend URL';
			goto('https://line.me/R/ti/p/@061ycxil');
		}, 3000);
	});
</script>

<div class="content">
	<h1>Referral Id: {referralId}</h1>
	<h1>{log}</h1>
</div>
