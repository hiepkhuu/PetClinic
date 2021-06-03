const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator');
const { asyncHandler, csrfProtection } = require('./utils');
const bcrypt = require('bcryptjs')

const { User, Answer, Question} = require('../db/models')
const { loginUser, logoutUser, requireAuth} = require('../auth');


/* GET users listing. */
router.get('/homepage',  asyncHandler(async(req, res)=> {//this is user homepage
  const {userId} = req.session.auth;
  const user = await User.findByPk(
    userId,
    {
      include: [Answer, Question]
    })


  const questions = user.Questions;
  const answers = user.Answers;
  const professional = user.professionalUser
  // const questions = await Question.findByPk(userId, {
  //   include: Answer
  // })

    res.render('user-homepage',{ answers, questions, user, professional});


}));

router.get('/register', csrfProtection, asyncHandler(async(req, res)=>{//get registration page
 const user = { userName: null, email: null }
  res.render('user-register',{
    title: 'Registration',
    csrfToken: req.csrfToken(),
    // history: req.session.history,
    user
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
      // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
      // .withMessage("Password must contain at least 1 lowercase letter, uppercase letter, number, and special character"),
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
 //need to do errorValidators
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
      title: 'Registration',
      user,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));


router.get('/login', csrfProtection, (req, res) => {

  res.render('login', { title: 'Login', csrfToken: req.csrfToken() });
});

const loginValidators = [
  check('email')
    .exists({checkFalsy: true})
    .withMessage('Please provide an Email Address'),
  check('password')
    .exists({checkFalsy: true})
    .withMessage('Please provide a Password')
];

router.post('/login', csrfProtection, loginValidators, asyncHandler(async(req, res) => {
  const { email, password } = req.body;

  let errors = [];
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const user = await User.findOne({ where: { email } })

    if(user) {
      const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());
      if (passwordMatch) {
        loginUser(req, res, user)
        return res.redirect('/')
      }
    }
    errors.push('Login failed for the provided email address and password');
  } else {
    errors = validatorErrors.array().map((error) => error.msg)
  }

  res.render('login', {
    title: 'Login',
    email,
    errors,
    csrfToken: req.csrfToken()
  });

}));

router.get('/guest', asyncHandler(async(req, res) => {
  const user = await User.findByPk(1);
  loginUser(req, res, user);
  return res.redirect("/users/homepage");
})

);
router.post('/logout', (req, res) => {

  logoutUser(req, res)
  res.redirect('/')
});




module.exports = router;
