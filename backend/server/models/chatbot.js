'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chatbot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Chatbot.init({
    phoneNumber: DataTypes.STRING,
    lastFile: DataTypes.STRING,
    support: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Chatbot',
  });
  return Chatbot;
};