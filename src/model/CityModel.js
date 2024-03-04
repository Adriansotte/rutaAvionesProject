import db from "../config/database.js";
import {DataTypes} from "sequelize";

const City = db.define('City', {
    name: DataTypes.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

(async () => {
    await db.sync();
})();

export default City;