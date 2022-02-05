import cytoscape from 'cytoscape';

export class Graph {
	private cy: any;
	private width: number;
	private heigth: number;
	private nodes: Array<any> = [];
	private edges: any;
	private tmpEdge: any;

	private distanceEdges: Array<any> = [];
	private pathEdges: Array<any> = [];

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
			},
			{
				selector: 'node[visited = 1]',
				style: {
					'background-color': '#3d8faf',
				}
			},
			{
				selector: 'edge[distance]',
				style: {
					'line-color': '#c14c28',
					'target-arrow-color': '#992d0c',
				}
			},
			{
				selector: 'node[found = 1]',
				style: {
					'background-color': '#43a868',
				}
			},
			{
				selector: 'edge[path]',
				style: {
					'line-color': '#43a868',
					'target-arrow-color': '#0c893a',
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
					x: Math.floor(50 + Math.random() * (this.width -100)*0.8), // *0.8 to pack the nodes a bit to the left
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
			distances[i] = Array(this.nodes.length).fill(Infinity);
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

	/* --- Path display --- */
	public addDistanceEdge(source: number, target: number): void {
		this.distanceEdges.push(this.cy.add(
			{ group: 'edges', data: { id: 'p' + source + target, source: 'n' + source, target: 'n' + target, distance: true } }
		));
	}
	public resetDistanceEdges(): void {
		this.distanceEdges.forEach(edge => edge.remove());
		this.distanceEdges = [];
	}

	public addVisitedNode(node: number): void {
		this.nodes[node].data('visited', 1);
	}
	public resetVisitedNodes(): void {
		this.nodes.forEach(node => node.data('visited', 0));
	}

	public setFound(node: number): void {
		this.nodes[node].data('found', 1);
	}
	public resetFound(): void {
		this.nodes.forEach(node => node.data('found', 0));
	}

	public addPathEdge(source: number, target: number): void {
		this.pathEdges.push(this.cy.add(
			{ group: 'edges', data: { id: 'p' + source + target, source: 'n' + source, target: 'n' + target, path: true } }
		));
	}
	public resetPathEdges(): void {
		this.pathEdges.forEach(edge => edge.remove());
		this.pathEdges = [];
	}
}
