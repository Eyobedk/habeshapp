const {findEmail} = require('../models/Developer')
const jwt = require('jsonwebtoken')
const Developer = require('../models/Developer')
const {Mailer}= require('../utils/Mail')
const bcrypt = require('bcrypt');
require('dotenv').config();

var DevID;
exports.varifydevEmail = async (req,res)=>{
    const {email} = req.body;
    const Dev = await findEmail(email);
   // console.log("dev"+Dev[0]);
    if (typeof Dev[0] ==="undefined"){
        let TheError = "You must be registered inorder to reset password";
        res.render('passwords/developer-reset',{Ierror:TheError});
        return
    }
    const id = Dev[0].dev_id;
    const secret = process.env.DEVELOPER_FORGOT_PASSWORD_SECRET_KEY;
    const token = jwt.sign({id},secret,{expiresIn:'15m',});

    const link = `http://localhost:3000/developer-reset/${id}/${token}`;
    Mailer(email,link);
    res.render('passwords/developer-reset',{Iok:"We have sent reset password link to your Email"});
}

exports.validateResetTokes = (req, res)=>{
    const {id, token}= req.params;
    DevID = id;
    console.log("the id:"+id)
    console.log("the token:"+token)
    const secret = process.env.DEVELOPER_FORGOT_PASSWORD_SECRET_KEY;
    jwt.verify(token,secret,(err,verified)=>{
        if(err)
        {
            console.log(err);
            res.render('passwords/developer-forgot',{Ierror:"please send varification link again"})
        }
    })
    res.render('passwords/developer-reset');
}

exports.setDeveloperPassword = async (req, res)=>{
    const {password} = req.body;
    console.log(password)
    const hash = bcrypt.hashSync(password, 12);
    console.log(hash)
    if(password.length < 7){
        res.render('passwords/developer-reset',{Ierror:"please enter password greater than 8"})
    }
    
    await Developer.updatePassword(DevID,hash).then(()=>{
        res.redirect(302, 'developer-Login');
    }).catch((err)=>{console.log(err)})
}