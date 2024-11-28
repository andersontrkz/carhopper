'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('drivers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(120),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      vehicle: {
        type: Sequelize.STRING(80),
        allowNull: false
      },
      price_per_km: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      min_km: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('drivers');
  }
};
