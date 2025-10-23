import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

const activityLogs = sequelize.define('activityLogs', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'profile',
            key: 'id'
        }
    },
    action: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    entity_type: {
        type: DataTypes.TEXT,
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
    tableName: 'activity_logs',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

export default activityLogs;