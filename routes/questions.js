const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const {asyncHandler, csrfProtection} = require('./utils');
const {requireAuth} = require("../auth");
const {Question, Answer, User} = require("../db/models");


//just get questions
router.get('/', asyncHandler(async(req, res)=>{
  // const questions = await Question.findByPk(req.params.id, {
  //   include: Answer
  // })
  //  res.render('questions-list', {questions});
  const questions = await Question.findAll()

  res.render('index', { questions, title: 'Questions' });
}))

//get Q with id and render Q + answers
router.get('/:id(\\d+)', asyncHandler(async(req, res)=>{
  const questions = await Question.findByPk(req.params.id, {
    include: Answer
  })
   res.render('single-question-page', {questions});
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
