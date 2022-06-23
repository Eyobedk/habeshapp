const {Apps} = require('../../models/App')


exports.contViews = async (req, res, next)=>{
    const userId = res.locals.userId;
    // const TheAppClass = new Apps(req.params.appid);
    
    const theUser = await Apps.GetAlreadyVistedId(userId, req.params.appid, res);
    if(theUser.length == 0)
    {
        await Apps.updateViewCount(req.params.appid).then(async()=>{
            await Apps.UpdateAlreadyVistedId(userId, req.params.appid, res).catch((err)=>{
                console.log(err);
            })
        }).catch((err)=>{
            console.log(err)
            
        });

    }
    next();
}