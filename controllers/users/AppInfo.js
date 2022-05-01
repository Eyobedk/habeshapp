const Apps = require('../../models/App')
const {checkAppRated, Rate1star, Rate2star,Rate3star,Rate4star,Rate5star,insertRate,checkRateStatus,addUserId} = require('./Rate')




async function handleRating(req)
{
    console.log("handleRating")
    if(req.body.rating1 == 1)
    {
        await Rate1star(req.params.appid)
    }
    if(req.body.rating1 == 2)
    {
        await Rate2star(req.params.appid)
    }
    if(req.body.rating1 == 3)
    {
        await Rate3star(req.params.appid)
    }
    if(req.body.rating1 == 4)
    {
        await Rate4star(req.params.appid)
    }
    if(req.body.rating1 == 5)
    {
        await Rate5star(req.params.appid)
    }
}



const ApkInfo = [];
exports.AppInfo = async (req, res) => {
    const appIds = req.params.appid;
    const userId = res.locals.userId;

    await Apps.ListAppsForUsers(appIds).then((result) => {
        ApkInfo.push([{ appname: result[0].appName},
            { dev_id: result[0].dev_id }, { Rate: result[0].appRate },
            { func1: result[0].funcOne }, {  func2: result[0].funcTwo },
            { func3: result[0].funcThree }, { func4: result[0].funcFour },
            {Icon: '/' + result[0].icon},
            { screenshot1: '/' + result[0].screenshotOne }, { screenshot2: '/' +  result[0].screenshotTwo },
            { screenshot3: '/' + result[0].screenshotThree }, { screenshot4: '/' + result[0].screenshotFour },
        ])
    }).catch(err => {
        console.log(err)
    })
    res.render('users/appPage',{AppInfos:ApkInfo})
}

exports.AddComment = async(req, res)=>{


    await checkAppRated(req.params.appid).then(async appResult =>{

        if(appResult)
        {
            await checkRateStatus(req.params.appid, res.locals.userId).then(async StatResult =>{
                    if(StatResult.length == 0){
                        await handleRating(req).then(async ()=>{await addUserId(req.params.appid, res.locals.userId)})
                    }
            });
            
        }else{
            await insertRate(req.params.appid).then(async ()=>{
                await checkRateStatus(req.params.appid, res.locals.userId).then(async StatResult =>{
                    if(StatResult.length == 0){
                        await handleRating(req).then(async ()=>{await addUserId(req.params.appid, res.locals.userId)})
                    }
                })
             } )
         }
    })

    res.redirect('back');
}