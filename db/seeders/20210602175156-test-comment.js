'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Comments', [
        {
        comment: "Dude that sucks! I really don't know how to help you. Hopefully someone answer this cuz I wanna find out too, just in case.",
        answerId:  ,
        userId: ,
      },
      {
        comment: '',
        answerId:  ,
        userId: ,
      },
      {
        comment: '',
        answerId:  ,
        userId: ,
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Comments', null, {});

  }
};
