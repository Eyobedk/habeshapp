const User = require('../../models/User')


exports.feedback = async (req, res)=>{
    const {feedbacks} = req.body;
    await User.addFeedback(feedbacks, res.locals.userId).catch((err)=>{console.log(err)});
    res.redirect('/home');
}