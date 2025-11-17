import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';
class UserActivityLog extends Model {
    id;
    user_id;
    action_type;
    resource_type;
    resource_id;
    details;
    ip_address;
    user_agent;
    created_at;
}
UserActivityLog.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    action_type: {
        type: DataTypes.ENUM('login', 'logout', 'conversation_created', 'message_sent', 'document_uploaded', 'document_viewed', 'document_deleted', 'profile_updated', 'password_changed'),
        allowNull: false,
    },
    resource_type: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Tipo do recurso afetado (e.g., "conversation", "document")',
    },
    resource_id: {
        type: DataTypes.UUID,
        allowNull: true,
        comment: 'ID do recurso afetado',
    },
    details: {
        type: DataTypes.JSONB,
        allowNull: true,
        comment: 'Dados adicionais (ex: nome do documento, título da conversa)',
    },
    ip_address: {
        type: DataTypes.STRING(45),
        allowNull: true,
        comment: 'Endereço IP do usuário',
    },
    user_agent: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Navegador/dispositivo do usuário',
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    tableName: 'user_activity_logs',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    defaultScope: {
        attributes: { exclude: [] },
    },
});
export default UserActivityLog;
//# sourceMappingURL=user_activity_log.js.map