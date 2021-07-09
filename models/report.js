'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  report.init({
    upReport_id: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    mb_tradi: DataTypes.DOUBLE,
    mb_onl: DataTypes.DOUBLE,
    mb_shopee: DataTypes.DOUBLE,
    mb_duan: DataTypes.DOUBLE,
    mn_tradi: DataTypes.DOUBLE,
    mn_tiki: DataTypes.DOUBLE,
    mn_duan: DataTypes.DOUBLE,
    bl_bm: DataTypes.DOUBLE,
    bl_canhan: DataTypes.DOUBLE,
    mkt: DataTypes.DOUBLE,
    mkt_bm: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'report',
  });
  return report;
};