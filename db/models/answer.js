'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    answer: {
      allowNull: false,
     type: DataTypes.STRING,
    },
    questionId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    voteCount: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {});
  Answer.associate = function(models) {
    // associations can be defined here
    Answer.belongsTo(models.Question, {foreignKey: 'questionId'})
    Answer.hasMany(models.Comment, {foreignKey: 'answerId'})
  };
  return Answer;
};
