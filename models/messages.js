import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const messages = sequelize.define('messages', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },

    conversations_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
            model: 'conversation',
            key: 'id'
        }
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
        defaultValue: {}
    },

    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
},
{
    tableName: 'messages',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
}

)

export default messages