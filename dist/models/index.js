import * as fs from 'fs';
import * as path from 'path';
import process from 'process';
import { DataTypes, Sequelize } from 'sequelize';
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.json'))[env];
const db = {};
let sequelize;
if (config.use_env_variable && process.env[config.use_env_variable]) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
}
else if (config.database && config.username) {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}
else {
    throw new Error(`Sequelize configuration for environment '${env}' is incomplete.`);
}
for (const file of fs.readdirSync(__dirname)) {
    if (file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.ts' &&
        file.indexOf('.test.ts') === -1) {
        const modelDefinition = require(path.join(__dirname, file));
        const model = (modelDefinition.default || modelDefinition)(sequelize, DataTypes);
        if (model?.name) {
            ;
            db[model.name] = model;
        }
    }
}
for (const modelName of Object.keys(db)) {
    const model = db[modelName];
    if (model && typeof model.associate === 'function') {
        model.associate(db);
    }
}
;
db.sequelize = sequelize;
db.Sequelize = Sequelize;
export default db;
//# sourceMappingURL=index.js.map