const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const {asyncHandler, csrfProtection} = require('./utils');
const {requireAuth} = require("../auth");
const {Question, Answer, User} = require("../db/models");


//get Q with id and render Q + answers
router.get('/:id(\\d+)', asyncHandler(async(req, res)=>{
  const question = await Question.findByPk(req.params.id, {
    include: Answer
  })
  const questionId = question.id;
  const questionUserId = question.userId;
  const userQ = await User.findByPk(questionUserId);
  const answer = await Answer.findOne({where: {questionId}});

  if (!answer) {
    res.render("single-question-page", {question, userQ});
  }

  const answerUserId = answer.userId;
  const userA = await User.findByPk(answerUserId);

  res.render('single-question-page', {question, userQ, userA});
}))

const questionValidator = [
  check('question')
    .exists({checkFalsy: true})
    .withMessage('Please enter a question')
]

//create page so users can enter their questions
router.get('/add', csrfProtection, requireAuth, asyncHandler(async(req, res)=>{
  res.render('question-form', {csrfToken: req.csrfToken()})
}))

//posts a question
router.post("/add", csrfProtection, requireAuth, questionValidator, asyncHandler(async (req, res) => {
  const {question} = req.body;
  const {userId} = req.session.auth;

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
      const newQuestion = await Question.create({
          question,
          voteCount: 0,
          userId
      });

      res.redirect(`/questions/${newQuestion.id}`);
  } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('question-form', {
          errors,
          csrfToken: req.csrfToken()
      });
  }
}));


module.exports = router
