import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';
class Profile extends Model {
    id;
    creation_time;
    updated_at;
    profile_password;
    cpf;
    telefone;
    data_nascimento;
    avatar_url;
    nome;
    email;
}
Profile.init({
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
}, {
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
});
export default Profile;
//# sourceMappingURL=profile.js.map