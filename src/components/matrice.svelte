<script lang="ts">
import { createEventDispatcher } from 'svelte';


import Checkbox from './checkbox.svelte';

export let size;
export let grid: Array<Array<boolean>> = Array.from({ length: size }, () => Array.from({ length: size }, () => false));

$: grid.length = size;
$: for(let i = 0; i < size; i++) {
	if (!grid[i]) grid[i] = [];
	grid[i].length = size;
	for(let j = 0; j < size; j++) {
		if (grid[i][j] === undefined) grid[i][j] = false;
	}
}

function randomize() {
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			grid[i][j] = Math.random() > 0.5;
		}
	}
}

const dispatch = createEventDispatcher();
function hover(x: number, y: number) {
	dispatch('hover', { x, y });
}
</script>

<table class="matrice">
	{#each Array(size) as _, y}
		<tr>
			<th>{y}</th>
			{#each Array(size) as _, x}
				<td on:mouseleave={() => {hover(-1,-1)}} on:mouseenter={() => hover(x, y)}> <Checkbox bind:checked={grid[y][x]} on:change/> </td>
			{/each}
		</tr>
	{/each}
	<tr>
		<th><img src="images/dice.png" alt="dice" class="dice" on:click={randomize}></th>
		{#each Array(size) as _, x}
			<th>{x}</th>
		{/each}
	</tr>
</table>

<style>
table {
	overflow: hidden;
	line-height: 1;
	text-align: center;
	border-spacing: 0;
	--higlight: #30a4e755;
}

td, th {
	padding: 0;
	width: 1.5em;
	height: 1.5em;
	position: relative;
	
}

tr { transition: background-color .3s; }
tr:hover {
	background-color: var(--higlight);
}
td::after,
th::after {
	content: "";
	position: absolute;
	left: 0;
	top: -5000px;
	height: 10000px;
	width: 100%;
	z-index: -1;
	transition: background-color .3s;
}
td:hover::after,
th:hover::after {
	background-color: var(--higlight);
}
img.dice {
	width: 1.5em;
	height: 1.5em;
	filter: invert(1);
	cursor: pointer;
}
</style>
