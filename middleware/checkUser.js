const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.checkUser = async (req, res, next) => {
    try{
    //const token = req.cookies.jwt;
    if (req.cookies.jwt) {
        jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            }
            else {
                const user = await User.findById(decodedToken.id);
                res.locals.user = {id:user._id,email:user.email};
                next();
            }
        });
    }
    else {
        res.locals.user = null;
        next();
    }
    }catch(e){console.log(e)}
}