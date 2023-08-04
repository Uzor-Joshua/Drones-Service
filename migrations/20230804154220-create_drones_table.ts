module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('drones', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primary: true,
      },

      serial_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      model: {
        type: Sequelize.STRING,
        allowNull: false,
        values: ['LIGHTWEIGHT', 'MIDDLEWEIGHT', 'HEAVYWEIGHT', 'CRUISERWEIGHT'],
      },

      state: {
        type: Sequelize.STRING,
        allowNull: false,
        values: [
          'IDLE',
          'LOADING',
          'LOADED',
          'DELIVERING',
          'DELIVERED',
          'RETURNING',
        ],
        defaultValue: 'IDLE',
      },

      weight_limit: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      battery_capacity: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('drones');
  },
};
