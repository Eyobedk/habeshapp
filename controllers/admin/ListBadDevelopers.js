const Admin = require('../../models/Admin');


exports.ListBadDevelopers = async (req, res)=>
{
    const Listed = await Admin.ListofBadDevelopers();
    console.log(Listed)
    res.render('admin/BadDevsPage',
    {
        ListofDevs: Listed
    })
}