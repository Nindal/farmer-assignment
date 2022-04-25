const express = require('express');
const router = express.Router();
const  { signin, signup }  = require('./../controllers/auth.controller');
const verifySignUp = require('./../middleware/auth.middleware');


router.post('/signin',signin);

router.post('/signup',verifySignUp.checkDuplicateUsernameOrEmail,signup);

module.exports = router;