const db = require('../../db/database')



exports.updateMyRate = async (appid)=>
{
    console.log("checking update my rate")
    let sql = `SELECT * FROM rate WHERE Tappid=${appid}`;
    const [result, _] = await db.execute(sql);
    return result;
}

exports.checkRateStatus = async(appId, userId)=>
{
    let sql = `SELECT * FROM alreadyrated WHERE theappid = ${appId} AND Tuser_id = ${userId}`;
    const [result, _] = await db.execute(sql).catch((err)=>{ console.log(err)});
    return result;
}

exports.checkAppRated = async (appId)=>
{
    let sql = `SELECT * FROM rate WHERE Tappid = ${appId}`;
    const [result, _] = await db.execute(sql);
    return result;
}

exports.insertRate = async (appId)=>{
    console.log("insertRates")
    let sql = `INSERT INTO rate(Tappid,oneStar, twoStar, threeStar, fourStar, fiveStar) VALUES(${appId},'${0}','${0}','${0}','${0}','${0}')`;
    return new Promise((resolve, reject)=>{
        resolve(db.execute(sql));
    })
}

exports.addUserId = (appid, userId)=>
{
    console.log("add user id")
    let sql = `INSERT INTO alreadyrated(theappid, Tuser_id) VALUES(${appid}, ${userId})`;
    return new Promise((resolve, reject)=>{
        resolve(db.execute(sql));
    })
}

exports.SetRate = async (rate, appid)=>
{
    let sql = `UPDATE apps SET appRate = ${rate} WHERE appid = ${appid}`;
    await db.execute(sql).then((result)=>{console.log(result)}).catch((err)=>{console.log(err)})
}



exports.Rate1star = async (appId)=>{ 
    const sql = `UPDATE rate SET oneStar = oneStar + 1 WHERE Tappid = ${appId}`;
    await db.execute(sql).then(result =>{console.log(result)});
}
exports.Rate2star = async (appId)=>{ 
    const sql = `UPDATE rate SET twoStar = twoStar + 1 WHERE Tappid = ${appId}`;
    await db.execute(sql).then(result =>{console.log(result)});
}
exports.Rate3star = async (appId)=>{ 
    const sql = `UPDATE rate SET threeStar = threeStar + 1 WHERE Tappid = ${appId}`;
    await db.execute(sql).then(result =>{console.log(result)});
}
exports.Rate4star = async (appId)=>{ 
    const sql = `UPDATE rate SET fourStar = fourStar + 1 WHERE Tappid = ${appId}`;
    await db.execute(sql).then(result =>{console.log(result)});
}
exports.Rate5star = async (appId)=>{ 
    const sql = `UPDATE rate SET fiveStar = fiveStar + 1 WHERE Tappid = ${appId}`;
    await db.execute(sql).then(result =>{console.log(result)});
}

