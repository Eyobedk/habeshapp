const jwt = require('jsonwebtoken');
require('dotenv').config()

const requireAuth =(req, res, next) => {
    const token = req.cookies.jwt;
    const authenicatedUser = req.isAuthenticated() && req.user;
    if (authenicatedUser) {
        next();//Google-authenticated
    }else if(token)
    { jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY,(err,decodedToken)=>{
                if (err) {
                    console.log(err.message);
                    res.redirect('/Login')
                } else {
                next();
            }
        })
            
    }else {
        res.redirect('/Login')
    }
}

const requireAuthforDev =(req, res, next) => {
    const token = req.cookies.devToken;
    if(token){
         jwt.verify(token, process.env.DEVELOPER_ACCESS_TOKEN_SECRET_KEY,(err,decodedToken)=>{
                if (err) {
                    console.log("dev token error: "+err.message);
                    res.redirect('/developer-Login')
                } else {                
                next();
            }
        })
            
    }else {
        res.redirect('/developer-Login')
    }
}
module.exports ={ requireAuth, requireAuthforDev};