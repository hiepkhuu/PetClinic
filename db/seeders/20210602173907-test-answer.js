'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Answers', [
        {
          answer: "Dude that sucks! Hopefully someone answer this cuz I wanna find out too, just in case.",
          questionId: 4 ,
          voteCount: 0 ,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          answer: "To be honest, stocks are as risky as you make it out to be. No mutual fund guarantee returns or risk free. It all comes down to how hard you research and intuition. I suggest looking into more of the 'buy and hold' approach to time it correctly.",
          questionId: 3 ,
          voteCount: 3 ,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          answer: "Investing is no walk in the park. I completely empathize with you. Please find someone to talk to if you are relaly bummed out! Never to late to start again! Rooting for you. ",
          questionId: 2 ,
          voteCount: 0 ,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          answer: "I vouch for Doge coin right now. I gain a couple grand already.",
          questionId: 1 ,
          voteCount: 0 ,
          userId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Answers', null, {});

  }
};
