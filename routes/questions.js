const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const {asyncHandler, csrfProtection} = require('./utils');
const {requireAuth} = require("../auth");
const {Question, Answer, User} = require("../db/models");
const { ResultWithContext } = require('express-validator/src/chain');


//get Q with id and render Q + answers
router.get('/:id(\\d+)', asyncHandler(async(req, res)=>{
  const question = await Question.findByPk(req.params.id, {
    include: Answer
  })
   res.render('question-page', {question});
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
