import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';
class Documents extends Model {
    id;
    user_id;
    original_name;
    storage_path;
    file_type;
    file_size;
    status;
    progress;
    uploaded_at;
    processed_at;
}
Documents.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'profile',
            key: 'id',
        },
    },
    original_name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    storage_path: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    file_type: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    file_size: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('enviando', 'processando', 'completo', 'erro'),
        allowNull: true,
        defaultValue: 'enviando',
    },
    progress: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    uploaded_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    processed_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'documents',
    timestamps: true,
    createdAt: 'uploaded_at',
    updatedAt: false,
});
export default Documents;
//# sourceMappingURL=documents.js.map