'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rides', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      origin: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      destination: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      distance: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      duration: {
        type: Sequelize.STRING(120),
        allowNull: true
      },
      value: {
        type: Sequelize.DOUBLE,
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
    await queryInterface.dropTable('rides');
  }
};
