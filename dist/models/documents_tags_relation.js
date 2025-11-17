import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';
class DocumentsTagsRelation extends Model {
    id;
    document_id;
    tag_id;
    created_at;
}
DocumentsTagsRelation.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
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
    tag_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'documents_tag',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    tableName: 'document_tag_association',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});
export default DocumentsTagsRelation;
//# sourceMappingURL=documents_tags_relation.js.map