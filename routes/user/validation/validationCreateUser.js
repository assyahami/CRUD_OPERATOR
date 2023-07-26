const { check } = require('express-validator')
const { validateResult } = require('../../../middleware/validationResult')

/**
 * Validates create new item request
 */

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
        .isLength({
            min: 10,
            max: 10
        })
        .withMessage("INVALID MOBILE NUMBER")
        .trim(),

    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreateUser }
