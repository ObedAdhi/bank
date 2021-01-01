'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    getAccountNumber() {
      let accNum =""
      for (let i = 0; i < 10; i++) {
        let temp = Math.floor(Math.random() * 10)
        accNum += temp
      }
      return accNum
    }

    static associate(models) {
      // define association here
      Account.belongsTo(models.Customer, {
        foreignKey: "custId"
      })
    }
  };
  Account.init({
    type: DataTypes.STRING,
    balance: {
      type: DataTypes.STRING,
      validate: {
        minimum (value) {
          if(+value < 500000 && value !== "") {
            throw new Error("Minimum balance for new Account: Rp500.000");
          }
        },
      }
    },
    accountNumber: DataTypes.STRING,
    custId: DataTypes.INTEGER,
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.accountNumber = instance.getAccountNumber();
        if (instance.balance == "") {
          instance.balance = "500000"
        }
      },
    },
    sequelize,
    modelName: 'Account',
  });
  return Account;
};