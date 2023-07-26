const { check } = require('express-validator')
const { validateResult } = require('../../../middleware/validationResult')

/**
 * Validates create new item request
 */

const dateOfBirthRegex = /^(?:(?:19|20)\d{2})[- /.]?(0?[1-9]|1[0-2])[- /.]?(0?[1-9]|[12][0-9]|3[01])$/;

const validateCreateUser = [
    check('name')
        .exists()
        .withMessage('NAME MISSING')
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
    check('email')
        .exists()
        .withMessage('EMAIL MISSING')
        .not()
        .isEmpty()
        .withMessage('EMAIL_IS_EMPTY')
        .isEmail()
        .withMessage('EMAIL_IS_NOT_VALID'),
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
    check('phone')
        .exists()
        .withMessage('PHONE MISSING')
        .not()
        .isEmpty()
        .withMessage('PHONE_IS_EMPTY')
        .isMobilePhone()
        .withMessage("INVALID MOBILE NUMBER")
        .trim(),
    check('qualification')
        .exists()
        .withMessage('QUALIFICATION MISSING')
        .not()
        .isEmpty()
        .withMessage('QUALIFICATION_IS_EMPTY')
        .isLength({
            min: 2
        })
        .withMessage('QUALIFICATION_TOO_SHORT_MIN_2')
        .trim(),
    check('gender')
        .exists()
        .withMessage('GENDER MISSING')
        .not()
        .isEmpty()
        .withMessage('GENDER_IS_EMPTY')
        .isIn(["MALE", "FEMALE"])
        .withMessage("ONLY VALID MALE OR FEMALE")
        .trim(),

    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreateUser }
