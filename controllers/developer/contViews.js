const {Apps} = require('../../models/App')


exports.contViews = async (req, res, next)=>{
    const userId = res.locals.userId;
    // const TheAppClass = new Apps(req.params.appid);
    
    const theUser = await Apps.GetAlreadyVistedId(userId, req.params.appid);
    if(theUser.length == 0)
    {
        await Apps.updateViewCount(req.params.appid).then(async()=>{
            await Apps.UpdateAlreadyVistedId(userId, req.params.appid).catch((err)=>{
                console.log(err)
                if(err.errno == 1452)
                {
                    res.redirect(302,'/home');
                }
            })
        }).catch((err)=>{
            console.log(err)
        });

    }
    next();
}