<script lang="ts">
	import Header from '@components/Header.svelte';
	import Footer from '@components/Footer.svelte';
</script>

<div class="content">
	<Header />
	<main>
		<slot />
	</main>
	<Footer />
</div>

<style>
	.content {
		max-width: 960px;
		margin: 0 auto;
	}
	main {
		width: 85%;
		margin: 0 auto;
		font-size: 12px;
		text-align: center;
	}
</style>
