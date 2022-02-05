<script>
export let value;
</script>

<select bind:value on:change>
	<slot></slot>
</select>

<style>
select {
	padding: .5em;
	border-radius: .5em;
	border: .2em solid var(--color-primary);
	background: #fff;
	outline: none;
	cursor: pointer;
	transition: filter .2s;
}
select:hover {
	filter: brightness(.9);
}
</style>