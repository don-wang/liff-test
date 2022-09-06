<script lang="ts">
	import { onMount } from 'svelte';
	import QRCode from 'qrcode';

	export let url: string;
	let qrData: string;

	onMount(async () => {
		qrData = await QRCode.toDataURL(url);
	});
</script>

<img src={qrData} alt="qr code" />
