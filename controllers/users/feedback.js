const User = require('../../models/User')


exports.feedback = async (req, res)=>{
    const {feedbacks} = req.body;
    await User.addFeedback(feedbacks, res.locals.userId).catch((err)=>{
        if(err.errno == 1064){
            res.cookie('session','', {
                maxAge: 1
            })
            res.cookie('session.sig','', {
                maxAge: 1
            })
            res.cookie('jwt','', {
                maxAge: 1
            })
        }
      });
    res.redirect('/home');
}