const User = require('../models/User');

exports.finder = (email) =>{
    return new Promise((resolve, reject)=>{
        const user = User.findOne({
            email
        }).catch(err,reject(err))
        resolve(user);
    })
}

exports.findById = async(id) =>{
    const user = await User.findById(id);
    return user
}