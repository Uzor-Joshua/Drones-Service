module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('loaded_weight', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primary: true,
      },

      drone_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      medication_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },

      updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: true,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('loaded_weight');
  },
};
