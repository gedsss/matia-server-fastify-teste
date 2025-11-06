import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('documents_analysis', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    document_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'documents',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    conversation_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'conversation',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    analysis_type: {
      type: DataTypes.ENUM('sumario', 'analise_legal', 'extracao_entidade'),
      allowNull: true
    },
    result: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {}
    },
    confidence_score: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('documents_analysis');
  await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_documents_analysis_analysis_type";');
}
