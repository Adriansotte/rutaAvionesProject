import Route from "../model/RouteModel.js";

// Regresa todas las ciudades de la base de datos
export const getRoutes = async () => {
    try {
        return await Route.findAll();

    } catch (error) {
        console.log(error);
        return null
    }
}

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