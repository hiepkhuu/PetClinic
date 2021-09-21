const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const { asyncHandler, csrfProtection } = require('./utils');
const { User, Answer, Question } = require('../db/models')
const {requireAuth} = require('../auth');


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
