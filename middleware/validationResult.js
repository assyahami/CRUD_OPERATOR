const { validationResult } = require("express-validator")
const APIRES = require("../utils/apiResponse")

const validateResult = async (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (errors) {
        let getErrmsg = errors.array()
        let errResp = Array.isArray(getErrmsg) ? getErrmsg[0].msg : getErrmsg
        return res.status(404).json({ message: errResp, status: false })
    }
}

module.exports = {
    validateResult
}