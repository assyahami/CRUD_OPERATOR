var express = require('express');
const userController = require('../../controllers/users.Controller');
var router = express.Router();
const { body } = require("express-validator");
const { validateCreateUser } = require('./validation/validationCreateUser');
const { validateLoginUser } = require('./validation/validationLoginUser');
const { verifyToken } = require('../../middleware/verifyAccessToken');
const { validateUpdateUser } = require('./validation/validationUpdateUser');
const { roleAuthorization } = require('../../middleware/roleAuthorization');
const { upload, uploadErrorHandler } = require('../../utils/upload');




/* GET users listing. */
router.post('/register', validateCreateUser, userController.registerUser);

router.post('/login', validateLoginUser, userController.loginUser);

router.put('/update_user', verifyToken, validateUpdateUser, roleAuthorization(["ADMIN", "USER"]), userController.updateUser);

router.put('/update_profile', verifyToken, roleAuthorization(["USER"]), upload.single("profile_pic"), uploadErrorHandler, userController.updateUserProfilePic);

router.delete('/delete_user', verifyToken, roleAuthorization(["ADMIN", "USER"]), userController.deleteUser);

router.get('/get_user', verifyToken, userController.getUser);

router.post('/logout',userController.logoutUser );


module.exports = router;
