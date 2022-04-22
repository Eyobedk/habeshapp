
"use strict";
exports.fileuploader = (req, res)=>{
    const theapk = req.files.apk;
    console.log("theapk.name"+theapk.name);
    const uploadPath = `uploads/${theapk.name}`

    theapk.mv(uploadPath, (err)=>{
        if(err){console.log(err)}
        res.send("sent")
    })
}