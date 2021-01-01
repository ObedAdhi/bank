'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Customers', [{
      identityNumber: "1234567890123456",
      fullName: "Budi Solasi",
      address: "jalan 1",
      birthDate: new Date("1990-06-19"),
      gender: "Male",
      createdAt: new Date,
      updatedAt: new Date
    }, {
      identityNumber: "1234567891123456",
      fullName: "Amin Aplus",
      address: "jalan 2",
      birthDate: new Date("1995-06-19"),
      gender: "Male",
      createdAt: new Date,
      updatedAt: new Date
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Customers', null, {});
  }
};
