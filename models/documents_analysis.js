import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

const documentsAnalysis = sequelize.define('documentsAnalysis', {
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
    conversation_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'conversation',
            key: 'id'
        }
    },
    analysis_type: {
        type: DataTypes.ENUM('summary', 'legal_review', 'entity_extraction'),
        allowNull: true
    },
    result: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: {}
    },
    confidence_score: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
},
{
    tableName: 'documents_analysis',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

export default documentsAnalysis;