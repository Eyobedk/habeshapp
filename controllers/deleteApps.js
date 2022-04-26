const Apps = require('../models/App')




exports.deleteAppsRoute = async (req, res) => {
    const result = await Promise.resolve(Apps.deleteApps(req.params.id, res.locals.dev.id)).catch(err =>{console.log(err)});
    console.log(result[0].ResultSetHeader.affectedRows)
    console.log(result[0].ResultSetHeader)
    console.log(result[0])
    res.send("deleted")
}