const Apps = require('../models/App')
const rimraf = require("rimraf");
const fs = require('fs');



exports.deleteAppsRoute = async (req, res) => {
    await Promise.resolve(Apps.getAppsPath(req.params.id, res.locals.dev.id)).then((theApp)=>{
        rimraf.sync(`uploads/${theApp[0].appName}`);
        if(fs.existsSync(`updates/${theApp[0].appName}`))
        {
            rimraf.sync(`updates/${theApp[0].appName}`);
        }
    })
    const result = await Promise.resolve(Apps.deleteApps(req.params.id, res.locals.dev.id)).catch(err =>{console.log(err)});
    const deleteMessage = "Your publushed App is removed from the platform"
    
    if(result[0].affectedRows)
    {
         res.render("developer/appls/deleteApps", {deleteMessage:deleteMessage})
    }
    else{
        res.render("developer/appls/deleteApps")
    }
}
   