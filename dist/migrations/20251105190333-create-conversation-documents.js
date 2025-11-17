import { DataTypes } from 'sequelize';
export async function up(queryInterface) {
    await queryInterface.createTable('conversation_document', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        conversation_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'conversation',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        document_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'documents',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        linked_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });
}
export async function down(queryInterface) {
    await queryInterface.dropTable('conversation_document');
}
//# sourceMappingURL=20251105190333-create-conversation-documents.js.map