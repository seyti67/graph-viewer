<script>
export let checked = false;
</script>

<label>
	<input type="checkbox" on:change bind:checked={checked}/>
	<div class="box"></div>
</label>

<style>
input {
	display: none;
}
.box {
	width: 1.5em;
	height: 1.5em;
	background-color: red;
}
:checked + .box {
	background-color: green;
}
</style>