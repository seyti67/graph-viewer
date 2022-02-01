import cytoscape from 'cytoscape';

export class Graph {
	private cy: any;
	private nodes: Array<any>;
	private edges: Array<any>;
	private width: number;
	private heigth: number;

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
					'text-background-color': '#fff',
					'text-background-opacity': 1,
					'text-background-padding': 6,
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

	public set(matrice: Array<Array<boolean>>): void {
		const newNodes = [];
		const newEdges = [];
		matrice.forEach((row, i) => {
			const position = {
				x: Math.floor(50 + Math.random() * (this.width -100)),
				y: Math.floor(50 + Math.random() * (this.heigth -100))
			}
			newNodes.push({ group: 'nodes', data: { id: 'n' + i, label: `${this.cities[i]} (${i})` }, position });
			row.forEach((value, j) => {
				if (value) {
					newEdges.push({ group: 'edges', data: { id: 'e' + i + j, source: 'n' + i, target: 'n' + j } });
				}
			});
		});
		if (!this.nodes) {
			this.cy.add(newNodes);
		} else if (this.nodes.length !== newNodes.length) {
			if (this.nodes.length < newNodes.length) {
				this.cy.remove(this.nodes.slice(newNodes.length - this.nodes.length, -1));
			} else {
				this.cy.add(newNodes.slice(this.nodes.length, -1));
			}
		}
		if (this.edges) this.cy.remove(this.edges);
		this.edges = this.cy.add(newEdges);

		this.getDistances();
	}

	public getDistances(): Array<{ distance: number, path: Array<string> }> {
		if (!this.edges) return [];

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
