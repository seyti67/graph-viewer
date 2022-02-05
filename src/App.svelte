<script lang="ts">
import Matrix from './components/matrix.svelte';
import ArrowLeft from './icons/arrow-left.svelte';
import Range from './components/range.svelte';
import { Graph } from './scripts/graph';
import { findPath, PathRes } from './scripts/path-finder';
import { fly, fade } from 'svelte/transition';
import Fireworks from './components/fireworks.svelte';
import Button from './components/button.svelte';
import Select from './components/select.svelte';
import Checkbox from './components/checkbox.svelte';

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
	const computed = graph.getDistances();
	if (computed.join('') === distances.join('')) return;
	distances = computed;
	updateFinder();
}

let speedMode = false;
$: if(graph) {
	graph.speedMode(speedMode);
	updateDistances();
}

function hover(e: CustomEvent) {
	if (e.detail.x === -1) graph.removeTmpEdge();
	else graph.setTmpEdge(e.detail.x, e.detail.y);
}

let pathStart = 0;
let pathEnd = 0;

let finder = undefined;
function updateFinder() {
	finder = findPath(distances, pathStart, pathEnd);
	message = '';
	found = false;
	graph.resetDistanceEdges();
	graph.resetPathEdges();
	graph.resetVisitedNodes();
	graph.resetFound();
	fireworks.stop();
}

let message = '';
let fireworks: any;
let found = false;
function handlePath(res: PathRes) {
	if (!res.type) return;
	switch (res.type) {
		case 'distance':
			message = `Computing distance between ${cities[res.current]} and ${cities[res.neighbor]}...`;
			graph.addDistanceEdge(res.current, res.neighbor)
			break;
		case 'visited':
			message = `Now we visited ${cities[res.current]} and we'll take the shortest unvisited distance.`;
			graph.addVisitedNode(res.current);
			graph.resetDistanceEdges();
			break;
		case 'found':
			message = `We found ${cities[res.current]}!`;
			graph.resetDistanceEdges();
			graph.setFound(res.current);
			break;
		case 'path':
			message = 'We explored all the best paths, now we will take the shortest one.';
			graph.addPathEdge(res.previous, res.current);
			break;
		case 'done':
			message = 'Good job everyone! We found the shortest path!';
			found = true;
			fireworks.fire();
			break;
	}
}
</script>

<main>
	<div id="cy" on:mouseup={updateDistances}/>
	<div id="sidebar" class:show>
		<div class="toggle-btn" on:click={() => {show = !show}}>
			<ArrowLeft />
		</div>
		{#if show}
			<Range bind:value={gridSize} min="2" max="10"/>
			<div in:fly={{y:100, duration}} out:fade={{duration}} class="matrix-box">
				<Matrix bind:grid={grid} size={gridSize} on:hover={hover}/>
			</div>
			<div style="display:flex;" in:fly={{x:100,duration, delay:duration}} out:fade={{duration}}>
				Speed mode:&nbsp;&nbsp;<Checkbox bind:checked={speedMode}></Checkbox>
			</div>
			<div in:fly={{x: 100, duration, delay: 2*duration}} out:fade={{duration}}>
				<h2>Find path</h2>
				<div class="path">
					<Select bind:value={pathStart} on:change={updateFinder}>
						{#each Array(gridSize) as _, i}
							<option value={i}>{cities[i]}</option>
						{/each}
					</Select>
					->
					<Select bind:value={pathEnd} on:change={updateFinder}>
						{#each Array(gridSize) as _, i}
							<option value={i}>{cities[i]}</option>
						{/each}
					</Select>
				</div>
				<Button disabled={pathStart === pathEnd || found} on:click={() => {
					handlePath(finder.next().value);
				}}>Next</Button>
				<p>{message}</p>
			</div>

			<div class="result" in:fly={{y:100, duration, delay:3*duration}} out:fade={{duration}}>
				{#each distances as row, source}
					{#each row as cell, target}
						{#if cell !== Infinity}
							{cities[source]} -> {cities[target]} : {cell} <br/>
						{/if}
					{/each}
				{/each}
			</div>
		{/if}
	</div>
	<Fireworks bind:this={fireworks}/>
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

.path {
	display: flex;
	justify-content: space-around;
	align-items: center;
}

.result {
	position: absolute;
	bottom: 1rem;
	display: flex;
	flex-direction: column;
	margin: auto;
	overflow-y: auto;
	max-height: 30%;
	width: max-content;
}
.matrix-box {
	margin: 1em auto;
	width: min-content;
}
</style>