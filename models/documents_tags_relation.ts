import sequelize from '../db.js';
import { DataTypes, Model, Optional } from 'sequelize';

export interface DocumentsTagsRelationsAttributes {
    id: string,
    document_id: string,
    tag_id: string,
    created_at: Date 
}

export interface DocumentsTagsRelationsCreationAttributes extends Optional<DocumentsTagsRelationsAttributes, 'id' | 'created_at'> {}

class DocumentsTagsRelation extends Model<DocumentsTagsRelationsAttributes, DocumentsTagsRelationsCreationAttributes> implements DocumentsTagsRelationsAttributes {
    public id!: string;
    public document_id!: string;
    public tag_id!: string;
    public created_at!: Date;
}

DocumentsTagsRelation.init ({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
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
    tag_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'documents_tag',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
},
{
    sequelize,
    tableName: 'document_tag_association',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

export default DocumentsTagsRelation;