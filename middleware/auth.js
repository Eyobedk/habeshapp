const jwt = require('jsonwebtoken');
require('dotenv').config()

const requireAuth =(req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login')
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/login')
    }
}

module.exports ={ requireAuth};