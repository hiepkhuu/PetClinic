var express = require('express');
var router = express.Router();
const {asyncHandler, csrfProtection} = require('./utils');
const {Question, Answer, User} = require("../db/models");

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next)=> {
//get all Qs

  const questions = await Question.findAll( {
   include: User
  } );
 console.log(questions)

  res.render('index', { questions, title: 'Questions' });
}));

module.exports = router;
