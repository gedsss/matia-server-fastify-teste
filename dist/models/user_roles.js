import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';
const AppRoleEnum = DataTypes.ENUM('admin', 'publico');
class UserRole extends Model {
    id;
    user_id;
    role;
    created_at;
}
UserRole.init({
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
    role: {
        type: AppRoleEnum,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    tableName: 'user_role',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});
export default UserRole;
//# sourceMappingURL=user_roles.js.map