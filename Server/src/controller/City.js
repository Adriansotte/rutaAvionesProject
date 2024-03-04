import Route from "../model/RouteModel.js";

// Actualiza los atributos de la ciudad en la base de datos dado un modelo ya actualizado
export const updateWithUpdatedModel = async (updatedRoute) => {
    try {
        await Route.update({
            airTraffic: updatedRoute.airTraffic,
            routeTime: updatedRoute.routeTime,
            animalRoute: updatedRoute.animalRoute,
            totalCost: updatedRoute.totalCost,
        }, {
            where: {
                id: updatedRoute.id
            }
        })

    } catch (error) {
        console.log(error)
    }
}

// Regresa todas las ciudades de la base de datos
export const getCities = async () => {
    try {
        return await Route.findAll();

    } catch (error) {
        console.log(error);
        return null
    }
}

// Verifica que la id enviada sea correcta, si lo es obtiene la ruta mas eficiente
export const ManageObtainRouteToCity = async (req, res) => {
    const id = req.params.id
    if (!id) {
        return null
    }
}



const obtainCityById = async (id) => {
    try {
        // Utiliza findOne para obtener un registro que cumpla con la condición especificada
        const city = await Route.findOne({
            where: {
                id: id // Especifica la condición de búsqueda
            }


            
        });
        return city;
    } catch (error) {
        console.log(error);
        return null;
    }
}

