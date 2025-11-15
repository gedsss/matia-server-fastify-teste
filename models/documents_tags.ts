import type { Optional } from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import sequelize from '../db.js'

export interface DocumentsTagsAttributes {
  id: string
  name: string
  color: string
  created_at: Date
}

export interface DocumentsTagsCreationAttributes
  extends Optional<DocumentsTagsAttributes, 'color' | 'id' | 'created_at'> {}

class DocumentsTags
  extends Model<DocumentsTagsAttributes, DocumentsTagsCreationAttributes>
  implements DocumentsTagsAttributes
{
  public id!: string
  public name!: string
  public color!: string
  public created_at!: Date
}

DocumentsTags.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    color: {
      type: DataTypes.TEXT,
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
    tableName: 'documents_tag',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  }
)

export default DocumentsTags
