<script>
import Checkbox from './checkbox.svelte';

let size = 2;
</script>

<table>
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
				<td> <Checkbox /> </td>
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
