<script lang="ts">
import Matrix from './components/matrix.svelte';
import ArrowLeft from './icons/arrow-left.svelte';
import Range from './components/range.svelte';
import { Graph } from './scripts/graph';
import { findPath } from './scripts/path-finder';
import { fly, fade } from 'svelte/transition';

let show = true;
const duration = 300;

let graph: Graph;
const cities = ['Paris', 'Strasbourg', 'Lille', 'Bordeaux', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Rennes', 'Le Havre', 'Reims', 'St-Etienne', 'Toulon', 'Grenoble', 'Dijon', 'Angers', 'Nancy', 'Aix-en-Provence', 'Brest', 'Le Mans', 'Limoges', 'Clermont-Ferrand', 'Amiens', 'Metz', 'Perpignan', 'Besancon', 'Orleans', 'Rouen', 'Caen', 'Nimes', 'Toulon', 'Poitiers', 'Montauban', 'Avignon', 'Ajaccio', 'Besancon', 'Limoges', 'Bordeaux', 'Lyon', 'Nantes', 'Paris', 'Lille', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Rennes', 'Le Havre', 'Reims', 'St-Etienne', 'Toulon', 'Grenoble', 'Dijon', 'Angers', 'Nancy', 'Aix-en-Provence', 'Brest', 'Le Mans', 'Limoges', 'Clermont-Ferrand', 'Amiens', 'Metz', 'Perpignan', 'Besancon', 'Orleans', 'Rouen', 'Caen', 'Nimes', 'Toulon', 'Poitiers', 'Montauban', 'Avignon', 'Ajaccio', 'Besancon', 'Limoges', 'Bordeaux', 'Lyon', 'Nantes', 'Paris', 'Lille', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Rennes', 'Le Havre', 'Reims', 'St-Etienne', 'Toulon', 'Grenoble', 'Dijon', 'Angers', 'Nancy', 'Aix-en-Provence', 'Brest', 'Le Mans', 'Limoges', 'Clermont-Ferrand', 'Amiens']
window.addEventListener('load', () => {
	graph = new Graph(cities);
	updateDistances();
});

let grid: Array<Array<boolean>>;
let gridSize = 5;
$: gridSize = Math.max(2, Math.min(gridSize, 10));
$: if(graph) {
	graph.set(grid);
	updateDistances();
}

let distances = [[]];
function updateDistances() {
	distances = graph.getDistances();
}
window.addEventListener('mouseup', updateDistances);

function hover(e: CustomEvent) {
	if (e.detail.x === -1) graph.removeTmpEdge();
	else graph.setTmpEdge(e.detail.x, e.detail.y);
}

let pathStart = 0;
let pathEnd = 0;

let finder = undefined;
function updateFinder() {
	finder = findPath(distances, pathStart, pathEnd);
}
</script>

<main>
	<div id="cy"></div>
	<div id="sidebar" class:show>
		<div class="toggle-btn" on:click={() => {show = !show}}>
			<ArrowLeft />
		</div>
		{#if show}
			<Range bind:value={gridSize} min="2" max="10"/>
			<div in:fly={{y:100, duration, delay:2*duration}} out:fade={{duration}} class="matrix-box">
				<Matrix bind:grid={grid} size={gridSize} on:hover={hover}/>
			</div>
			
			<h2>Find path</h2>
			<select bind:value={pathStart} on:change={updateFinder}>
				{#each Array(gridSize) as _, i}
					<option value={i}>{cities[i]}</option>
				{/each}
			</select>
			->
			<select bind:value={pathEnd} on:change={updateFinder}>
				{#each Array(gridSize) as _, i}
					<option value={i}>{cities[i]}</option>
				{/each}
			</select>
			<button on:click={() => {
				console.log(finder.next());
			}}>Find path</button>
			<div class="result" in:fly={{y:100, duration, delay:3*duration}} out:fade={{duration}}>
				{#each distances as row, source}
					{#each row as cell, target}
						{#if cell !== 0}
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
	width: 22rem;
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

.result {
	position: absolute;
	bottom: 1em;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	max-height: 50%;
}
.matrix-box {
	margin: 1em auto;
	width: min-content;
}
</style>