const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const {asyncHandler, csrfProtection} = require('./utils');
const {requireAuth} = require("../auth");
const {Question, Answer, User} = require("../db/models");


//just get questions
router.get('/', asyncHandler(async(req, res)=>{
  const questions = await Question.findByPk(req.params.id, {
    include: Answer
  })
   res.render('questions-list', {questions});
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

module.exports = router
