const jwt = require('jsonwebtoken');
require('dotenv').config()


module.exports.refreshToken = (id) =>{
    return jwt.sign({
        id
    }, process.env.REFRESH_TOKEN_SECRET_KEY, {
        expiresIn: 1.08e+7
    })
}