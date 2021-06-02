'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    answer: DataTypes.STRING,
    questionId: DataTypes.INTEGER,
    voteCount: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Answer.associate = function(models) {
    // associations can be defined here
  };
  return Answer;
};