const Admin = require('../../models/Admin')


exports.BlackListDeveloper = async (req, res)=>
{
    const dev_ID = req.params.devID;
    const TheDev = await Admin.checkDeveloperIsBlackListed(dev_ID);
    if(TheDev.length == 0)
    {
        await Admin.blackListDeveloper(dev_ID);
        await Admin.updateBanStatus(dev_ID);
    }
    res.redirect('/admin200/badDevelopers')
}  