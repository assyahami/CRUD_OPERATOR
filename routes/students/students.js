var express = require('express');
var router = express.Router();
const { verifyToken } = require('../../middleware/verifyAccessToken');
const { roleAuthorization } = require('../../middleware/roleAuthorization');
const { upload, uploadErrorHandler } = require('../../utils/upload');
const { validateStudent } = require('./validation/validationStudents');
const studentsController = require('../../controllers/students.Controller');




/* GET users listing. */
router.post('/create_student', verifyToken, validateStudent, roleAuthorization(["USER", "ADMIN"]), studentsController.createStudent);

router.put('/update_student/:id', verifyToken, validateStudent, roleAuthorization(["ADMIN", "USER"]), studentsController.updateStudents);

router.put('/update_student_pic/:id', verifyToken, roleAuthorization(["USER","ADMIM"]), upload.single("profile_pic"), uploadErrorHandler, studentsController.updateStudentsProfilePic);

router.delete('/delete_student/:id', verifyToken, roleAuthorization(["ADMIN", "USER"]), studentsController.deleteStudents);

router.get('/get_student/:id', verifyToken, studentsController.getStudents);


module.exports = router;
