"use strict";
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid'); // Import the UUID function

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("123456", saltRounds);

    await queryInterface.bulkInsert(
      "users",
      [
        {
          user_id: uuidv4(),
          email: "test@example.com",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
