const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            }
            else {
                const user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    }
    else {
        res.locals.user = null;
        next();
    }
}