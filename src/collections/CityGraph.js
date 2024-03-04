class CityGraph {
    constructor() {
        this.nodes = new Map();
        this.edges = new Map();
    }

    addNode(identifier) {
        if (!this.nodes.has(identifier)) {
            this.nodes.set(identifier, {});
            this.edges.set(identifier, new Map());
        }
        throw new Error("El nodo ya existe")
    }

    // Añade una arista bidireccional con el mismo peso en ambas direcciones
    addEdge(node1, node2, weight) {
        if (!this.nodes.has(node1) || !this.nodes.has(node2)) {
            throw new Error("No existe uno de los nodos dados");
        }
        this.edges.get(node1).set(node2, weight);
        this.edges.get(node2).set(node1, weight);
    }
}
