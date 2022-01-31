<label>
	<input type="checkbox" on:change/>
	<div class="box"></div>
</label>

<style>
input {
	display: none;
}
.box {
	width: 1em;
	height: 1em;
	background-color: red;
}
:checked + .box {
	background-color: green;
}
</style>