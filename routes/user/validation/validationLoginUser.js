const { check } = require('express-validator')
const { validateResult } = require('../../../middleware/validationResult')

/**
 * Validates create new item request
 */


const validateLoginUser = [
    check('email')
        .exists()
        .withMessage('EMAIL MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isEmail()
        .withMessage('EMAIL_IS_NOT_VALID'),
    check('password')
        .exists()
        .withMessage('PASSWORD MISSING')
        .not()
        .isEmpty()
        .withMessage('PHONE_IS_EMPTY')
        .isLength({
            min: 5
        })
        .withMessage('PASSWORD_TOO_SHORT_MIN_5'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {
    validateLoginUser
}
