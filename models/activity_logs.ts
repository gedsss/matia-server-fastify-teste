import { Model, Optional } from 'sequelize';
import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

export interface ActivityLogsAttributes {
    id: String,
    user_id: String,
    action: 'login' | 'upload_document' | 'delete_user',
    entity_type: 'document' | 'user' | 'conversation' | null,
    entity_id: string | null,
    metadata: Object | null,
    ip_address: string | null,
    created_at: Date
}

export interface ActivityLogsCreationAttributes extends Optional<ActivityLogsAttributes, 'id' | 'created_at' | 'ip_address' | 'metadata' | 'entity_type' | 'entity_id'> {}

class ActivityLog extends Model<ActivityLogsAttributes, ActivityLogsCreationAttributes> implements ActivityLogsAttributes {
    public id!: String;
    public user_id!: String;
    public action!: 'login' | 'upload_document' | 'delete_user';
    public entity_id!: string | null;
    public entity_type!: 'document' | 'user' | 'conversation' | null;
    public metadata!: Object | null;
    public ip_address!: string | null;
    public created_at!: Date;
}

ActivityLog.init ({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'profile',
            key: 'id'
        }
    },
    action: {
        type: DataTypes.ENUM(
            'login',
            'upload_document',
            'delete_user'
        ),
        allowNull: false
    },
    entity_type: {
        type: DataTypes.ENUM(
            'document',
            'user',
            'conversation'
        ),
        allowNull: true
    },
    entity_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    metadata: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: {}
    },
    ip_address: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
},
{
    sequelize,
    tableName: 'activity_logs',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

export default ActivityLog;