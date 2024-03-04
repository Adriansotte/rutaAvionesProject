import db from "../config/database.js"
import {DataTypes} from "sequelize";
import City from "../model/CityModel.js"

const RouteInfoModel = db.define('Route', {
    originCityId: {
        type: DataTypes.INTEGER,
        references: {
            model: City,
            key: 'id'
        }
    },
    destinyCityId: {
        type: DataTypes.INTEGER,
        references: {
            model: City,
            key: 'id'
        }
    },
    airTraffic: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    routeTime: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    animalRoute: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

City.hasMany(RouteInfoModel, { foreignKey: 'originCityId', as: 'OriginRoute' });
City.hasMany(RouteInfoModel, { foreignKey: 'destinyCityId', as: 'DestinyRoute' });
RouteInfoModel.belongsTo(City, { foreignKey: 'originCityId', as: 'OriginCity' });
RouteInfoModel.belongsTo(City, { foreignKey: 'destinyCityId', as: 'DestinyCity' });

(async () => {
    await db.sync();
})();

export default RouteInfoModel;