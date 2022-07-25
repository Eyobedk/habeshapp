const {AlertDevelopers,AlertUser} = require('../../models/Alert')

exports.LoadNews =async (req, res)=>{
    const TheMessage = await AlertDevelopers.checkThereIsaMessage();
    if(!TheMessage[0])
    {
        res.render("developer/pannel", {
            email: res.locals.email,
            message: undefined
        })
        return
    }
    res.render("developer/pannel", {
        email: res.locals.email,
        message: TheMessage[0].message
    })
}
exports.LoadNewsforUsers =async (req, res)=>{
    const TheMessage = await AlertUser.checkThereIsaMessage();
    if(!TheMessage[0])
    {
        res.render("developer/pannel", {
            email: res.locals.email,
            message: undefined
        })
        return
    }
    res.render("developer/pannel", {
        email: res.locals.email,
        message: TheMessage[0].message
    })
}