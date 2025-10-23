import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

const documentsTag = sequelize.define('documentsTag', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    color: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
},
{
    tableName: 'documents_tag',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

export default documentsTag;