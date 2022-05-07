const Apps = require('../../models/App')
const {
    checkAppDownloaded,
    checkDownloadStatus,
    updateDownloads,
    addUserId
} = require('../../controllers/users/process_Downloader')

const EventEmitter = require('events');
const EventEmitterClass = new EventEmitter();

EventEmitterClass.on('startDownload', async (app_id, res)=>{
    const result =await Apps.Download(app_id);
    res.download(result);
});


exports.DownloadApp = async (req, res)=>
{

    EventEmitterClass.emit('startDownload', req.params.id, res);
    await checkAppDownloaded(req.params.id).then(async appResult => {

        if (appResult.length == 0) {
          await addUserId(req.params.id, res.locals.userId)
                .then( await updateDownloads(req.params.id))
        } else {
            EventEmitterClass.emit('startDownload', req.params.id, res)
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