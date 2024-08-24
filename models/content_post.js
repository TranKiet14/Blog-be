'use strict';
const {
  Model
} = require('sequelize');
const slugify = require('slugify');
module.exports = (sequelize, DataTypes) => {
  class Content_Post extends Model {
    static associate(models) {
      Content_Post.belongsTo(models.Post, { foreignKey: 'original_post_id', as: 'post' })
      Content_Post.belongsTo(models.Language, { foreignKey: 'language_id', as: 'language' })
    }
  }
  Content_Post.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    slug: DataTypes.STRING,
    language_id: DataTypes.INTEGER,
    original_post_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Content_Post',
  });
  Content_Post.beforeCreate(async (contentPost, options) => {
    contentPost.slug = slugify(`${contentPost.title}-${Date.now()}`, {
      lower: true,
      strict: true
    });
  });
  Content_Post.beforeBulkCreate(async (contentPosts, options) => {
    for (const contentPost of contentPosts) {
      contentPost.slug = slugify(`${contentPost.title}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`, {
        lower: true,
        strict: true
      });
    }
  })
  return Content_Post;
};