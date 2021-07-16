'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Comments', [
        {
        comment: "I agree with this! As a long time cat owner, I definitely need to put my cats on a diet, same goes with dogs who are more susceptible to weight gain.",
        answerId: 1 ,
        userId: 5,
        createdAt: new Date(),
          updatedAt: new Date(),
      },
      {
        comment: 'Thank you for your answer! This is very knowledgeable. Helped me get my pup right on track',
        answerId: 2 ,
        userId: 6 ,
        createdAt: new Date(),
          updatedAt: new Date(),
      },
      {
        comment: "Oh no! I'm going to take my dog to the vet right away for a check up! Thank you for your answer!",
        answerId: 4 ,
        userId: 6,
        createdAt: new Date(),
          updatedAt: new Date(),
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Comments', null, {});

  }
};
