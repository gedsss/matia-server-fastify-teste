import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

const documentsTagsRelation = sequelize.define('documentsTagRelation', {
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
    tableName: 'document_tag_association',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

export default documentsTagsRelation;