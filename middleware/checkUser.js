const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const useremail = require('../routes/G_OAuth')

exports.checkUser = async (req, res, next) => {
    try{
    const token = req.cookies.jwt;
    console.log("in here")
    console.log(token)
    console.log(req.cookies.session)
    if (req.cookies.jwt) {
        jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            }
            else {
                const c = JSON.stringify(decodedToken["id"]);
                let id = c.replace(/\"/g,'')
                let onlyId = id.replace(/\\/g, '')
                
                const user = await User.findByID(onlyId)
                console.log("user"+user)
                console.log("dt2"+JSON.stringify(user))
                res.locals.user = {id:user["user_id"],email:user["email"]};
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