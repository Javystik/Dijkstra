class Graph {
    constructor() {
      this.vertices = [];
      this.edges = {};
    }
  
    addVertex(vertex) {
      this.vertices.push(vertex);
      this.edges[vertex] = {};
    }
  
    addEdge(vertex1, vertex2, weight) {
      this.edges[vertex1][vertex2] = weight;
      this.edges[vertex2][vertex1] = weight;
    }
  
    dijkstra(startVertex) {
      const distances = {};
      const visited = {};
      let currentVertex;
  
      this.vertices.forEach(vertex => {
        distances[vertex] = Infinity;
      });
      distances[startVertex] = 0;
  
      while (Object.keys(visited).length !== this.vertices.length) {
        currentVertex = this.getMinVertex(distances, visited);
        visited[currentVertex] = true;
  
        for (let neighbor in this.edges[currentVertex]) {
          const distance = distances[currentVertex] + this.edges[currentVertex][neighbor];
          if (distance < distances[neighbor]) {
            distances[neighbor] = distance;
          }
        }
      }
  
      return distances;
    }
  
    getMinVertex(distances, visited) {
      let minDistance = Infinity;
      let minVertex;
      for (let vertex in distances) {
        if (!visited[vertex] && distances[vertex] <= minDistance) {
          minDistance = distances[vertex];
          minVertex = vertex;
        }
      }
      return minVertex;
    }
  }
  
  function createGraphFromInput(data) {
    const graph = new Graph();
    const lines = data.trim().split('\n');
    lines.forEach(line => {
      const [vertex1, vertex2, weight] = line.trim().split(' ');
      if (!graph.vertices.includes(vertex1)) {
        graph.addVertex(vertex1);
      }
      if (!graph.vertices.includes(vertex2)) {
        graph.addVertex(vertex2);
      }
      graph.addEdge(vertex1, vertex2, parseInt(weight));
    });
    return graph;
  }
  
  function main() {
    let data = prompt("Enter the graph data (format: vertex1 vertex2 weight, separate lines):");
    while (data.toLowerCase().trim() !== 'q') {
      const graph = createGraphFromInput(data);
      const startVertex = prompt("Enter the starting vertex:");
      const distances = graph.dijkstra(startVertex);
  
      console.log("Shortest distances from vertex", startVertex);
      for (let vertex in distances) {
        console.log(vertex, ":", distances[vertex]);
      }
  
      data = prompt("Enter the graph data (or 'q' to quit):");
    }
    console.log("**Exited**");
  }
  
main();