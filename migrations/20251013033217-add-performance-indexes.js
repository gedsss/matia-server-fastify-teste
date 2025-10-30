/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    // Índices EXISTENTES
    // ----------------------------------------------------
    // 1. Índice para 'conversations'
    await queryInterface.addIndex('conversation', ['user_id'], {
        name: 'idx_conversation_user_id',
        unique: false,
    });

    // 2. Índice para 'messages'
    await queryInterface.addIndex('messages', ['conversation_id'], {
        name: 'idx_messages_conversation_id',
        unique: false,
    });

    // 3. Índice para 'documents' (user_id)
    await queryInterface.addIndex('documents', ['user_id'], {
        name: 'idx_documents_user_id',
        unique: false,
    });

    // 4. Índice para 'documents' (status)
    await queryInterface.addIndex('documents', ['status'], {
        name: 'idx_documents_status',
        unique: false,
    });

    // ----------------------------------------------------
    // NOVOS ÍNDICES para 'user_activity_logs'
    // ----------------------------------------------------
    const tableName = 'user_activity_logs';

    // 5. Índice em user_id
    await queryInterface.addIndex(tableName, ['user_id'], {
      name: 'idx_user_activity_logs_user_id',
    });

    // 6. Índice em action_type
    await queryInterface.addIndex(tableName, ['action_type'], {
      name: 'idx_user_activity_logs_action_type',
    });

    // 7. Índice em created_at (Decrescente)
    await queryInterface.addIndex(tableName, [
      {
        attribute: 'created_at',
        order: 'DESC',
      },
    ], {
      name: 'idx_user_activity_logs_created_at',
    });

    // 8. Índice composto em resource_type e resource_id
    await queryInterface.addIndex(tableName, ['resource_type', 'resource_id'], {
      name: 'idx_user_activity_logs_resource',
    });
  },

  async down (queryInterface, Sequelize) {
    // Comando para reverter as alterações (remover os índices)
    // ----------------------------------------------------
    // Remoção de índices EXISTENTES
    await queryInterface.removeIndex('conversation', 'idx_conversations_user_id');
    await queryInterface.removeIndex('messages', 'idx_messages_conversation_id');
    await queryInterface.removeIndex('documents', 'idx_documents_user_id');
    await queryInterface.removeIndex('documents', 'idx_documents_status');

    // ----------------------------------------------------
    // Remoção de NOVOS ÍNDICES para 'user_activity_logs'
    await queryInterface.removeIndex('user_activity_logs', 'idx_user_activity_logs_user_id');
    await queryInterface.removeIndex('user_activity_logs', 'idx_user_activity_logs_action_type');
    await queryInterface.removeIndex('user_activity_logs', 'idx_user_activity_logs_created_at');
    await queryInterface.removeIndex('user_activity_logs', 'idx_user_activity_logs_resource');
  }
};