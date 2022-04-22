const fs = require('fs');
const Apps = require('../models/App')
exports.updateApps = async (req,res)=>{

    const Paths = await Apps.getAppsPath(req.params.id, res.locals.dev.id)

    console.log(Paths)
    var oldPath = 'old/path/file.txt'
    var newPath = 'new/path/file.txt'
    res.send("done")
    
    fs.rename(oldPath, newPath, function (err) {
      if (err) throw err
      console.log('Successfully renamed - AKA moved!')
    })
}