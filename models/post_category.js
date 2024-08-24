'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post_Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Post_Category.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' })
      // Post_Category.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' })
    }
  }
  Post_Category.init({
    category_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post_Category',
  });
  return Post_Category;
};