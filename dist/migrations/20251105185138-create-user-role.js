import { DataTypes } from 'sequelize';
export default {
    async up(queryInterface) {
        await queryInterface.createTable('user_role', {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'profile',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            role: {
                type: DataTypes.ENUM('admin', 'publico'),
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('user_role');
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_user_role_role";');
    },
};
//# sourceMappingURL=20251105185138-create-user-role.js.map