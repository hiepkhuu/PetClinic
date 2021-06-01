const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { asyncHandler, handleValidationErrors, csrfProtection } = require('./utils');

const { User} = require('../db/models')
const { restoreUser, loginUser, logoutUser} = require('../auth');
const { db } = require('../config');

/* GET users listing. */
router.get('/', function(req, res, next) {//this is user homepage
  res.send('respond with a resource');
});

router.get('/register', csrfProtection, asyncHandler(async(req, res)=>{//get registration page
  res.render('user-register', { title: 'Registration', csrfToken: req.csrfToken()})
}))

const userValidators = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for username')
    .isLength({ max: 75})
    .withMessage('Username must not be more than 75 characters long'),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for email')
    .isLength({ max: 255 })
    .withMessage('Email must not be more than 255 characters long')
    .custom((value)=>{
      return db.User.findOne({where: {emailAddress: value}})
        .then((user)=>{
          if (user) {
            return Promise.reject('The provided Email Address is already in use by another account')
          }
        })
      }),
   check('password')
      .exists({checkFalsy: true})
      .withMessage('Please provide a password')
      .matches('/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/', 'g')
      .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
]

router.get('/register', csrfProtection, asyncHandler(async(req, res)=>{//creates new user and sotres in db
 //TODO: create new user
 //TODO: direct them to homepage
}))

module.exports = router;
