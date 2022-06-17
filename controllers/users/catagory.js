const {Apps} = require('../../models/App')


exports.ListbyCatagory =  async (req, res)=>
{
    const catagory = Object.keys(req.body)
    let ListApps = [];
    console.log(catagory);
    await Apps.SimilarApps(catagory[0]).then((results)=>{
        if(results.length == 0){
            res.render('users/home', {
                // ListApps: ListApps,
                Type:`No ${catagory} Apps`
            })
            return
        }
        results.forEach((file) => {
            ListApps.push([file.appName, file.icon, file.appid,file.appRate,file.views])
        })
        res.render('users/home', {
            ListApps: ListApps,
            Type:`${catagory} Apps`
        })
    }).catch((err)=>{
        console.log(err)
    })
    
    
}