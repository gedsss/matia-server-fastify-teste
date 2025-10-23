import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

const conversation = sequelize.define('conversation', {
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
            key: 'id',
        },
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_favorite: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    last_message_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
},
{
    tableName: 'conversation',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default conversation;