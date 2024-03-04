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