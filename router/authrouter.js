const express = require('express');

const authController = require('../controller/authcontroller');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/verifyemail/:token',authController.verifyemail);
router.post('/getinfo',authController.tokencheck);

module.exports=router;