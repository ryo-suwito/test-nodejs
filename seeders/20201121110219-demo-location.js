'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    var newData = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i <= 10; i++) {
        const seedData = {
          name: characters.charAt(Math.floor(Math.random() * characters.length))+'-'+
                    Math.floor(Math.random() * 10)+'-'+ Math.floor( Math.random() * 10 ),
          createdAt: new Date(),
          updatedAt: new Date()
        };
        newData.push(seedData);
    }

    return queryInterface.bulkInsert('Locations', newData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Locations', null, {});
  }
};
