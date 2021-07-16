'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Questions', [
      {
        userId:5,
        title: 'What should my pet\'s daily routine be?',
        question: 'I\'m not sure what my pet\'s schedule should be. For example, how much and how often should I feed my pet? Also when do I take my pet out for walks and bathroom breaks.',
        voteCount: 0,
        answerCount: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId:5,
        title: 'Good and bad behaviors?',
        question: 'How do you deal with good and bad behaviors. Is there a timeout type of thing? I don\'t know.',
        voteCount: 0,
        answerCount: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId:6,
        title: 'Is my pet too fat?',
        question: 'Christmas is coming along and lots of family members came over. They all love to spoil and feed my two already well fed corgis. I think they are a looking a bit more pudgy than usual. Should I put them on a diet?',
        voteCount: 0,
        answerCount: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId:6,
        title: 'HELP! My dog is eating grass?!?',
        question: 'My dog is eats well, maybe too well, but nowadays he has been eating grass like it is chicken whenever I take him for walks. What does this mean?',
        voteCount: 0,
        answerCount: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Questions', null, {});
  }
};
