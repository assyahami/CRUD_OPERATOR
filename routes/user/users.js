var express = require('express');
const userController = require('../../controllers/users.Controller');
var router = express.Router();
const { body } = require("express-validator");
const { validateCreateUser } = require('./validation/validationCreateUser');
const { validateLoginUser } = require('./validation/validationLoginUser');
const { verifyToken } = require('../../middleware/verifyAccessToken');




/* GET users listing. */
router.post('/register', validateCreateUser, userController.registerUser);

router.post('/login', validateLoginUser, userController.loginUser);

router.get('/profile', verifyToken, userController.getUser);

router.put('/add_to_shortlist', verifyToken, userController.addToShortlist);

router.put('/remove_to_shortlist/:id', verifyToken, userController.removeToShortlist);

router.put('/add_written_book', verifyToken, userController.writtenBooks);

router.put('/delete_written_book/:id', verifyToken, userController.deleteWrittenBook);

router.post('/logout', userController.logoutUser);


module.exports = router;
