const User = require('../models/User');

module.exports.forgot_password = async (req,res,next)=>{
     const {email} = req.body;
     const user = await User.findOne({ email });
    if(user) return user;
    else{
        throw Error('user not found')
    }
 }