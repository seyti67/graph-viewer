import cytoscape from 'cytoscape';

export class Graph {
	private cy: any;
	private nodes: Array<any>;
	private edges: Array<any>;

	constructor (private cities: Array<string>) {
		this.cy = cytoscape({
			container: document.getElementById('cy'), // container to render in
	
			style: [ // the stylesheet for the graph
			{
				selector: 'node',
				style: {
					'background-color': '#666',
					'label': 'data(label)'
				}
			},
	
			{
				selector: 'edge',
				style: {
					'width': 3,
					'line-color': '#ccc',
					'target-arrow-color': '#ccc',
					'target-arrow-shape': 'triangle',
					'curve-style': 'straight',
					'label': 'data(label)',
				}
			}
			],
				layout: {
				name: 'grid',
				rows: 1
			}
		});
	}

	public set(matrice: Array<Array<boolean>>): void {
		const newNodes = [];
		const newEdges = [];
		matrice.forEach((row, i) => {
			newNodes.push({ group: 'nodes', data: { id: 'n' + i, label: `${this.cities[i]} (${i})` }, position: { x: 50, y: 50 } });
			row.forEach((value, j) => {
				if (value) {
					newEdges.push({ group: 'edges', data: { id: 'e' + i + j, source: 'n' + i, target: 'n' + j } });
				}
			});
		});
		if (!this.nodes || this.nodes.length !== newNodes.length) {
			if (this.nodes) this.cy.remove(this.nodes);
			this.nodes = this.cy.add(newNodes);
		}
		if (this.edges) this.cy.remove(this.edges);
		this.edges = this.cy.add(newEdges);

		this.getDistances();
	}

	public getDistances(): Array<{ distance: number, path: Array<string> }> {
		const distances = [];
		this.edges.forEach((edge, i) => {
			const nodes = edge.connectedNodes();
			const n = nodes.map(node => node.position());
			if (nodes.length !== 2) return;
			const distance = Math.round((Math.sqrt(Math.pow(n[0].x - n[1].x, 2) + Math.pow(n[0].y - n[1].y, 2))) * 10) / 10;
			distances.push({
				distance,
				path: [nodes[0].data('label'), nodes[1].data('label')]
			});
			edge.data('label', distance);
		});
		return distances;
	}
}
