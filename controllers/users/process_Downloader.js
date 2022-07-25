const db = require('../../db/database')


exports.checkAppDownloaded = async (appId)=>
{
    let sql = `SELECT * FROM downloaders WHERE downloadedappid = ${appId}`;
    const [result, _] = await db.execute(sql);
    return result;
}


exports.addUserId = (appid, userId)=>
{
    let sql = `INSERT INTO downloaders(downloadedappid, user_id) VALUES(${appid}, ${userId})`;
    return new Promise((resolve, reject)=>{
        resolve(db.execute(sql));
    })
}


exports.updateDownloads = async (appid)=>
{
    const sql = `UPDATE apps SET downloads = downloads + 1 WHERE appid = ${appid}`;
    await db.execute(sql)
}

exports.checkDownloadStatus = async(appId, userId)=>
{
    let sql = `SELECT * FROM downloaders WHERE downloadedappid = ${appId} AND user_id = ${userId}`;
    const [result, _] = await db.execute(sql).catch((err)=>{ console.log(err)});
    return result;
}