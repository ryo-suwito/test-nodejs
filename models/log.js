'use strict';
const {
  Model
} = require('sequelize');
const { param } = require('../routes');
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    static associate(models) {
      Log.belongsTo(models.Stocks);
    }
    static async insertLog(params) {
      console.log("received object \n", params)
      const log_result = await this.create({ 
        type: params.adjustment>0 ? "INBOUND" : "OUTBOUND",
        adjustment: params.adjustment,
        quantity: params.stock_quantity,
        StockId: params.id,
        LocationId: params.location_id,
      });
      return log_result
    }
  };
  Log.init({
    type: DataTypes.STRING,
    adjustment: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    StockId: DataTypes.INTEGER,
    LocationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Logs',
  });
  return Log;
};