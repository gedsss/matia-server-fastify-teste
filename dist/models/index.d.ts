import type { Model, ModelStatic } from 'sequelize';
import { Sequelize } from 'sequelize';
interface ModelWithAssociate extends ModelStatic<Model> {
    associate?(models: Db): void;
}
interface Db {
    sequelize: Sequelize;
    Sequelize: typeof Sequelize;
    [key: string]: ModelWithAssociate | Sequelize | typeof Sequelize;
}
declare const _default: Db;
export default _default;
