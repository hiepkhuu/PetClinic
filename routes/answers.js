const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const { asyncHandler, csrfProtection } = require('./utils');
const { User, Answer, Question } = require('../db/models')
const {requireAuth} = require('../auth');

router.get('/', csrfProtection,  requireAuth, asyncHandler(async(req, res)=>{//add require auth later

  res.render('answers', { title: 'Answers', csrfToken: req.csrfToken()})
}))

const answersValidators =[
  check('answer')
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for answer')
];

router.post('/', csrfProtection, answersValidators, requireAuth, asyncHandler(async(req, res)=>{
  const { answer, question}= req.body
  const questionToBeAnswered = await Question.findOne
  const {userId} = req.session.auth;

  const newAnswer = await Answer.build({
    answer,
    questionId: 6,
    voteCount: 0,
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });


  const validatorErrors = validationResult(req);
  console.log(validatorErrors)

  if(validatorErrors.isEmpty()){
    await newAnswer.save()
    res.redirect('/')
  } else {
    const errors = validatorErrors.array().map((error)=> error.mgs);

   res.render('answers', {
      title: 'answers',
      errors,
      csrfToken: req.csrfToken(),
    })
  }

}))

module.exports = router;

