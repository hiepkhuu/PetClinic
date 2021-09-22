const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const {asyncHandler, csrfProtection} = require('./utils');
const {requireAuth} = require("../auth");
const {Question, Answer, User} = require("../db/models");


//get Q with id and render Q + answers
router.get('/:id(\\d+)', csrfProtection, asyncHandler(async(req, res)=>{
  const question = await Question.findByPk(req.params.id, {
    include: Answer
  })
  // const questionId = question.id;
  // const questionUserId = question.userId;
  const questionId = question.dataValues.id;
  const questionUserId = question.dataValues.userId;
  const userQ = await User.findByPk(questionUserId);
  const answers = await Answer.findAll({where: {questionId}});



  if (!answers) {
    res.render("single-question-page", {question, userQ});
  }
  answers.forEach(answer => {
    answerUserId = answer.dataValues.userId
    return answerUserId
  })
  const userA = await User.findByPk(answerUserId);

  console.log('CONSOLEXXXXXXX', answers)


  res.render('single-question-page', {question, userQ, userA, answers, csrfToken: req.csrfToken()});
}))

const answersValidators =[
  check('answer')
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for answer')
  ];

  router.post('/:id(\\d+)', csrfProtection, requireAuth, answersValidators,  asyncHandler(async(req, res)=>{
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

const questionValidator = [
  check('question')
    .exists({checkFalsy: true})
    .withMessage('Please enter in a body.'),
  check('title')
    .exists({checkFalsy: true})
    .withMessage('Please enter in a title')
]

//create page so users can enter their questions
router.get('/add', csrfProtection, requireAuth, asyncHandler(async(req, res)=>{
  res.render('question-form', {csrfToken: req.csrfToken()})
}))

//posts a question
router.post("/add", csrfProtection, requireAuth, questionValidator, asyncHandler(async (req, res) => {
  const {question, title} = req.body;
  const {userId} = req.session.auth;

  const newQuestion = await Question.create({
    question,
    title,
    voteCount: 0,
    answerCount: 0,
    userId
  });

  res.redirect(`/questions/${newQuestion.id}`);

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {

      res.redirect(`/questions/${newQuestion.id}`);
  } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('question-form', {
          errors,
          csrfToken: req.csrfToken()
      });
  }
}));

router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {
  const question= await Question.findOne({
    where: {
        id: req.params.id
    }
  });

  await question.destroy()
  res.redirect('/')
}));


module.exports = router
