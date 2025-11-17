import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';
class ConversationDocuments extends Model {
    id;
    conversation_id;
    document_id;
    linked_at;
}
ConversationDocuments.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    conversation_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'conversation',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    document_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'documents',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    linked_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    tableName: 'conversation_document',
    timestamps: true,
    createdAt: 'linked_at',
    updatedAt: false,
});
export default ConversationDocuments;
//# sourceMappingURL=conversation_documents.js.map