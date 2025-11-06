import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('user_activity_logs', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    action_type: {
      type: DataTypes.ENUM(
        'login',
        'logout',
        'conversation_created',
        'message_sent',
        'document_uploaded',
        'document_viewed',
        'document_deleted',
        'profile_updated',
        'password_changed'
      ),
      allowNull: false
    },
    resource_type: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Tipo do recurso afetado (e.g., "conversation", "document")'
    },
    resource_id: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: 'ID do recurso afetado'
    },
    details: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: 'Dados adicionais (ex: nome do documento, título da conversa)'
    },
    ip_address: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: 'Endereço IP do usuário'
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Navegador/dispositivo do usuário'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('user_activity_logs');
  await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_user_activity_logs_action_type";');
}
