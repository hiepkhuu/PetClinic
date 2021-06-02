const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator');
const { asyncHandler, handleValidationErrors, csrfProtection } = require('./utils');
const bcrypt = require('bcryptjs')

const { User} = require('../db/models')
const { restoreUser, loginUser, logoutUser, requireAuth} = require('../auth');

/* GET users listing. */
router.get('/', function(req, res, next) {//this is user homepage
  res.send('this is the user homepage');
});

router.get('/register', csrfProtection, asyncHandler(async(req, res)=>{//get registration page
  res.render('user-register',
  {
    title: 'Registration',
    csrfToken: req.csrfToken(),
    // history: req.session.history,
  }
  )
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
      return User.findOne({where: {email: value}})
        .then((user)=>{
          if (user) {
            return Promise.reject('The provided Email Address is already in use by another account')
          }
        })
      }),
   check('password')
      .exists({checkFalsy: true})
      .withMessage('Please provide a password'),
      // .matches('/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/', 'g')
      // .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
    check('confirmPassword')
      .exists({checkFalsy: true})
      .withMessage('Please provide a confirmed password')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Confirm Password does not match Password');
        }
        return true;
      })

]

router.post('/register', csrfProtection, userValidators,
asyncHandler(async(req, res)=>{//creates new user and sotres in db
 //TODO: create new user
 const {username, email, password } = req.body
 let { professionalUser } = req.body
 if (professionalUser){
  professionalUser = true;
} else {
  professionalUser = false;
}

 const user = await User.build({
   username,
   password,
   email,
   professionalUser
  });

  const validatorErrors = validationResult(req)
  console.log(validatorErrors)
  if(validatorErrors.isEmpty()){
    const hashedPassword = await bcrypt.hash(password, 10)
    user.hashedPassword = hashedPassword;
    await user.save()
    loginUser(req, res, user)
    res.redirect('/')
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);

    res.render('user-register', {
      title: 'Register',
      user,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));




module.exports = router;
