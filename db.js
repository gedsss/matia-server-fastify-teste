import { Sequelize } from "sequelize";

const sequelize = new Sequelize('matias_novo', 'postgres', 'edson123', {
    host: 'localhost',
    dialect: 'postgres'
});

export default sequelize