const express = require('express');

const authController = require('../controller/authcontroller');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/verifyemail/:token',authController.verifyemail);

module.exports=router;