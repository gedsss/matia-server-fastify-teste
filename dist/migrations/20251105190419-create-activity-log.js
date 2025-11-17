import { DataTypes } from 'sequelize';
export async function up(queryInterface) {
    await queryInterface.createTable('activity_logs', {
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
        action: {
            type: DataTypes.ENUM('login', 'upload_document', 'delete_user'),
            allowNull: false,
        },
        entity_type: {
            type: DataTypes.ENUM('document', 'user', 'conversation'),
            allowNull: true,
        },
        entity_id: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        metadata: {
            type: DataTypes.JSONB,
            allowNull: true,
            defaultValue: {},
        },
        ip_address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });
}
export async function down(queryInterface) {
    await queryInterface.dropTable('activity_logs');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_activity_logs_action";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_activity_logs_entity_type";');
}
//# sourceMappingURL=20251105190419-create-activity-log.js.map