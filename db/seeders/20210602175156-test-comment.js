'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Comments', [
        {
        comment: "Really hope you figure this out too.",
        answerId: 1 ,
        userId: 5,
        createdAt: new Date(),
          updatedAt: new Date(),
      },
      {
        comment: 'Agreed. Try to do some research and comeback with more specific questions. Happy to answer!',
        answerId: 2 ,
        userId: 1 ,
        createdAt: new Date(),
          updatedAt: new Date(),
      },
      {
        comment: "Yes, but you should really pull out right now. Doesn't look too hot",
        answerId: 4 ,
        userId: 2,
        createdAt: new Date(),
          updatedAt: new Date(),
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Comments', null, {});

  }
};
