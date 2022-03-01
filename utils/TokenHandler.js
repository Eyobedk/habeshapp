const jwt = require('jsonwebtoken');
require('dotenv').config()


module.exports.createToken = (id) =>{
    return jwt.sign({
        id
    }, process.env.ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: 2.592e+8
    })
}