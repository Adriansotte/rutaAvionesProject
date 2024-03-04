import City from "../model/CityModel.js";

// Regresa todas las ciudades de la base de datos
export const getCities = async () => {
    try {
        return await City.findAll();

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
        const city = await City.findOne({
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


