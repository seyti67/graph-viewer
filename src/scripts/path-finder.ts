export interface PathRes {
	type: 'distance' | 'visited' | 'found' | 'path' | 'done' | 'unreachable';
	current: number;
	neighbor?: number;
	previous?: number;
}

// Dijkstra algorithm step by step
export function *findPath(matrix: number[][], start: number, end: number): IterableIterator<PathRes> {
	const size = matrix.length;
	const unvisited = matrix.map((_, i) => i); // all nodes are unvisited
	const visited = []; // no nodes are visited
	const distances = Array(size).fill([Infinity, undefined]); // [distance, previous]
	distances[start] = [0, undefined];

	let current = start;
	while (unvisited.length > 0) {
		// find the closest unvisited node
		let min = Infinity;
		let minIndex = 0;
		for (let i = 0; i < unvisited.length; i++) {
			const d = distances[unvisited[i]][0];
			if (d < min) {
				min = d;
				minIndex = i;
			}
		}
		if (min === Infinity) { // no path found
			return { type: 'unreachable' };
		}
		current = unvisited[minIndex];


		if (current === end) {
			yield {
				type: 'found',
				current,
			}
			break;
		}; // we found the end

		// mark the current node as visited
		visited.push(current);
		unvisited.splice(unvisited.indexOf(current), 1);

		// update distances
		const neighbors = unvisited.filter(i => matrix[current][i] !== Infinity);
		for (let i = 0; i < neighbors.length; i++) {
			const neighbor = neighbors[i];
			const distance = distances[current][0] + matrix[current][neighbor];
			if (distance < distances[neighbor][0]) {
				distances[neighbor] = [distance, current];
			}
			yield {
				type: 'distance',
				current,
				neighbor,
			}
		}

		yield {
			type: 'visited',
			current,
		};
	}
	
	// reconstruct the path
	let previous = distances[end][1];
	while (previous !== undefined) {
		yield {
			type: 'path',
			current,
			previous,
		};
		current = previous;
		previous = distances[previous][1];
	}

	return {
		type: 'done',
	};
}