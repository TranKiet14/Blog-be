'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' })
      User.hasMany(models.Post, {foreignKey: 'user_id', as: 'posts'})
      User.hasMany(models.Comment, {foreignKey: 'user_id', as: 'comments'})
      User.hasMany(models.Token, {foreignKey: 'user_id', as: 'tokens'})
    }
  }
  User.init({
    fullName: DataTypes.STRING,
    avatar: DataTypes.TEXT,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};