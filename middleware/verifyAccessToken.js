const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {
    try {
        const reqHeaders = req.headers['authorization']
        if (!reqHeaders) {
            return res.status(401).json({
                message: 'UnAuthorized',
                status: 'fail',
            });
        }
        let token = reqHeaders.split('Bearer')[1].trim()

        if (!token) {
            return res.status(401).json({
                message: 'UnAuthorized',
                status: 'fail',
            });
        }
        const decode = jwt.verify(token, process.env.SECRET)
        console.log(decode, 'decode');
        req.user = decode
        next()
    } catch (error) {
        console.log(error, 'eror');
        res.status(401).json({
            message: error.message,
            status: 'fail',
        });
    }
}
module.exports = {
    verifyToken
}