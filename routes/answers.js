const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const { asyncHandler, csrfProtection } = require('./utils');
const { User, Answer, Question } = require('../db/models')
const {requireAuth} = require('../auth');

router.get('/:id(\\d+)/answers', csrfProtection,  requireAuth, asyncHandler(async(req, res)=>{//add require auth later
    const id = req.params.id;
    const {userId} = req.session.auth;

    const user = await User.findByPk(userId);
    // if (user.professionalUser){
    //   res.render('answers', { id, title: 'Answer', csrfToken: req.csrfToken()})
    // } else {
    //   res.render('unauthorized-user')
    // }
    if (user){
      res.render('answers', { id, title: 'Answer', csrfToken: req.csrfToken()})
    }


}))

const answersValidators =[
  check('answer')
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for answer')
];

router.post('/:id(\\d+)/answers', csrfProtection, answersValidators, requireAuth, asyncHandler(async(req, res)=>{
  const { answer}= req.body

  const {userId} = req.session.auth;

  const id = req.params.id

  const newAnswer = await Answer.build({
    answer,
    questionId: id,
    voteCount: 0,
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });


  const validatorErrors = validationResult(req);


  if(validatorErrors.isEmpty()){
    await newAnswer.save()
    res.redirect(`/questions/${id}`)
  } else {
    const errors = validatorErrors.array().map((error)=> error.msg);

   res.render('answers', {
      title: 'Answers',
      errors,
      csrfToken: req.csrfToken(),
    })
  }

}))

module.exports = router;

