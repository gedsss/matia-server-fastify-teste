import type { Optional } from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import sequelize from '../db.js'

export interface ConversationDocumentsAttributes {
  id: string
  conversation_id: string
  document_id: string
  linked_at: Date
}

export interface ConversationDocumentsCreationAttributes
  extends Optional<ConversationDocumentsAttributes, 'id' | 'linked_at'> {}

class ConversationDocuments
  extends Model<
    ConversationDocumentsAttributes,
    ConversationDocumentsCreationAttributes
  >
  implements ConversationDocumentsAttributes
{
  public id!: string
  public conversation_id!: string
  public document_id!: string
  public linked_at!: Date
}

ConversationDocuments.init(
  {
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
  },
  {
    sequelize,
    tableName: 'conversation_document',
    timestamps: true,
    createdAt: 'linked_at',
    updatedAt: false,
  }
)

export default ConversationDocuments
