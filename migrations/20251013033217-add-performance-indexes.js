/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
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
  },

  async down (queryInterface, Sequelize) {
    // Comando para reverter as alterações (remover os índices)
    await queryInterface.removeIndex('conversation', 'idx_conversations_user_id');
    await queryInterface.removeIndex('messages', 'idx_messages_conversation_id');
    await queryInterface.removeIndex('documents', 'idx_documents_user_id');
    await queryInterface.removeIndex('documents', 'idx_documents_status');
  }
};