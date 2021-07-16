'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    userId: {
      allowNull: false,
     type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    question: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    voteCount:{
      allowNull: false,
      type: DataTypes.INTEGER
    },
    answerCount: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Question.associate = function(models) {
    // associations can be defined here
    Question.belongsTo(models.User, {foreignKey: 'userId'})
    Question.hasMany(models.Answer, {foreignKey: 'questionId'})

  };
  return Question;
};
