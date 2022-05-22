const Admin = require('../../models/Admin')




exports.LoadUsersAndDevelopers = async (req, res)=>
{
    const users = [];
    const developers = [];

    const ListofUsers = await Admin.ListUsers();
    const ListofDevelopers = await Admin.ListofDevs();

    ListofUsers.forEach((user)=>
    {
        let theDate = user.currentdate
        let month = theDate.getUTCMonth() + 1;
        let day = theDate.getUTCDate();
        let year = theDate.getUTCFullYear();
        let newdate = `${day}-${month}-${year}`;
        if(user.name === null)
        {
            users.push(["Google Account", user.email, newdate])
        }else{
        users.push([user.name, user.email, newdate])
        }
        
    })
    ListofDevelopers.forEach((developer)=>
    {
        let theDate = developer.registeredDate;
        let month = theDate.getUTCMonth() + 1;
        let day = theDate.getUTCDate();
        let year = theDate.getUTCFullYear();
        let newdate = `${day}-${month}-${year}`;

        developers.push([developer.dev_name, developer.dev_email, developer.dev_phone, developer.payement_ID, newdate])
    })
    
    res.render('admin/pannel',{user: users,developer : developers})
}