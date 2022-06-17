const {Apps} = require('../../models/App')


exports.LoadDevApps =  async (req, res)=>
{
    let ListApps = [];
    const devId = req.params.devId;
    const TheAppClass = new Apps(devId);

    await TheAppClass.ListApps().then((ListOfDeveloperApps)=>{
        ListOfDeveloperApps.forEach((file) => {
        ListApps.push([file.appName, file.icon, file.appid,file.appRate,file.views])
    })
    })
    
    res.render('users/developer_page', {
        ListApps: ListApps
    })
}