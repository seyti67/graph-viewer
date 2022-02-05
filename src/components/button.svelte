<script>
export let disabled = false;
</script>

<button {disabled} on:click>
	<slot></slot>
</button>

<style>
button {
	background-color: var(--color-primary);
	box-shadow: .2em .2em .5em #0003;
	padding: .8em 1.5em;
	border: none;
	border-radius: .6em;
	cursor: pointer;
	margin: .5em 20%;
	width: 60%;
	color: white;
	transition: filter .3s, transform .3s, box-shadow .5s;
}
button:disabled {
	filter: grayscale(70%) brightness(70%);
	pointer-events: none;
}
button:hover {
	transform: scale(1.1);
}
button:active {
	box-shadow: 0 0 0 #0003;
	transform: scale(.95);
}
</style>