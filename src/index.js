"use strict";
const graph = {
    'Catedral': {
        'Parque do Ingá': 0.7,
        'Estádio Willie Davids': 2.2,
    },
    'Parque do Ingá': {
        'Estádio Willie Davids': 2.7,
        'Museu da Bacia do Paraná': 3.3,
        'Parque do Japão': 6.3,
    },
    'Estádio Willie Davids': {
        'Bosque das Grevíleas': 4.8,
        'Parque do Japão': 8.1,
        'Museu da Bacia do Paraná': 1.8,
    },
    'Museu da Bacia do Paraná': {
        'Bosque das Grevíleas': 4.1,
        'Parque do Japão': 6.8,
    },
    'Parque do Japão': {
        'Museu da Bacia do Paraná': 8.0,
    },
    'Bosque das Grevíleas': {
        'Parque do Ingá': 3.5,
    },
};
function dijkstra(graph, start, end) {
    const distances = {};
    const visited = new Set();
    const previous = {};
    const queue = [];
    for (const node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
    }
    distances[start] = 0;
    queue.push([start, 0]);
    while (queue.length > 0) {
        queue.sort((a, b) => a[1] - b[1]);
        const [current, currentDistance] = queue.shift();
        if (visited.has(current))
            continue;
        visited.add(current);
        if (current === end)
            break;
        for (const neighbor in graph[current]) {
            const distance = graph[current][neighbor];
            const newDistance = currentDistance + distance;
            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                previous[neighbor] = current;
                queue.push([neighbor, newDistance]);
            }
        }
    }
    const path = [];
    let currentNode = end;
    while (currentNode) {
        path.unshift(currentNode);
        currentNode = previous[currentNode];
    }
    return { distance: distances[end], path };
}
// --- Exemplo de uso ---
const origem = 'Catedral';
const destino = 'Parque do Japão';
const resultado = dijkstra(graph, origem, destino);
console.log(`Melhor caminho de '${origem}' até '${destino}':`);
console.log(resultado.path.join(" -> "));
console.log(`Distância total: ${resultado.distance.toFixed(2)} km`);
