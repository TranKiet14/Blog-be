'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Languages', [
      {
        title: "Tiếng việt",
        language_code: "vi",
        flag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlIHVXw_luq8LYwYHmdfJzdO5RSSsvtTm1lA&s",
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Languages', null, {});
  }
};
