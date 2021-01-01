'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Accounts', 'balance', {
      type: 'FLOAT USING CAST("balance" as FLOAT)'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Accounts', 'balance', {
      type: Sequelize.TEXT,
    });
  }
};
