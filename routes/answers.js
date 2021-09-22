const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const { asyncHandler, csrfProtection } = require('./utils');
const { User, Answer, Question } = require('../db/models')
const {requireAuth} = require('../auth');


router.put('/:id(\\d+)', asyncHandler(async (req, res) => {
  const answerId = req.params.id

  const answer = await Answer.findByPk(answerId)

  answer.content = req.body.content
  await answer.save()
  res.sendStatus(201)
}))

router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {
  const answer = await Answer.findOne({
      where: {
          id: req.params.id
      }
  });

  await answer.destroy()
  res.redirect('/')

}));

module.exports = router;
