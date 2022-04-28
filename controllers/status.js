const Apps = require('../models/App')



exports.ListStatApps = async (req, res)=>
{
    console.log(res.locals.dev.id)
    const ListofApps = await Apps.ListApps(res.locals.dev.id).catch((err)=>{console.log(err)});
    if(ListofApps)
    {
    console.log("list of apps")
    console.log(ListofApps);
    
    let ToSend = [];
    ListofApps.forEach((file)=>{
    ToSend.push([file.appName, '/' +file.icon,file.appid])
    })
    console.log("air"+ToSend)
    res.render("developer/appls/listforStatus", {ToSend})
    }else{res.send("page not found")}
}

exports.getStatus = async (req, res)=>{
    let statusInfo =[];
    await Apps.getAppsPath(req.params.id, res.locals.dev.id).then(result =>{
        if(result[0]){
        result.forEach((info)=>{
            statusInfo.push([{downloads:info.downloads}, {reports:info.appReports}, {rate:info.appRate},{view:info.views}])
        })
        console.log("here we")
        console.log(statusInfo)
        res.render('developer/status', {statusInfo:statusInfo})
    }else{res.send("page not found")}
    }).catch(err=>{throw err});
}