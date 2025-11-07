import { DataTypes } from 'sequelize'
import type { QueryInterface } from 'sequelize'

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('documents', {
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
  })
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('documents')
  await queryInterface.sequelize.query(
    'DROP TYPE IF EXISTS "enum_documents_status";'
  )
}
