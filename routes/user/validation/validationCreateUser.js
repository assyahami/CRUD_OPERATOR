const { check } = require('express-validator')
const { validateResult } = require('../../../middleware/validationResult')

/**
 * Validates create new item request
 */

const validateCreateUser = [
    check('username')
        .exists()
        .withMessage('USERNAME MISSING')
        .not()
        .isEmpty()
        .withMessage('NAME_IS_EMPTY')
        .isLength({
            min: 3
        })
        .withMessage('NAME_TOO_SHORT_MIN_3')
    ,
    check('role')
        .optional({ nullable: true })
        .isIn(["ADMIN", "USER"])
        .withMessage("ONLY VALID ADMIN OR USER")
    ,
    check('password')
        .exists()
        .withMessage('PASSWORD MISSING')
        .not()
        .isEmpty()
        .withMessage('PASSWORD_IS_EMPTY')
        .isLength({
            min: 5
        })
        .withMessage('PASSWORD_TOO_SHORT_MIN_5'),
    check('email')
        .exists()
        .withMessage('EMAIL MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isEmail()
        .withMessage('EMAIL_IS_NOT_VALID'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreateUser }
