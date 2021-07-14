var express = require('express');
var router = express.Router();
const {asyncHandler} = require('./utils');
const {Question, User, Answer} = require("../db/models");

/* GET home page. */

//get all Qs
router.get('/', asyncHandler(async (req, res, next)=> {
  const questions = await Question.findAll({
    include: [User, Answer],
    order: [["createdAt", "DESC"]],
    limit: 10
  });

  console.log(questions)

  questions.forEach(question => {
    question.User = question.User.dataValues.username
  })

  // console.log(questions[0].dataValues.User.dataValues.username)

  res.render('index', { questions, title: 'Questions' });
}));

module.exports = router;
