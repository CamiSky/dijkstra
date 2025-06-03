type Grafo = {
  [local: string]: {
    [vizinho: string]: number;
  };
};

const grafoComDistancia: Grafo = {
  'Catedral': {
    'Parque do Ingá': 0.7,
    'Estádio Willie Davids': 2.2,
  },
  'Parque do Ingá': {
    'Catedral': 0.7,
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
    'Catedral': 3.0,
    'Parque do Ingá': 3.5,
  },
};

const grafoComImportancia: Grafo = {
  'Catedral': {
    'Parque do Ingá': 17,
    'Estádio Willie Davids': 42,
  },
  'Parque do Ingá': {
    'Catedral': 7,
    'Estádio Willie Davids': 47,
    'Museu da Bacia do Paraná': 73,
    'Parque do Japão': 93,
  },
  'Estádio Willie Davids': {
    'Bosque das Grevíleas': 98,
    'Parque do Japão': 111,
    'Museu da Bacia do Paraná': 58,
  },
  'Museu da Bacia do Paraná': {
    'Bosque das Grevíleas': 91,
    'Parque do Japão': 98,
  },
  'Parque do Japão': {
    'Museu da Bacia do Paraná': 120,
  },
  'Bosque das Grevíleas': {
    'Catedral': 30,
    'Parque do Ingá': 45,
  },
};

function dijkstra(grafo: Grafo, origem: string, destino: string): { distancia: number; caminho: string[] } {
  const distancias: Record<string, number> = {};
  const visitados: Set<string> = new Set();
  const anteriores: Record<string, string | null> = {};
  const fila: [string, number][] = [];

  for (const local in grafo) {
    distancias[local] = Infinity;
    anteriores[local] = null;
  }

  distancias[origem] = 0;
  fila.push([origem, 0]);

  while (fila.length > 0) {
    fila.sort((a, b) => a[1] - b[1]);
    const [atual, distanciaAtual] = fila.shift()!;

    if (visitados.has(atual)) continue;
    visitados.add(atual);

    if (atual === destino) break;

    for (const vizinho in grafo[atual]) {
      const distancia = grafo[atual][vizinho];
      const novaDistancia = distanciaAtual + distancia;

      if (novaDistancia < distancias[vizinho]) {
        distancias[vizinho] = novaDistancia;
        anteriores[vizinho] = atual;
        fila.push([vizinho, novaDistancia]);
      }
    }
  }

  const caminho: string[] = [];
  let noAtual: string | null = destino;

  while (noAtual) {
    caminho.unshift(noAtual);
    noAtual = anteriores[noAtual];
  }

  return { distancia: distancias[destino], caminho };
}

const origem = 'Parque do Japão';
const destino = 'Bosque das Grevíleas';

const resultadoDistancia = dijkstra(grafoComDistancia, origem, destino);

const resultadoImportancia = dijkstra(grafoComImportancia, origem, destino);

console.log(`\nMelhor caminho de '${origem}' até '${destino}' com base na distância (km):`);
console.log(`Caminho: ${resultadoDistancia.caminho.join(" -> ")}`);
console.log(`Distância total: ${resultadoDistancia.distancia.toFixed(2)} km`);

console.log(`\nMelhor caminho de '${origem}' até '${destino}' com base na importância (menor peso):`);
console.log(`Caminho: ${resultadoImportancia.caminho.join(" -> ")}`);
console.log(`Peso total: ${resultadoImportancia.distancia}`);
