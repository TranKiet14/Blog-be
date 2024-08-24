'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Language.hasMany(models.Content_Post, { foreignKey: 'language_id', as: 'content_posts' })
    }
  }
  Language.init({
    title: DataTypes.STRING,
    language_code: DataTypes.STRING,
    flag: DataTypes.TEXT,
    deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Language',
  });
  return Language;
};