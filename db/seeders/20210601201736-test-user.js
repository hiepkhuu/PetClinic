'use strict';

const faker = require("faker");
const bcrypt = require("bcryptjs");


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.bulkInsert('Users', [
    {
      username: "Demo_Doctor",
      email: "demoDoctor@gmail.com",
      hashedPassword: bcrypt.hashSync('password'),
      professionalUser: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync('password'),
      professionalUser: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync('password'),
      professionalUser: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync('password'),
      professionalUser: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: "i_loveCats",
      email: "cats@gmail.com",
      hashedPassword: bcrypt.hashSync('password'),
      professionalUser: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: "normal_petOwner",
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync('password'),
      professionalUser: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
      { returning: true }
  );

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Users',null, {});
  }
};
