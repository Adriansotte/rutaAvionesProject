import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('planesAndRoutes', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;