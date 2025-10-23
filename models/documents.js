import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

const documents = sequelize.define('documents', {
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
    original_name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    storage_path: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    file_type: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    file_size: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('uploading', 'processing', 'completed', 'error'),
        allowNull: true,
        defaultValue: 'uploading'
    },
    progress: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    uploaded_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    processed_at: {
        type: DataTypes.DATE,
        allowNull: true,
    }
},
{
    tableName: 'documents',
    timestamps: true,
    createdAt: 'uploaded_at',
    updatedAt: false,
});

export default documents;