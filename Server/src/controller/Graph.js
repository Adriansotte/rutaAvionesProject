// Importa los modelos de las tablas de la base de datos
import City from "../model/CityModel.js";
import RouteInfoModel from "../model/RouteModel.js";

// Función para generar el grafo a partir de los datos de la base de datos
async function generateGraph() {
    try {
        const grafo = {};

        // Consulta todas las ciudades y sus rutas correspondientes desde la base de datos
        const ciudades = await City.findAll({
            include: [
                { model: RouteInfoModel, as: 'OriginRoute' }
            ]
        });

        // Itera sobre cada ciudad para generar las conexiones y asignar pesos
        for (const ciudad of ciudades) {
            const conexionesCiudad = [];

            // Itera sobre las rutas salientes desde la ciudad actual
            for (const route of ciudad.OriginRoute) {
                // Encuentra la ciudad de destino para esta ruta
                const destino = await City.findByPk(route.destinyCityId);

                // Calcula el peso de la conexión sumando los valores asociados
                const peso = route.airTraffic + route.routeTime + (route.animalRoute ? 1 : 0);

                // Añade la conexión con su peso a la lista de conexiones
                conexionesCiudad.push({
                    ciudad: destino.name,
                    peso: peso
                });
            }

            // Asigna las conexiones a la ciudad en el grafo
            grafo[ciudad.name] = conexionesCiudad;
        }

        // Devuelve el grafo generado
        return grafo;
    } catch (error) {
        throw new Error('Error al generar el grafo:', error);
    }
}

export const newGraph = async (req, res) => {
    try {
        const grafo = await generateGraph();
        res.json(grafo);
    } catch (error) {
        res.status(500).json({ message: 'Error al generar el grafo', error: error.message });
    }
}

const dijkstra = async (ciudadInicial, ciudadFinal) => {
    try {
        const grafo = await generateGraph();
        const pesos = {};
        const nodosPadre = {};
        const procesados = [];

        // Inicializar los pesos con infinito para todos los nodos excepto el nodo inicial
        for (const ciudad in grafo) {
            pesos[ciudad] = ciudad === ciudadInicial.name ? 0 : Infinity;
        }

        let ciudadActual = ciudadInicial.name;

        while (ciudadActual) {
            const conexiones = grafo[ciudadActual];

            for (const conexion of conexiones) {
                const ciudadDestino = conexion.ciudad;
                const pesoConexion = conexion.peso;

                // Calcular el nuevo peso
                const nuevoPeso = pesos[ciudadActual] + pesoConexion;

                // Actualizar el peso y el nodo padre si se encuentra un camino más corto
                if (nuevoPeso < pesos[ciudadDestino]) {
                    pesos[ciudadDestino] = nuevoPeso;
                    nodosPadre[ciudadDestino] = ciudadActual;
                }
            }

            procesados.push(ciudadActual);

            // Seleccionar el siguiente nodo con el menor peso no procesado
            ciudadActual = Object.keys(pesos)
                .filter(ciudad => !procesados.includes(ciudad))
                .reduce((a, b) => pesos[a] < pesos[b] ? a : b, null);
        }

        // Reconstruir la ruta óptima
        const rutaOptima = [ciudadFinal.name];
        let nodoPadre = nodosPadre[ciudadFinal.name];

        while (nodoPadre) {
            rutaOptima.push(nodoPadre);
            nodoPadre = nodosPadre[nodoPadre];
        }

        rutaOptima.reverse();

        const resultados = {
            distancia: pesos[ciudadFinal.name],
            ruta: rutaOptima
        };

        return resultados;
    } catch (error) {
        throw new Error('Error en el algoritmo de Dijkstra:', error);
    }
};

export const findDestination = async (req, res) => {
    try {
        const inicio = req.body.origin;
        const final = req.body.destination;
        
        console.log(inicio);
        console.log(final);


        const start = await City.findOne({ where: { name: inicio } });
        const end = await City.findOne({ where: { name: final } });
        console.log("Ha generado el grafo");
        const destination = await dijkstra(start, end);
        console.log(destination);
        res.json(destination);
    } catch (error) {
        res.status(500).json({ message: 'Error al generar el grafo asds', error: error.message });
    }
}