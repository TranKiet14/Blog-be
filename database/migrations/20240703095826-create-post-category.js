'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Post_Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories', // Tên bảng mà khóa ngoại tham chiếu đến
          key: 'id', // Tên trường trong bảng mà khóa ngoại tham chiếu đến
        }
      },
      post_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'posts', // Tên bảng mà khóa ngoại tham chiếu đến
          key: 'id', // Tên trường trong bảng mà khóa ngoại tham chiếu đến
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Post_Categories');
  }
};