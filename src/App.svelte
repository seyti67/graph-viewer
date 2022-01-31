<script>
import cytoscape from 'cytoscape';
import Matrice from './matrice.svelte';

let nodes;
let edges;
let cy;

window.addEventListener('load', () => {
	cy = cytoscape({

container: document.getElementById('cy'), // container to render in

style: [ // the stylesheet for the graph
  {
	selector: 'node',
	style: {
	  'background-color': '#666',
	  'label': 'data(id)'
	}
  },

  {
	selector: 'edge',
	style: {
	  'width': 3,
	  'line-color': '#ccc',
	  'curve-style': 'bezier'
	}
  }
],

layout: {
  name: 'grid',
  rows: 1
}

});

nodes = cy.add([
  { group: 'nodes', data: { id: 'n0' }, position: { x: 100, y: 100 } },
  { group: 'nodes', data: { id: 'n1' }, position: { x: 200, y: 200 } },
]);

console.log(nodes[0].edgeDistances);

edges = cy.add([
	{ group: 'edges', data: { id: 'e0', source: 'n1', target: 'n0' } },
])

});

let edgeDistances = {};
function update() {
	edges.forEach(edge => {
		const n = edge.connectedNodes().map(node => node.position());
		edgeDistances[edge.id()] = Math.sqrt(Math.pow(n[0].x - n[1].x, 2) + Math.pow(n[0].y - n[1].y, 2));
	});
	console.log(edgeDistances);
}
window.addEventListener('mouseup', update);
</script>

<main>
	<div class="infos"></div>
	<div id="cy"></div>
	<Matrice/>
</main>

<style>
#cy {
  height: 100vh;
  width: 100vw;
}
</style>