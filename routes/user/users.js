var express = require('express');
const userController = require('../../controllers/users.Controller');
var router = express.Router();
const { body } = require("express-validator");
const { validateCreateUser } = require('./validation/validationCreateUser');
const { validateLoginUser } = require('./validation/validationLoginUser');




/* GET users listing. */
router.post('/register', validateCreateUser, userController.registerUser);

router.post('/login', validateLoginUser, userController.loginUser);
 
router.post('/logout',userController.logoutUser );


module.exports = router;
