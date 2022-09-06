<script lang="ts">
	import { page } from '$app/stores';

	let referralCode = $page.url.searchParams.get('referralCode');
	let msg = '';
	const applyCode = () => {
		msg = `紹介コード${referralCode}を適用されました`;
	};
</script>

<div class="content">
	<form on:submit|preventDefault={applyCode}>
		<label for="fname">紹介コード:</label><br />
		<input name="referralCode" type="text" bind:value={referralCode} />
		<button type="submit">送信</button>
	</form>
	<h2>{msg}</h2>
</div>
