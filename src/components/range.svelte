<script>
import { fly, fade } from 'svelte/transition';
const duration = 500;

export let min;
export let max;
export let value;
</script>
<div class="inputs" in:fly={{y:100, duration, delay:duration}} out:fade={{duration}}>
	<button on:click={() => {value--}}>-</button>
	<input type="range" min={min} max={max} bind:value/>
	<button on:click={() => {value++}}>+</button>
</div>

<style>
input {
	-webkit-appearance: none;
	background-color: inherit;
	width: 100%;
	outline: none;
	opacity: 0.7;
	border-radius: 100px;
	box-shadow: 0 0 .5em #0000;
	transition: box-shadow .3s;
	padding: 0 .5em;
}
.inputs {
	display: flex;
	font-size: 2em;
}
.inputs button {
	outline: none;
	border: none;
	background: none;
	font-size: 1em;
	transform: translateY(-2px);
	cursor: pointer;
}
input::-webkit-slider-runnable-track {
	height: .2em;
	background: #0009;
	border: 0;
}
input::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	width: 2em;
	height: 2em;
	transform: translateY(-0.9em);
	border-radius: 50%;
	background: var(--color-primary);
	cursor: pointer;
}
input::-webkit-slider-thumb:hover {
	filter: brightness(1.2);
}
input::-webkit-slider-thumb:active {
	filter: brightness(.9);
}
input:focus {
	box-shadow: 0 0 .5em #0003;
}
</style>