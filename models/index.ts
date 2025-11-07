import * as fs from 'fs'
import * as path from 'path'
import type { Model, ModelStatic, Dialect } from 'sequelize'
import { Sequelize, DataTypes } from 'sequelize'
import process from 'process'

interface DbConfig {
  username?: string
  password?: string
  database?: string
  host?: string
  dialect?: Dialect
  use_env_variable?: string
}

interface ModelWithAssociate extends ModelStatic<Model> {
  associate?(models: Db): void
}

interface Db {
  sequelize: Sequelize
  Sequelize: typeof Sequelize
  [key: string]: ModelWithAssociate | Sequelize | typeof Sequelize
}

const basename: string = path.basename(__filename)
const env: string = process.env.NODE_ENV || 'development'

const config = require(path.join(__dirname, '/../config/config.json'))[
  env
] as DbConfig
const db: Partial<Db> = {}

let sequelize: Sequelize

if (config.use_env_variable && process.env[config.use_env_variable]) {
  sequelize = new Sequelize(
    process.env[config.use_env_variable] as string,
    config
  )
} else if (config.database && config.username) {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )
} else {
  throw new Error(
    `Sequelize configuration for environment '${env}' is incomplete.`
  )
}

for (const file of fs.readdirSync(__dirname)) {
  if (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.ts' &&
    file.indexOf('.test.ts') === -1
  ) {
    const modelDefinition = require(path.join(__dirname, file))
    const model = (modelDefinition.default || modelDefinition)(
      sequelize,
      DataTypes
    )

    if (model?.name) {
      ;(db as Db)[model.name] = model
    }
  }
}

for (const modelName of Object.keys(db)) {
  const model = (db as Db)[modelName] as ModelWithAssociate | undefined

  if (model && typeof model.associate === 'function') {
    model.associate(db as Db)
  }
}

;(db as Db).sequelize = sequelize
;(db as Db).Sequelize = Sequelize

export default db as Db
