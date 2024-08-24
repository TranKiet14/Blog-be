'use strict';
const {
  Model
} = require('sequelize');
const slugify = require('slugify');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsToMany(models.Post, { through: "Post_Categories", foreignKey: "category_id", as: "posts" });
    }
  }
  Category.init({
    title: DataTypes.STRING,
    status: DataTypes.STRING,
    description: DataTypes.TEXT,
    slug: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Category',
  });
  Category.beforeCreate(async (category, options) => {
    category.slug = slugify(`${category.title}-${Date.now()}`, {
      lower: true,
      strict: true
    });
  });
  return Category;
};