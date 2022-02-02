<script lang="ts">
import Matrix from './components/matrix.svelte';
import ArrowLeft from './icons/arrow-left.svelte';
import { Graph } from './scripts/graph';
import { fly, fade } from 'svelte/transition';

let show = true;

let graph: Graph;
const cities = ['Paris', 'Strasbourg', 'Lille', 'Bordeaux', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Rennes', 'Le Havre', 'Reims', 'St-Etienne', 'Toulon', 'Grenoble', 'Dijon', 'Angers', 'Nancy', 'Aix-en-Provence', 'Brest', 'Le Mans', 'Limoges', 'Clermont-Ferrand', 'Amiens', 'Metz', 'Perpignan', 'Besancon', 'Orleans', 'Rouen', 'Caen', 'Nimes', 'Toulon', 'Poitiers', 'Montauban', 'Avignon', 'Ajaccio', 'Besancon', 'Limoges', 'Bordeaux', 'Lyon', 'Nantes', 'Paris', 'Lille', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Rennes', 'Le Havre', 'Reims', 'St-Etienne', 'Toulon', 'Grenoble', 'Dijon', 'Angers', 'Nancy', 'Aix-en-Provence', 'Brest', 'Le Mans', 'Limoges', 'Clermont-Ferrand', 'Amiens', 'Metz', 'Perpignan', 'Besancon', 'Orleans', 'Rouen', 'Caen', 'Nimes', 'Toulon', 'Poitiers', 'Montauban', 'Avignon', 'Ajaccio', 'Besancon', 'Limoges', 'Bordeaux', 'Lyon', 'Nantes', 'Paris', 'Lille', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Rennes', 'Le Havre', 'Reims', 'St-Etienne', 'Toulon', 'Grenoble', 'Dijon', 'Angers', 'Nancy', 'Aix-en-Provence', 'Brest', 'Le Mans', 'Limoges', 'Clermont-Ferrand', 'Amiens']
window.addEventListener('load', () => {
	graph = new Graph(cities);
	updateDistances();
});

let grid: Array<Array<boolean>>;
let gridSize = 5;
$: if(graph) {
	graph.set(grid);
	updateDistances();
}

let distances = [[]];
function updateDistances() {
	distances = graph.getDistances();
}
window.addEventListener('mouseup', updateDistances);

$: distances

function hover(e: CustomEvent) {
	if (e.detail.x === -1) graph.removeTmpEdge();
	else graph.setTmpEdge(e.detail.x, e.detail.y);
}

const duration = 300;
</script>

<main>
	<div id="cy"></div>
	<div id="sidebar" class:show>
		<div class="toggle-btn" on:click={() => {show = !show}}>
			<ArrowLeft />
		</div>
		{#if show}
			<div class="inputs">
				<button on:click={() => {gridSize--}}>-</button>
				<input type="range" bind:value={gridSize} min="2" max="10" in:fly={{y:100, duration, delay:duration}} out:fade={{duration}}>
				<button on:click={() => {gridSize++}}>+</button>
			</div>
			<div in:fly={{y:100, duration, delay:2*duration}} out:fade={{duration}} class="matrix-box">
				<Matrix bind:grid={grid} size={gridSize} on:hover={hover}/>
			</div>
			<div class="result" in:fly={{y:100, duration, delay:3*duration}} out:fade={{duration}}>
				
				{#each distances as row, source}
					{#each row as cell, target}
						{#if cell !== -1}
							{cities[source]} -> {cities[target]} : {cell} <br/>
						{/if}
					{/each}
				{/each}
			</div>
		{/if}
	</div>
</main>

<style>
main, #cy {
	height: 100%;
	width: 100%;
}

#sidebar {
	position: fixed;
	top: 0;
	right: 0;
	padding: 2em;
	padding-top: 4em;
	background-color: #eee;
	box-shadow: 0 0 1rem #0003;
	width: 18rem;
	height: 100%;
	transform: translateX(calc(100% - 4em));
	transition: .3s transform;
}
#sidebar.show {
	transform: translateX(0);
}
.toggle-btn {
	position: absolute;
	font-size: 3rem;
	top: .5rem;
	left: .5rem;
	height: 3rem;
	width: 3rem;
	cursor: pointer;
	transition: .3s transform;
}
#sidebar.show .toggle-btn {
	transform: rotate(180deg);
}

.inputs {
	display: flex;
	font-size: 2em;
}
.inputs button {
	outline: none;
	border: none;
	background: none;
	font-size: 1em;
	transform: translateY(-2px);
	cursor: pointer;
}
.inputs input {
	flex: 1;
	border: none;
	outline: none;
}

.result {
	position: absolute;
	bottom: 0;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	max-height: 50%;
}
.matrix-box {
	margin: auto;
	width: min-content;
}
</style>