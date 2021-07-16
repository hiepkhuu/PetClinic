'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Answers', [
        {
          answer: "Though pets are very adorable when pudgy; they, like humans, are actually in danger of many health problems if not helped out with a diet plan. To tell if your pet is a little too overweight for his health, compare your pet's looks to the Body Condition Scores chart!",
          questionId: 3 ,
          voteCount: 0 ,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          answer: "Probably the most important ones! First, you need to know the pets most basic daily routines. For example, wake up and go for brisk walk with the opportunity to urinate and defecate. If you have 10 minutes for a little play time that would be great. Most adult dogs will eat first thing in the morning and after dinner time. The best way is to look at the feeding guide on the food bag. Make sure to adjust according to how active your dog is throughout the day.",
          questionId: 1 ,
          voteCount: 3 ,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          answer: "I would say that usually, time out should be used sparingly. Removing your dog from people is a punishment but sometimes it may have negative effects. Decide a location for your dog and make sure that it is a boring place but not scary. Possible splaces could be pantries or bathrooms. Make sure to give them a warning for their bad behavior, something like the word 'enough'. After a few minutes of timeout, you may release your pet. If they continue, put them back in.",
          questionId: 2 ,
          voteCount: 0 ,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          answer: "Dogs eat grass to satisfy dietary needs or to provide treatment for themselves when feeling sick. You do not need to worry about any harm but should be concerned if you are giving him enough nutrients that he needs. He could be using grass to substitute those nutrients. Sometimes dogs may use grass as a remedy for stomach sickness. However if your pet starts to suddenly eat large amounts, take him to the vet right away. It could mean that something is very wrong with him and he's trying to help himself. Best of luck!",
          questionId: 4 ,
          voteCount: 0 ,
          userId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Answers', null, {});

  }
};
