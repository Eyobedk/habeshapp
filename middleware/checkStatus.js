const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Developer = require('../models/Developer')
require('dotenv').config();
const useremail = require('../routes/users/G_OAuth')

exports.checkUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (req.cookies.jwt) {
            jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET_KEY, async (err, decodedToken) => {
                if (err) {
                    res.locals.user = null;
                    next();
                } else {
                    const c = JSON.stringify(decodedToken["id"]);
                    let id = c.replace(/\"/g, '')
                    let onlyId = id.replace(/\\/g, '')
                    const user = await User.findByID(onlyId)
                    res.locals.userId = user["user_id"];
                    res.locals.userEmail = user["email"];
                    
                    next();
                }
            });
        }
        else {
         res.locals.user = null;
          next();
        }
    } catch (e) {
        console.log(e)
    }
}

exports.checkDeveloper = async (req, res,next)=>{
    try{
    if (req.cookies.devToken) {
        jwt.verify(req.cookies.devToken, process.env.DEVELOPER_ACCESS_TOKEN_SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                res.locals.dev = null;
               
                next();
            } else {
                const c = JSON.stringify(decodedToken["id"]);
                let id = c.replace(/\"/g, '')
                let onlyId = id.replace(/\\/g, '')

                const developer = await Developer.findByID(onlyId)
                res.locals.dev = {
                    id: developer["dev_id"],
                    email: developer["dev_email"]
                };
                next();
            }
        });
    }else {
        res.locals.dev = null;
         next();
       }
    }catch(err){console.log(err)}
}