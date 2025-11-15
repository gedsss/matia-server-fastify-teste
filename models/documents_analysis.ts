import type { Optional } from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import sequelize from '../db.js'

export interface DocumentsAnalysisAttributes {
  id: string
  document_id: string
  conversation_id: string
  analysis_type: 'sumario' | 'analise_legal' | 'extracao_entidade' | null
  result: object | null
  confidence_score: number | null
  created_at: Date
}

export interface DocumentsAnalysisCreationAttributes
  extends Optional<
    DocumentsAnalysisAttributes,
    'id' | 'created_at' | 'analysis_type' | 'result' | 'confidence_score'
  > {}

class DocumentsAnalysis
  extends Model<
    DocumentsAnalysisAttributes,
    DocumentsAnalysisCreationAttributes
  >
  implements DocumentsAnalysisAttributes
{
  public id!: string
  public conversation_id!: string
  public document_id!: string
  public analysis_type!:
    | 'sumario'
    | 'analise_legal'
    | 'extracao_entidade'
    | null
  public result!: object | null
  public confidence_score!: number | null
  public created_at!: Date
}

DocumentsAnalysis.init(
  {
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
  },
  {
    sequelize,
    tableName: 'documents_analysis',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  }
)

export default DocumentsAnalysis
