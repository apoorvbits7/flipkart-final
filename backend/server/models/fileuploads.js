'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FileUploads extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  FileUploads.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    userID: DataTypes.UUID,
    fileName: DataTypes.STRING,
    fileURL: DataTypes.STRING,
    invoiceNumber: DataTypes.INTEGER,
    totalAmount: DataTypes.NUMERIC,
    processedJSON: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'FileUploads',
  });
  return FileUploads;
};