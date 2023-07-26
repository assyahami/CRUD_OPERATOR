const Users = require("../models/Users")

const roleAuthorization = (role) => async (req, res, next) => {
    try {
        const userID = req.user.user_id
        const data = {
            id: userID,
            role
        }
        let checkPermission = await Users.findById(userID)
        if (!checkPermission) {
            return res.status(404).json({
                message: "User can't be found",
                status: 'fail',
            });
        } else if (role.indexOf(checkPermission.role) > -1) {
            return next()
        }
        else {
            return res.status(401).json({
                message: 'UnAuthorized',
                status: 'fail',
            });
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    roleAuthorization
}