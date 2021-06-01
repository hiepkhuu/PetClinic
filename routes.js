const express = require('express');
const csrf = require('csurf');
const {check, validationResult } = require('express-validator');

const db = require('./db/models');

const router = express.Router();
const csrfProtection = csrf({ cookie: true });


