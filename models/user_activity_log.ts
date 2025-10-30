import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db.js";

export interface UserActivityLogAttributes {
  id: string,
  user_id: string,
  action_type: 'login' | 'logout' | 'conversation_created' | 'message_sent' | 'document_uploaded' | 'document_viewed' | 'document_deleted' | 'profile_updated' | 'password_changed',
  resource_type: string | null,
  resource_id: string | null,
  details: object | null,
  ip_address: string | null,
  user_agent: string | null,
  created_at: Date
}

export interface UserActivityLogCreationAttributes extends Optional<UserActivityLogAttributes, 'id' | 'created_at' | 'resource_type' | 'resource_id' | 'details' | 'ip_address' | 'user_agent'> {}

class UserActivityLog extends Model<UserActivityLogAttributes, UserActivityLogCreationAttributes> implements UserActivityLogAttributes {
  public id!: string;
  public user_id!: string;
  public action_type!: "login" | "logout" | "conversation_created" | "message_sent" | "document_uploaded" | "document_viewed" | "document_deleted" | "profile_updated" | "password_changed";
  public resource_type!: string | null;
  public resource_id!: string | null;
  public details!: object | null;
  public ip_address!: string | null;
  public user_agent!: string | null;
  public created_at!: Date;
}

UserActivityLog.init ({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    action_type: {
      type: DataTypes.ENUM(
        'login',
        'logout',
        'conversation_created',
        'message_sent',
        'document_uploaded',
        'document_viewed',
        'document_deleted',
        'profile_updated',
        'password_changed',
      ),
      allowNull: false,
    },
    resource_type: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Tipo do recurso afetado (e.g., "conversation", "document")',
    },
    resource_id: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: 'ID do recurso afetado',
    },
    details: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: 'Dados adicionais (ex: nome do documento, título da conversa)',
    },
    ip_address: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: 'Endereço IP do usuário',
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Navegador/dispositivo do usuário',
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'user_activity_logs',
    timestamps: true,
    createdAt: 'created_at', 
    updatedAt: false,        
  
    defaultScope: {
      attributes: { exclude: [] }
    },

  });

export default UserActivityLog