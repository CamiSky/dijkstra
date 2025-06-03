var grafoComDistancia = {
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
var grafoComImportancia = {
    'Catedral': {
        'Parque do Ingá': 17,
        'Estádio Willie Davids': 42,
    },
    'Parque do Ingá': {
        'Estádio Willie Davids': 47,
        'Museu da Bacia do Paraná': 63,
        'Parque do Japão': 103,
    },
    'Estádio Willie Davids': {
        'Bosque das Grevíleas': 88,
        'Parque do Japão': 121,
        'Museu da Bacia do Paraná': 48,
    },
    'Museu da Bacia do Paraná': {
        'Bosque das Grevíleas': 81,
        'Parque do Japão': 108,
    },
    'Parque do Japão': {
        'Museu da Bacia do Paraná': 110,
    },
    'Bosque das Grevíleas': {
        'Parque do Ingá': 45,
    },
};
function dijkstra(grafo, origem, destino) {
    var distancias = {};
    var visitados = new Set();
    var anteriores = {};
    var fila = [];
    for (var local in grafo) {
        distancias[local] = Infinity;
        anteriores[local] = null;
    }
    distancias[origem] = 0;
    fila.push([origem, 0]);
    while (fila.length > 0) {
        fila.sort(function (a, b) { return a[1] - b[1]; });
        var _a = fila.shift(), atual = _a[0], distanciaAtual = _a[1];
        if (visitados.has(atual))
            continue;
        visitados.add(atual);
        if (atual === destino)
            break;
        for (var vizinho in grafo[atual]) {
            var distancia = grafo[atual][vizinho];
            var novaDistancia = distanciaAtual + distancia;
            if (novaDistancia < distancias[vizinho]) {
                distancias[vizinho] = novaDistancia;
                anteriores[vizinho] = atual;
                fila.push([vizinho, novaDistancia]);
            }
        }
    }
    var caminho = [];
    var noAtual = destino;
    while (noAtual) {
        caminho.unshift(noAtual);
        noAtual = anteriores[noAtual];
    }
    return { distancia: distancias[destino], caminho: caminho };
}
var origem = 'Parque do Japão';
var destino = 'Bosque das Grevíleas';
var resultadoDistancia = dijkstra(grafoComDistancia, origem, destino);
var resultadoImportancia = dijkstra(grafoComImportancia, origem, destino);
console.log("\nMelhor caminho de '".concat(origem, "' at\u00E9 '").concat(destino, "' com base na dist\u00E2ncia (km):"));
console.log("Caminho: ".concat(resultadoDistancia.caminho.join(" -> ")));
console.log("Dist\u00E2ncia total: ".concat(resultadoDistancia.distancia.toFixed(2), " km"));
console.log("\nMelhor caminho de '".concat(origem, "' at\u00E9 '").concat(destino, "' com base na import\u00E2ncia (menor peso):"));
console.log("Caminho: ".concat(resultadoImportancia.caminho.join(" -> ")));
console.log("Peso total: ".concat(resultadoImportancia.distancia));
