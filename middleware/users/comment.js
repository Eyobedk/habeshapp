const db = require('../../db/database')
const Apps = require('../../models/App')



async function countLimit(appId,userId){
    const sql = `SELECT COUNT(*) FROM habeshapp.comments WHERE commentedappid = ${appId} AND user_id = ${userId};`
    const [result, _] = await db.execute(sql)
    return result[0]['COUNT(*)'];
}

async function AddTheFirstCommnet(userId, comment1, appId){
    const d = new Date();
    const year = d.getFullYear();
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const date = `${year}-${month}-${day}`;

    const sql = `INSERT INTO comments(user_id, commentOne, commentedappid,published_date) VALUES(${userId}, '${comment1}', ${appId},'${date}')`;
    return new Promise((resolve, reject)=>{
        resolve(db.execute(sql));
    })
}
async function AddTheSecondCommnet(userId, comment2, appId){
    const sql = `UPDATE comments SET commentTwo = '${comment2}' WHERE commentedappid = ${appId} AND user_id = ${userId}`;
    return new Promise((resolve, reject)=>{
        resolve(db.execute(sql));
    })
}

exports.AddComment = async (req, res, next)=>{
    const comment = req.body.comment;
    if( typeof comment != 'undefined')
    {
        const amountOfRates = await countLimit(req.params.appid,  res.locals.userId);
        if( amountOfRates == 0)
        {
            await AddTheFirstCommnet(res.locals.userId, comment, req.params.appid);
        }
        else if(amountOfRates == 1)
        {
            await AddTheSecondCommnet(res.locals.userId, comment, req.params.appid);
        }
    }
 next();
}