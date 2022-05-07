const Apps = require('../../models/App')


exports.ReportApp = async (req, res,next)=>{
    if(req.body.report){

        console.log(req.body.report)
        const ReportedList = await Apps.checkAppisReported(req.params.appid, res.locals.userId);
        if(ReportedList.length == 0)
        {
            const RatesandDownloads = await Apps.GetRateandDownload(req.params.appid);
            console.log("RatesandDownloads[0][0]")
            console.log(RatesandDownloads)
        }else{}
    
}
    next();
}