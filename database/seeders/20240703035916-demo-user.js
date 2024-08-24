'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        fullName: "Trần Anh Kiệt",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIn-gE6j6sjvg0ekFgFBIzVP5VdN3aBu9dLg&s",
        email: "trananhkiet14032002@gmail.com",
        password: "$2b$10$IQpaa6GRwsoqaKjEYkP3memVA0Zp8shK.ejdCy3vqESsMWwfip58S",
        status: "active",
        deleted: false,
        role_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
