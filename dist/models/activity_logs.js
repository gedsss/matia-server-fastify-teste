import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';
class ActivityLog extends Model {
    id;
    user_id;
    action;
    entity_id;
    entity_type;
    metadata;
    ip_address;
    created_at;
}
ActivityLog.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'profile',
            key: 'id',
        },
    },
    action: {
        type: DataTypes.ENUM('login', 'upload_document', 'delete_user'),
        allowNull: false,
    },
    entity_type: {
        type: DataTypes.ENUM('document', 'user', 'conversation'),
        allowNull: true,
    },
    entity_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    metadata: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: {},
    },
    ip_address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    tableName: 'activity_logs',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});
export default ActivityLog;
//# sourceMappingURL=activity_logs.js.map