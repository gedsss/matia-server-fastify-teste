import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';
class DocumentsTags extends Model {
    id;
    name;
    color;
    created_at;
}
DocumentsTags.init({
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
}, {
    sequelize,
    tableName: 'documents_tag',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});
export default DocumentsTags;
//# sourceMappingURL=documents_tags.js.map