<script lang="ts">
	import { onMount } from 'svelte';
	import QRCode from 'qrcode';

	const generateQR = async (text: string) => {
		return await QRCode.toDataURL(text);
	};

	export let url: string;
	let qrData: string;

	onMount(async () => {
		qrData = await generateQR(url);
	});
</script>

<img src={qrData} alt="qr code" />
