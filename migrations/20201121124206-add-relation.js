'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Stocks',
      'LocationId',
      {
        type: Sequelize.INTEGER,
        reference: {
          model:"Locations",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "Stocks",
      "LocationId"
    )
  }
};
