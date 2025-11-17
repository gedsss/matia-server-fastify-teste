import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';
class DocumentsAnalysis extends Model {
    id;
    conversation_id;
    document_id;
    analysis_type;
    result;
    confidence_score;
    created_at;
}
DocumentsAnalysis.init({
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
    conversation_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'conversation',
            key: 'id',
        },
    },
    analysis_type: {
        type: DataTypes.ENUM('sumario', 'analise_legal', 'extracao_entidade'),
        allowNull: true,
    },
    result: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: {},
    },
    confidence_score: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    tableName: 'documents_analysis',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});
export default DocumentsAnalysis;
//# sourceMappingURL=documents_analysis.js.map