'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Questions', [
        {
          userId:1,
          question: 'What are the most trending stocks right now?',
          voteCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
      },
      {
        userId:2,
        question: 'Tried investing, but lost all my money. Any good advice? Feeling really bummed out rn.',
        voteCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId:3,
        question: 'How risky are stocks anyway?',
        voteCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId:4,
        question: 'HELP! just giving this a shot, dunno if it will work, my cat accidentally pressed something taht sold all my stocks. Any chance i can get it back?!?!',
        voteCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Questions', null, {});
  }
};
