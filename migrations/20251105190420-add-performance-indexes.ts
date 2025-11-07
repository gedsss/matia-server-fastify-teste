import type { QueryInterface } from 'sequelize'

async function indexExists(
  queryInterface: QueryInterface,
  table: string,
  index: string
): Promise<boolean> {
  const [results] = await queryInterface.sequelize.query(
    `SELECT 1 FROM pg_indexes WHERE tablename = '${table}' AND indexname = '${index}'`
  )
  return results.length > 0
}

async function columnExists(
  queryInterface: QueryInterface,
  table: string,
  column: string
): Promise<boolean> {
  const tableDesc = await queryInterface.describeTable(table)
  return column in tableDesc
}

export async function up(queryInterface: QueryInterface) {
  // Índices EXISTENTES
  if (
    (await columnExists(queryInterface, 'conversation', 'user_id')) &&
    !(await indexExists(
      queryInterface,
      'conversation',
      'idx_conversation_user_id'
    ))
  ) {
    await queryInterface.addIndex('conversation', ['user_id'], {
      name: 'idx_conversation_user_id',
      unique: false,
    })
  }

  if (
    (await columnExists(queryInterface, 'messages', 'conversation_id')) &&
    !(await indexExists(
      queryInterface,
      'messages',
      'idx_messages_conversation_id'
    ))
  ) {
    await queryInterface.addIndex('messages', ['conversation_id'], {
      name: 'idx_messages_conversation_id',
      unique: false,
    })
  }

  if (
    (await columnExists(queryInterface, 'documents', 'user_id')) &&
    !(await indexExists(queryInterface, 'documents', 'idx_documents_user_id'))
  ) {
    await queryInterface.addIndex('documents', ['user_id'], {
      name: 'idx_documents_user_id',
      unique: false,
    })
  }

  if (
    (await columnExists(queryInterface, 'documents', 'status')) &&
    !(await indexExists(queryInterface, 'documents', 'idx_documents_status'))
  ) {
    await queryInterface.addIndex('documents', ['status'], {
      name: 'idx_documents_status',
      unique: false,
    })
  }

  // NOVOS ÍNDICES para 'user_activity_logs'
  const tableName = 'user_activity_logs'

  if (
    (await columnExists(queryInterface, tableName, 'user_id')) &&
    !(await indexExists(
      queryInterface,
      tableName,
      'idx_user_activity_logs_user_id'
    ))
  ) {
    await queryInterface.addIndex(tableName, ['user_id'], {
      name: 'idx_user_activity_logs_user_id',
    })
  }

  if (
    (await columnExists(queryInterface, tableName, 'action_type')) &&
    !(await indexExists(
      queryInterface,
      tableName,
      'idx_user_activity_logs_action_type'
    ))
  ) {
    await queryInterface.addIndex(tableName, ['action_type'], {
      name: 'idx_user_activity_logs_action_type',
    })
  }

  if (
    (await columnExists(queryInterface, tableName, 'created_at')) &&
    !(await indexExists(
      queryInterface,
      tableName,
      'idx_user_activity_logs_created_at'
    ))
  ) {
    await queryInterface.addIndex(tableName, {
      name: 'idx_user_activity_logs_created_at',
      fields: [
        {
          name: 'created_at',
          order: 'DESC',
        },
      ] as {
        name: string
        order?: 'ASC' | 'DESC'
      }[],
    })
  }

  if (
    (await columnExists(queryInterface, tableName, 'resource_type')) &&
    (await columnExists(queryInterface, tableName, 'resource_id')) &&
    !(await indexExists(
      queryInterface,
      tableName,
      'idx_user_activity_logs_resource'
    ))
  ) {
    await queryInterface.addIndex(tableName, ['resource_type', 'resource_id'], {
      name: 'idx_user_activity_logs_resource',
    })
  }
}

export async function down(queryInterface: QueryInterface) {
  const indices = [
    { table: 'conversation', name: 'idx_conversation_user_id' },
    { table: 'messages', name: 'idx_messages_conversation_id' },
    { table: 'documents', name: 'idx_documents_user_id' },
    { table: 'documents', name: 'idx_documents_status' },
    { table: 'user_activity_logs', name: 'idx_user_activity_logs_user_id' },
    { table: 'user_activity_logs', name: 'idx_user_activity_logs_action_type' },
    { table: 'user_activity_logs', name: 'idx_user_activity_logs_created_at' },
    { table: 'user_activity_logs', name: 'idx_user_activity_logs_resource' },
  ]

  for (const { table, name } of indices) {
    if (await indexExists(queryInterface, table, name)) {
      await queryInterface.removeIndex(table, name)
    }
  }
}
