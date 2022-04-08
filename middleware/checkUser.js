const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Developer = require('../models/Developer')
require('dotenv').config();
const useremail = require('../routes/G_OAuth')

exports.checkUser = async (req, res, next) => {
    try{
    const token = req.cookies.jwt;
    console.log("check user: in here");
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
     else if (req.cookies.devToken) {
        jwt.verify(req.cookies.devToken, process.env.DEVELOPER_ACCESS_TOKEN_SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                res.locals.dev = null;
                next();
            }
            else {
                const c = JSON.stringify(decodedToken["id"]);
                console.log("the decoded token "+c);
                let id = c.replace(/\"/g,'')
                console.log("the decoded token id:"+id);
                let onlyId = id.replace(/\\/g, '')
                console.log("the decoded onlyId "+onlyId);
                
                const developer = await Developer.findByID(onlyId)
                console.log("developer::"+developer)
                console.log("dt2 developer"+JSON.stringify(developer))
                res.locals.dev = {id:developer["dev_id"],email:developer["dev_email"]};
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