<script lang="ts">
import Matrice from './components/matrice.svelte';
import { Graph } from './scripts/graph';

let graph: Graph;
const cities = ['Paris', 'Strasbourg', 'Lille', 'Bordeaux', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Rennes', 'Le Havre', 'Reims', 'St-Etienne', 'Toulon', 'Grenoble', 'Dijon', 'Angers', 'Nancy', 'Aix-en-Provence', 'Brest', 'Le Mans', 'Limoges', 'Clermont-Ferrand', 'Amiens', 'Metz', 'Perpignan', 'Besancon', 'Orleans', 'Rouen', 'Caen', 'Nimes', 'Toulon', 'Poitiers', 'Montauban', 'Avignon', 'Ajaccio', 'Besancon', 'Limoges', 'Bordeaux', 'Lyon', 'Nantes', 'Paris', 'Lille', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Rennes', 'Le Havre', 'Reims', 'St-Etienne', 'Toulon', 'Grenoble', 'Dijon', 'Angers', 'Nancy', 'Aix-en-Provence', 'Brest', 'Le Mans', 'Limoges', 'Clermont-Ferrand', 'Amiens', 'Metz', 'Perpignan', 'Besancon', 'Orleans', 'Rouen', 'Caen', 'Nimes', 'Toulon', 'Poitiers', 'Montauban', 'Avignon', 'Ajaccio', 'Besancon', 'Limoges', 'Bordeaux', 'Lyon', 'Nantes', 'Paris', 'Lille', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Rennes', 'Le Havre', 'Reims', 'St-Etienne', 'Toulon', 'Grenoble', 'Dijon', 'Angers', 'Nancy', 'Aix-en-Provence', 'Brest', 'Le Mans', 'Limoges', 'Clermont-Ferrand', 'Amiens']
window.addEventListener('load', () => {
	graph = new Graph(cities);
	graph.set([[false,true,false], [true,false,true], [true,false,true]])
	updateDistances();
});

let distances = [];
function updateDistances() {
	distances = graph.getDistances();
}
window.addEventListener('mouseup', updateDistances);

let grid;
$: if(graph) graph.set(grid)
</script>

<main>
	<div class="infos"></div>
	<div id="cy"></div>
	<Matrice bind:grid={grid} size={5}/>
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
:global(table.matrice) {
	position: absolute;
	top: 0;
	right: 0;
}
</style>