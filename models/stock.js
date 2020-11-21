'use strict';
var db = require("./index");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    static associate(models) {
      Stock.belongsTo(models.Locations);
    }
  };
  Stock.init({
    product: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Stocks',
  });
  return Stock;
};