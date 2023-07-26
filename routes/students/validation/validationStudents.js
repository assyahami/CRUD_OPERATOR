const { check } = require('express-validator')
const { validateResult } = require('../../../middleware/validationResult')

/**
 * Validates create new item request
 */

const dateOfBirthRegex =  /^(?:(?:19|20)\d{2})[- /.]?(0?[1-9]|1[0-2])[- /.]?(0?[1-9]|[12][0-9]|3[01])$/;

const validateStudent = [
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
    check('DOB')
        .exists()
        .withMessage('DOB MISSING')
        .matches(dateOfBirthRegex)
        .withMessage("Invalid date of birth format. Use YYYY-MM-DD.")
    ,
    check('state')
        .exists()
        .withMessage('STATE MISSING')
        .not()
        .isEmpty()
        .withMessage('STATE_IS_EMPTY')
        .trim(),
    check('country')
        .exists()
        .withMessage('COUNTRY MISSING')
        .not()
        .isEmpty()
        .withMessage('COUNTRY_IS_EMPTY')
        .trim(),
    check('email')
        .exists()
        .withMessage('EMAIL MISSING')
        .not()
        .isEmpty()
        .withMessage('EMAIL_IS_EMPTY')
        .isEmail()
        .withMessage('EMAIL_IS_NOT_VALID'),
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

    check('hobbies')
        .exists()
        .withMessage('HOBBIES MISSING')
        .not()
        .isEmpty()
        .withMessage('HOBBIES_IS_EMPTY')
        .trim(),


    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateStudent }
