<script lang="ts">
import Checkbox from './checkbox.svelte';

export let size = 2;
export let grid: Array<Array<boolean>> = Array.from({ length: size }, () => Array.from({ length: size }, () => false));
$: while(size !== grid.length) {
	if (grid.length < size) grid.push([])
	else if(grid.length > size) grid = grid.slice(0, grid.length - 1)
}
</script>

<table class="matrice">
	{#each Array(size) as _, y}
		<tr>
			<td>{y}</td>
			{#each Array(size) as _, x}
				<td> <Checkbox bind:checked={grid[y][x]} on:change/> </td>
			{/each}
		</tr>
	{/each}
	<tr>
		<td/>
		{#each Array(size) as _, x}
			<td>{x}</td>
		{/each}
	</tr>
</table>

<style>
table {  
	line-height: 1;
	text-align: center;
	border-collapse: collapse;
	border-spacing: 0;
}

td {
	padding: 0;
	border: 1px solid black;
	width: 1.5em;
	height: 1.5em;
}
</style>
