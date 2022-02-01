<script lang="ts">
import Checkbox from './checkbox.svelte';

export let size = 2;
export let grid: Array<Array<boolean>> = Array.from({ length: size }, () => Array.from({ length: size }, () => false));
</script>

<table class="matrice">
	<tr>
		<td/>
		{#each Array(size) as _, x}
			<td>{x}</td>
		{/each}
	</tr>
	{#each Array(size) as _, y}
		<tr>
			<td>{y}</td>
			{#each Array(size) as _, x}
				<td> <Checkbox bind:checked={grid[y][x]} on:change/> </td>
			{/each}
		</tr>
	{/each}
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
}
</style>
