// utils/dijkstra.ts
import { Graph } from './graphData';

export function findShortestPath(graph: Graph, start: string, end: string) {
    // 1. Initialize distances (everyone starts at Infinity)
    let distances: { [key: string]: number } = {};
    let previous: { [key: string]: string | null } = {};
    let nodes = new Set<string>();

    for (let node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
        nodes.add(node);
    }
    distances[start] = 0;

    // 2. Loop until we've visited everything
    while (nodes.size > 0) {
        // Find the "closest" node from the ones we haven't visited
        let closestNode = null;
        for (let node of nodes) {
            if (closestNode === null || distances[node] < distances[closestNode]) {
                closestNode = node;
            }
        }

        // If we found the end or hit a wall, stop
        if (closestNode === null || distances[closestNode] === Infinity) break;
        if (closestNode === end) break;

        nodes.delete(closestNode);

        // 3. Update neighbors
        for (let neighbor in graph[closestNode]) {
            let alt = distances[closestNode] + graph[closestNode][neighbor];
            if (alt < distances[neighbor]) {
                distances[neighbor] = alt;
                previous[neighbor] = closestNode;
            }
        }
    }

    // 4. Construct the final path array
    let path = [];
    let current: string | null = end;
    while (current !== null) {
        path.unshift(current);
        current = previous[current];
    }

    return {
        path: path.length > 1 ? path : [], // Returns empty if no path
        distance: distances[end]
    };
}