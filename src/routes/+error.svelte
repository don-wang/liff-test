<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>LIFF TEST | ERROR</title>
	<meta name="description" content="About this app" />
</svelte:head>

<h1>{$page.status}: {$page.error.message}</h1>
