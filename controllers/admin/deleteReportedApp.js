const Apps = require('../../models/App')
const rimraf = require("rimraf");
const fs = require('fs');

exports.deleteReportedApp = async (req, res) => {
    await Promise.resolve(Apps.getAppsPathById(req.params.id)).then( async (theApp)=>{
        if(theApp.length == 0)
        {
            res.redirect(302, "/admin200/badApps")
            return;
        }else{
        rimraf.sync(`uploads/${theApp[0].appName}`);
        const result = await Promise.resolve(Apps.deleteAppsByAdmin(req.params.id)).catch(err =>{console.log(err)});
        if(result[0].affectedRows)
        {
        res.redirect(302, "/admin200/badApps")
        }else{res.redirect(302, "/admin200/badApps")}

        if(fs.existsSync(`updates/${theApp[0].appName}`))
        {
            rimraf.sync(`updates/${theApp[0].appName}`);
        }
    }
       

    })
}