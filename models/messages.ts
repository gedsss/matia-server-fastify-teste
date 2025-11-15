import type { Optional } from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import sequelize from '../db.js'

export interface MessagesAttributes {
  id: string
  conversations_id: string
  content: string
  role: 'user' | 'assistant' | 'system'
  metadata: object | null
  created_at: Date
}

export interface MessagesCreationAttributes
  extends Optional<MessagesAttributes, 'metadata' | 'id' | 'created_at'> {}

class Messages
  extends Model<MessagesAttributes, MessagesCreationAttributes>
  implements MessagesAttributes
{
  public id!: string
  public conversations_id!: string
  public content!: string
  public role!: 'user' | 'assistant' | 'system'
  public metadata!: object | null
  public created_at!: Date
}

Messages.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },

    conversations_id: {
      type: DataTypes.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'conversation',
        key: 'id',
      },
    },

    content: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM('user', 'assistant', 'system'),
      allowNull: false,
    },

    metadata: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'messages',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  }
)

export default Messages
