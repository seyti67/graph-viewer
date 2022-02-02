// Dijkstra algorithm step by step
export function *findPath(grid: number[][], start: number, end: number) {
	const visited = Array(grid.length).fill(false);
	const unvisited = grid.map((_, i) => i);
	const path = new Array<number>();
	const distances = grid.map((_, i) => Infinity);
	let current = start;
	let currentDistance = 0;

	distances[start] = 0;
	while (unvisited.length !== 0) {
		const targets = grid[current].filter(x => x !== 0);
		const unvisitedTargets = targets.filter(x => !visited[x]);
		const shortestDistances = unvisitedTargets.map(x => grid[current][x]);
		const shortest = unvisitedTargets.indexOf(Math.min(...shortestDistances));
		if (shortest === -1) {
			current = unvisited.shift()!;
			continue;
		}
		const next = unvisitedTargets[shortest];

		if (next === end) {
			path.push(next);
			break;
		}

		
	}
}