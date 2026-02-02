import type { Optional } from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import sequelize from '../db.js'

export interface ProfileAttributes {
  id: string
  creation_time: Date
  updated_at: Date | null
  profile_password: string
  cpf: string
  telefone: string
  data_nascimento: Date
  avatar_url: string | null
  nome: string
  email: string
  role: string | null // ✅ Adicionado campo role
}

export interface ProfileCreationAttributes
  extends Optional<
    ProfileAttributes,
    'updated_at' | 'avatar_url' | 'id' | 'creation_time' | 'role'
  > {}

class Profile
  extends Model<ProfileAttributes, ProfileCreationAttributes>
  implements ProfileAttributes
{
  public id!: string
  public creation_time!: Date
  public updated_at!: null | Date
  public profile_password!: string
  public cpf!: string
  public telefone!: string
  public data_nascimento!: Date
  public avatar_url!: string | null
  public nome!: string
  public email!: string
  public role!: string | null // ✅ Adicionado campo role
}

Profile.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    creation_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    profile_password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: true,
    },
    telefone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    avatar_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // ✅ Adicionado campo role
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'publico',
    },
  },
  {
    sequelize,
    tableName: 'profile',
    createdAt: 'creation_time',
    updatedAt: 'updated_at',
    timestamps: true,
    defaultScope: {
      attributes: {
        exclude: ['profile_password'],
      },
    },
  }
)

export default Profile
