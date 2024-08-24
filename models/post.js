'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
      Post.belongsToMany(models.Category, {through: 'Post_Categories', foreignKey: 'post_id', as: 'categories'})
      Post.hasMany(models.Content_Post, { foreignKey: 'original_post_id', as: 'content_posts' })
      Post.hasMany(models.Comment, { foreignKey: 'post_id', as: 'comments' })
    }
  }
  Post.init({
    thumbnail: DataTypes.TEXT,
    status: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  
  return Post;
};