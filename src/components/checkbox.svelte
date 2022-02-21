<script>
export let disabled = false;
export let checked = false;
</script>

<label class:disabled>
	<input type="checkbox" on:change bind:checked={checked}/>
	<div class="box"></div>
</label>

<style>
label.disabled {
	pointer-events: none;
	filter: grayscale(90%);
}
input {
	display: none;
}
.box {
	cursor: pointer;
	width: 1.5em;
	height: 1.5em;
	background-color: #c55252;
	box-shadow: inset .1em .1em .2em #0003, inset -.1em -.1em .2em #fff3;
	transition: box-shadow, filter, .3s;
}
:checked + .box {
	background-color: #73b369;
	box-shadow: inset .1em .1em .2em #fff3, inset -.1em -.1em .2em #0003;
}

.box:hover {
	filter: brightness(1.2);
}
</style>