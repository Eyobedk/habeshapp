const User = require('../models/User');



exports.finder = async(email) =>{
    const user = await User.findOne({
        email
    });
    return user
}

exports.findById = async(id) =>{
    const user = await User.findById(id);
    return user
}


