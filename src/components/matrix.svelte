<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { fly } from 'svelte/transition';
import Checkbox from './checkbox.svelte';

export let size: number;
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
			grid[i][j] = !(i == j) && Math.random() > 0.5;
		}
	}
}

const dispatch = createEventDispatcher();
const hoveredCell = { x: -1, y: -1 };
function hover(x: number, y: number) {
	if (x === y) {
		x = -1;
		y = -1;
	};
	dispatch('hover', { x, y });
	hoveredCell.x = x;
	hoveredCell.y = y;
}
</script>

<table class="matrix" style="--size:{(size+1)*1.5}em">
	<tr>
		<th><img src="images/dice.png" alt="dice" class="dice" on:click={randomize}></th>
		{#each Array(size) as _, x}
			<th transition:fly={{y: -100, delay:50*x}} class:active={x === hoveredCell.x}>{x}</th>
		{/each}
	</tr>
	{#each Array(size) as _, y (y)}
		<tr>
			<th transition:fly={{x: -100, delay:50*y}} class:active={y === hoveredCell.y}>{y}</th>
			{#each Array(size) as _, x (x)}
				<td
					on:mouseleave={() => {hover(-1,-1)}}
					on:mouseenter={() => hover(x, y)}
					transition:fly={{x: x*10, y: y*10, duration:400, delay: 50*(x+y)}}
				>
					<Checkbox bind:checked={grid[y][x]} disabled={x == y} on:change/>
				</td>
			{/each}
		</tr>
	{/each}
</table>

<style>
table {
	display: block;
	line-height: 1;
	text-align: center;
	border-spacing: 0;
	--higlight: #30a4e755;
	max-width: var(--size);
	max-height: var(--size);
	transition: max-width, max-height, 0.5s;
}

td, th {
	padding: 0;
	width: 1.5em;
	height: 1.5em;
	position: relative;
}
th {
	transition: background-color .3s;
}
th.active {
	background: var(--higlight);
}

tr {
	overflow: hidden;
	transition: background-color .3s;
}
img.dice {
	width: 1.5em;
	height: 1.5em;
	filter: invert(1);
	cursor: pointer;
}
</style>
