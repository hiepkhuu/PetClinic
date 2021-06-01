const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { asyncHandler, handleValidationErrors, csrfProtection } = require('./utils');

const { User} = require('../db/models')

/* GET users listing. */
router.get('/', function(req, res, next) {//this is user homepage
  res.send('respond with a resource');
});

router.get('/register', csrfProtection, asyncHandler(async(req, res)=>{//get registration page
  res.render('user-register', { title: 'Registration', csrfToken: req.csrfToken()})
}))

router.get('/register', csrfProtection, asyncHandler(async(req, res)=>{//creates new user and sotres in db
 //TODO: create new user
 //TODO: direct them to homepage
}))

module.exports = router;
