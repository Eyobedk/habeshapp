const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.protect =(req, res,next)=>{
    const token = req.cookies.devToken;
    if(token)
    { jwt.verify(token, process.env.DEVELOPER_ACCESS_TOKEN_SECRET_KEY,(err,decodedToken)=>{
                if (err) {
                    console.log(err.message);
                    res.redirect('/developer-Login')
                } else {
                next();
            }
        })
            
    }else {
        res.redirect('/developer-Login')
    }
    
}