<script>
import { onMount } from 'svelte';
import { draw } from 'svelte/transition';

let show = false;
onMount(() => {
	show = true;
});

const duration = 400;
</script>

{#if show}
<svg
	xmlns="http://www.w3.org/2000/svg"
	width="24"
	height="24"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	class="feather feather-arrow-left-circle"
>
	<line x1="16" y1="12" x2="8" y2="12" in:draw={{duration}}/>
	<polyline points="12 8 8 12 12 16" in:draw={{duration, delay: duration}}/>
	<circle cx="12" cy="12" r="10" in:draw={{duration, delay: 2*duration}}/>
</svg>
{/if}

<style>
svg {
	width: 1em;
	height: 1em;
}
</style>