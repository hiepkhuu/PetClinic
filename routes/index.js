var express = require('express');
var router = express.Router();
const {asyncHandler, csrfProtection} = require('./utils');
const {Question, Answer, User} = require("../db/models");

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next)=> {
//get all Qs

  const allQuestions = await Question.findAll()

  res.render('index', { allQuestions, title: 'Questions' });
}));

module.exports = router;
