import cytoscape from 'cytoscape';

export class Graph {
	private cy: any;
	private width: number;
	private heigth: number;
	private nodes: Array<any> = [];
	private edges: any;
	private tmpEdge: any;

	constructor (private cities: Array<string>) {
		this.cy = cytoscape({
			container: document.getElementById('cy'), // container to render in
	
			style: [ // the stylesheet for the graph
			{
				selector: '[label]',
				style: {
					'label': 'data(label)',
				}
			},

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
					'text-background-color': '#fff',
					'text-background-opacity': 1,
					'text-background-padding': 6,
				}
			},

			{
				selector: 'edge[id = "tmp"]',
				style: {
					'line-color': '#3d8faf',
					'target-arrow-color': '#1e5870',
				}
			}
			],
				layout: {
				name: 'grid',
				rows: 1
			}
		});
		this.width = this.cy.width();
		this.heigth = this.cy.height();
	}

	public set(matrix: Array<Array<boolean>>): void {
		const newEdges = [];
		matrix.forEach((row, i) => {
			if (i >= this.nodes.length) { // if a node doesn't exist, create it
				const position = {
					x: Math.floor(50 + Math.random() * (this.width -100)*0.85), // *0.85 to pack the nodes a bit to the left
					y: Math.floor(50 + Math.random() * (this.heigth -100))
				}
				this.nodes.push(this.cy.add(
					{ group: 'nodes', data: { id: 'n' + i, label: `${this.cities[i]} (${i})` }, position }
				));
			}
			row.forEach((value, j) => {
				if (value) {
					newEdges.push({ group: 'edges', data: { id: 'e' + i + j, source: 'n' + i, target: 'n' + j } });
				}
			});
		});
		while(this.nodes.length > matrix.length) { // remove nodes that don't exist anymore
			this.nodes.pop().remove();
		}

		if (this.edges) this.cy.remove(this.edges);
		this.edges = this.cy.add(newEdges);

		this.getDistances();
	}

	public getDistances(): Array<Array<number>> {
		if (!this.edges) return [];

		const distances = [];
		for (let i = 0; i < this.nodes.length; i++) {
			distances[i] = Array(this.nodes.length).fill(-1);
		}
		this.edges.forEach((edge, i) => {
			const nodes = edge.connectedNodes();
			const n = nodes.map(node => node.position());
			if (nodes.length !== 2) return;
			const distance = Math.round((Math.sqrt(Math.pow(n[0].x - n[1].x, 2) + Math.pow(n[0].y - n[1].y, 2))) * 10) / 10;

			const Ids = nodes.map(node => node.id().substring(1));
			distances[parseInt(Ids[0])][parseInt(Ids[1])] = distance;
			edge.data('label', distance);
		});
		return distances;
	}

	public setTmpEdge(target: number, source: number): void {
		if (this.tmpEdge) this.tmpEdge.remove();
		this.tmpEdge = this.cy.add({ group: 'edges', data: { id: 'tmp', source: 'n' + source, target: 'n' + target } });

		this.getDistances();
	}

	public removeTmpEdge(): void {
		if (this.tmpEdge) this.tmpEdge.remove();
		this.tmpEdge = null;
	}
}
