const {Apps} = require('../../models/App')
const {
    checkAppDownloaded,
    checkDownloadStatus,
    updateDownloads,
    addUserId
} = require('../../controllers/users/process_Downloader')

const EventEmitter = require('events');
const EventEmitterClass = new EventEmitter();

EventEmitterClass.on('startDownload', async (TheAppid, res)=>{
    const result =await Apps.Download(TheAppid);
    res.download(result);
});

EventEmitterClass.on('startDownloadVersion', async (app_id, version, res)=>{
    const result =await Apps.DownloadVersion(app_id, version);
     res.download(result[0].file_location);
});


exports.DownloadApp = async (req, res)=>
{
    // const TheAppClass = new Apps(req.params.id)
    EventEmitterClass.emit('startDownload', req.params.id, res);
    await checkAppDownloaded(req.params.id).then(async appResult => {

        if (appResult.length == 0) {
          await addUserId(req.params.id, res.locals.userId)
                .then( await updateDownloads(req.params.id))
        } else {
            await checkDownloadStatus(req.params.id, res.locals.userId).then(async StatResult => { //check user rated the app  ?
                if (StatResult.length == 0)
                 {
                    await addUserId(req.params.id, res.locals.userId)
                        .then(await updateDownloads(req.params.id))
                }
            })
        }
    })
}
exports.DownloadVersion = async (req, res)=>
{
    EventEmitterClass.emit('startDownloadVersion', req.params.id,req.params.date, res);
}

// async function StartDownload(appid)
// {
//     const File = []
//     await Apps.Download(appid).then((theAppresult)=>{
//             File.push(theAppresult);
//         });
//         // res.download(result);
//     return File[0]
// }

// module.exports = {StartDownload}