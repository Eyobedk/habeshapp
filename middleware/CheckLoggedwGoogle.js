exports.checkGoogleLoggedIn =(req,res,next)=>
{
    console.log("The current user is :"+req.user);
    const authenicatedUser = req.isAuthenticated() && req.user;
    if(!authenicatedUser){
        return res.status(403).json({error:'You must log in!'})
    }
    next()
}