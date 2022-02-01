<script lang="ts">
import Matrice from './components/matrice.svelte';
import { Graph } from './scripts/graph';

let graph: Graph;
const cities = ['Paris', 'Strasbourg', 'Lille', 'Bordeaux', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Rennes', 'Le Havre', 'Reims', 'St-Etienne', 'Toulon', 'Grenoble', 'Dijon', 'Angers', 'Nancy', 'Aix-en-Provence', 'Brest', 'Le Mans', 'Limoges', 'Clermont-Ferrand', 'Amiens', 'Metz', 'Perpignan', 'Besancon', 'Orleans', 'Rouen', 'Caen', 'Nimes', 'Toulon', 'Poitiers', 'Montauban', 'Avignon', 'Ajaccio', 'Besancon', 'Limoges', 'Bordeaux', 'Lyon', 'Nantes', 'Paris', 'Lille', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Rennes', 'Le Havre', 'Reims', 'St-Etienne', 'Toulon', 'Grenoble', 'Dijon', 'Angers', 'Nancy', 'Aix-en-Provence', 'Brest', 'Le Mans', 'Limoges', 'Clermont-Ferrand', 'Amiens', 'Metz', 'Perpignan', 'Besancon', 'Orleans', 'Rouen', 'Caen', 'Nimes', 'Toulon', 'Poitiers', 'Montauban', 'Avignon', 'Ajaccio', 'Besancon', 'Limoges', 'Bordeaux', 'Lyon', 'Nantes', 'Paris', 'Lille', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Rennes', 'Le Havre', 'Reims', 'St-Etienne', 'Toulon', 'Grenoble', 'Dijon', 'Angers', 'Nancy', 'Aix-en-Provence', 'Brest', 'Le Mans', 'Limoges', 'Clermont-Ferrand', 'Amiens']
window.addEventListener('load', () => {
	graph = new Graph(cities);
	updateDistances();
});

let distances = [];
function updateDistances() {
	distances = graph.getDistances();
}
window.addEventListener('mouseup', updateDistances);

let grid;
let gridSize = 5;
$: if(graph) graph.set(grid)

</script>

<main>
	<div class="infos"></div>
	<div id="cy"></div>
	<div class="matrice-box">
		<Matrice bind:grid={grid} size={gridSize}/>
		<input type="range" bind:value={gridSize} min="2" max="15">
	</div>
	<div class="result">
		{#each distances as d}
			<span><b>{d.path.join(' -> ')}</b> {d.distance}</span>
		{/each}
	</div>
</main>

<style>
#cy {
	height: 100vh;
	width: 100vw;
}
.result {
	position: absolute;
	bottom: 0;
	right: 0;
	display: flex;
	flex-direction: column;
}
.matrice-box {
	position: absolute;
	text-align: right;
	top: 0;
	right: 0;
}
</style>