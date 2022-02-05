import cytoscape from 'cytoscape';

export class Graph {
	private cy: any;
	private width: number;
	private heigth: number;
	private nodes: Array<any> = [];
	private edges: any;
	private tmpEdge: any;

	private SpeedMode = false;

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
					'line-color': '#aaa',
					'target-arrow-color': '#ccc',
					'target-arrow-shape': 'triangle',
					'curve-style': 'straight',
					'text-background-color': '#fff',
					'text-background-opacity': 1,
					'text-background-padding': 6,
				}
			},
			{
				selector: 'edge[speed > 0]',
				style: {
					'line-color': 'data(color)',
					'target-arrow-color': 'data(color)',
					'color': 'data(color)',
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
					'line-color': '#d33939',
					'target-arrow-color': '#9b1a1a',
				}
			},
			{
				selector: 'node[found = 1]',
				style: {
					'background-color': '#18bf55',
				}
			},
			{
				selector: 'edge[path]',
				style: {
					'line-color': '#18bf55',
					'target-arrow-color': '#0e7f37',
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
					newEdges.push({
						group: 'edges',
						data: {
							id: 'e' + i + j,
							source: 'n' + i,
							target: 'n' + j,
						}
					});
				}
			});
		});
		while(this.nodes.length > matrix.length) { // remove nodes that don't exist anymore
			this.nodes.pop().remove();
		}

		if (this.edges) this.cy.remove(this.edges);
		this.edges = this.cy.add(newEdges);

		this.speedMode(this.SpeedMode);
		this.getDistances();
	}

	public speedMode(mode: boolean): void {
		this.SpeedMode = mode;
		if (mode) {
			this.edges.forEach(edge => {
				const speed = 20 + Math.floor(Math.random()*120);
				edge.data('speed', speed);
				edge.data('color', `hsl(${speed}, 30%, 40%)`);
			});
		} else {
			this.edges.forEach(edge => {
				edge.data('speed', 0);
				edge.data('color', '');
			});
		}
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
			let distance = Math.round((Math.sqrt(Math.pow(n[0].x - n[1].x, 2) + Math.pow(n[0].y - n[1].y, 2))) * 10) / 10
			if (this.SpeedMode) distance = Math.round(distance / edge.data('speed')*100) / 100;

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
