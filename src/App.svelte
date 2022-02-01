<script lang="ts">
import Matrice from './components/matrice.svelte';
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

let grid;
let gridSize = 5;
$: if(graph) {
	graph.set(grid);
	updateDistances();
}

let distances = [];
function updateDistances() {
	distances = graph.getDistances();
}
window.addEventListener('mouseup', updateDistances);

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
			<input type="range" bind:value={gridSize} min="2" max="15" in:fly={{x:100, duration}} out:fade={{duration}}>
			<div in:fly={{x:100, duration, delay:duration}} out:fade={{duration}}>
				<Matrice bind:grid={grid} size={gridSize} on:hover={hover}/>
			</div>
			<div class="result" in:fly={{x:100, duration, delay:2*duration}} out:fade={{duration}}>
				{#each distances as d}
					<span><b>{d.path.join(' -> ')}</b> {d.distance}</span>
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
	min-width: 15rem;
	height: 100%;
	transform: translateX(calc(100% - 4em));
	transition: .3s transform;
}
#sidebar.show {
	min-width: 15rem;
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
.result {
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	max-height: 70%;
}
.matrice-box {

}
.matrice-box input {
	width: 10em;
}
</style>