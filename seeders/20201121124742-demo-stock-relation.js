'use strict';
var faker = require("faker");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    var newData = [];
    for (let i = 0; i < 10; i++) {
        let productName = i==0 ? "Indomie Goreng" : faker.commerce.productName()
        const seedData = {
          product: productName,
          quantity: faker.random.number(),
          LocationId: Math.floor(Math.random() * 10) + 1,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        newData.push(seedData);
    }

    return queryInterface.bulkInsert('Stocks', newData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Stocks', null, {});
  }
};
