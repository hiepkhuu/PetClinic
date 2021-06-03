const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const { ResultWithContext } = require('express-validator/src/chain');
const {asyncHandler, csrfProtection} = require('./utils');
const {requireAuth} = reQUIRE('../auth')
const { Question, Answer, User} = requrie('../db/models');


//get Q with id and render Q + answers
router.get('/:id(\\d+)', asyncHandler(async(req, res)=>{
  const question = await Question.findByPk(req.params.id, {
    include: Answer
  })
   res.render('question-page', {question});
}))
