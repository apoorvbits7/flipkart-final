'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FileUploads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.UUID
      },
      userID: {
        type: Sequelize.UUID
      },
      fileName: {
        type: Sequelize.STRING
      },
      fileURL: {
        type: Sequelize.STRING
      },
      invoiceNumber: {
        type: Sequelize.INTEGER
      },
      totalAmount: {
        type: Sequelize.NUMERIC
      },
      processedJSON: {
        type: Sequelize.JSONB
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('FileUploads');
  }
};