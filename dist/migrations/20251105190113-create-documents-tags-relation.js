import { DataTypes } from 'sequelize';
export async function up(queryInterface) {
    await queryInterface.createTable('document_tag_relation', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
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
        tag_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'documents_tag',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });
}
export async function down(queryInterface) {
    await queryInterface.dropTable('document_relation');
}
//# sourceMappingURL=20251105190113-create-documents-tags-relation.js.map