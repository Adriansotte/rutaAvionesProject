import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('planesAndRoutes', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;