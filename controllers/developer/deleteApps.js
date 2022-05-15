const Apps = require('../../models/App')
const rimraf = require("rimraf");
const fs = require('fs');
const deleteMessage = "Your publushed App is removed from the platform"



exports.deleteAppsRoute = async (req, res) => {
    await Promise.resolve(Apps.getAppsPath(req.params.id, res.locals.dev.id)).then( async (theApp)=>{

        let oldPublishedDate = theApp[0].publishedDate;
        let deleteDate = oldPublishedDate.setDate(oldPublishedDate.getDate() + 7)
        let today =new Date();

        if(new Date(deleteDate).getTime() < today.getTime())
        {
            rimraf.sync(`uploads/${theApp[0].appName}`);
            const result = await Promise.resolve(Apps.deleteApps(req.params.id, res.locals.dev.id)).catch(err =>{console.log(err)});
            if(result[0].affectedRows)
            {
                res.render("developer/appls/deleteApps", {deleteMessage:deleteMessage})
            }

            if(fs.existsSync(`updates/${theApp[0].appName}`))
            {
                rimraf.sync(`updates/${theApp[0].appName}`);
            }
        }else{
            let oneWeeklimit = "not enghough date"
            res.render("developer/appls/deleteApps", {oneWeeklimit:oneWeeklimit})
        }

    })
    
    

    
}
   