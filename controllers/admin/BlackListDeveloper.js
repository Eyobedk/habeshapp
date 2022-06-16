const {BlackList} = require('../../models/Admin')


exports.BlackListDeveloper = async (req, res)=>
{
    const dev_ID = req.params.devID;
    const DevInst = new BlackList(dev_ID)
    const TheDev = await DevInst.checkDeveloperIsBlackListed();
    if(TheDev.length == 0)
    {
        await DevInst.blackListDeveloper();
        await DevInst.updateBanStatus();
    }
    res.redirect('/admin200/badDevelopers')
}  