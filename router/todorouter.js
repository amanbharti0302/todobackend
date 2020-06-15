const express = require('express');

const authController = require('../controller/authcontroller');
const Todocontroller = require('../controller/todocontroller');

const router = express.Router();

router.post('/newtodo',Todocontroller.createnew);
router.post('/updatetodo', Todocontroller.updateproject);
router.post('/deletetodo',Todocontroller.deleteproject);
router.post('/get',Todocontroller.getproject);
router.post('/getonepr',Todocontroller.getoneprojectdetail);


router.get('/',authController.verifyemail);

module.exports=router;