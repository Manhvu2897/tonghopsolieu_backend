'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      upReport_id: {
        type: Sequelize.INTEGER
      },
      mb_tradi: {
        type: Sequelize.DOUBLE
      },
      mb_onl: {
        type: Sequelize.DOUBLE
      },
      mb_shopee: {
        type: Sequelize.DOUBLE
      },
      mb_duan: {
        type: Sequelize.DOUBLE
      },
      mn_tradi: {
        type: Sequelize.DOUBLE
      },
      mn_tiki: {
        type: Sequelize.DOUBLE
      },
      mn_duan: {
        type: Sequelize.DOUBLE
      },
      bl_bm: {
        type: Sequelize.DOUBLE
      },
      bl_canhan: {
        type: Sequelize.DOUBLE
      },
      mkt: {
        type: Sequelize.DOUBLE
      },
      mkt_bm: {
        type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('reports');
  }
};