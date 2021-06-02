const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const { asyncHandler, csrfProtection } = require('./utils');
const { User, Answer, Question } = require('../db/models')
const {requireAuth} = require('../auth');

router.get('/', csrfProtection,  requireAuth, asyncHandler(async(req, res)=>{//add require auth later

  res.render('answers', {})
}))

const answersValidators =[
  check('answer')
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for answer')
];

router.post('/', requireAuth, csrfProtection, answersValidators, asyncHandler(async(req, res)=>{
  const { answer } = req.body
  const newAnswer = await Answer.build({
    answer,
    questionId: req.user.id
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

