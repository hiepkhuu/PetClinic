const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { asyncHandler, handleValidationErrors, csrfProtection } = require('./utils');

const { User} = require('../db/models')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', csrfProtection, asyncHandler(async(req, res)=>{
  const user = db.User
}))

module.exports = router;
