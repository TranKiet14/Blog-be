'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.hasMany(models.User, { foreignKey: 'role_id', as: 'users' })
      Role.belongsToMany(models.Permission, { through: 'Permission_Role', foreignKey: 'role_id' , as: "permissions"})
    }
  }
  Role.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};