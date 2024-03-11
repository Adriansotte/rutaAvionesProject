import City from "../model/CityModel.js";
import RouteInfoModel from "../model/RouteModel.js";

// Función para generar el grafo a partir de los datos de la base de datos
async function generateGraph() {
    try {
        const grafo = {};
        const ciudades = await City.findAll({
            include: [
                { model: RouteInfoModel, as: 'OriginRoute' }
            ]
        });
        for (const ciudad of ciudades) {
            const conexionesCiudad = [];
            for (const route of ciudad.OriginRoute) {
                const destino = await City.findByPk(route.destinyCityId);
                // Calcula el peso de la conexión sumando los valores asociados
                const peso = route.airTraffic + route.routeTime + (route.animalRoute ? 1 : 0);
                conexionesCiudad.push({
                    ciudad: destino.name,
                    peso: peso
                });
            }
            grafo[ciudad.name] = conexionesCiudad;
        }
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
        for (const ciudad in grafo) {
            pesos[ciudad] = ciudad === ciudadInicial.name ? 0 : Infinity;
        }
        let ciudadActual = ciudadInicial.name;
        while (ciudadActual) {
            const conexiones = grafo[ciudadActual];
            for (const conexion of conexiones) {
                const ciudadDestino = conexion.ciudad;
                const pesoConexion = conexion.peso;
                const nuevoPeso = pesos[ciudadActual] + pesoConexion;
                if (nuevoPeso < pesos[ciudadDestino]) {
                    pesos[ciudadDestino] = nuevoPeso;
                    nodosPadre[ciudadDestino] = ciudadActual;
                }
            }
            procesados.push(ciudadActual);
            ciudadActual = Object.keys(pesos)
                .filter(ciudad => !procesados.includes(ciudad))
                .reduce((a, b) => pesos[a] < pesos[b] ? a : b, null);
        }
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