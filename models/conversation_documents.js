import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

const conversationDocuments = sequelize.define('conversation_documents', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    conversation_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'conversation',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    document_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'documents',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    linked_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
},
{
    tableName: 'conversation_document',
    timestamps: true,
    createdAt: 'linked_at',
    updatedAt: false,
});

export default conversationDocuments;