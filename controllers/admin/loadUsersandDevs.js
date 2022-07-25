const {Admin} = require('../../models/Admin')
const {BlackList} = require('../../models/Admin')




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
    
    
    res.render('admin/reports/ListofAllDeves',{developer : developers,})//user: users, 
}
exports.LoadAllUsers = async (req, res)=>
{
    const users = [];
    const ListofUsers = await Admin.ListUsers();    

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
    
    res.render('admin/reports/ListofAllUsers',{user: users})
}

exports.Homepage = async(req, res)=>
{
    const reactions = [];
    const ListofReactions = await Admin.LoadAllReactions();

    ListofReactions.forEach((reaction)=>
    {
        let theDate = reaction.commentedate;
        let month = theDate.getUTCMonth() + 1;
        let day = theDate.getUTCDate();
        let year = theDate.getUTCFullYear();
        let newdate = `${day}-${month}-${year}`;
        
        reactions.push([reaction.name, reaction.message, newdate])
        
    });
    res.render('admin/pannel', {reactions: reactions})
}

exports.ThismonthPublished = async(req, res)=>
{
    const appsList = [];
    const ListofAppsfromThismonth = await Admin.AppsInThismonth();

    console.log(JSON.stringify(ListofAppsfromThismonth))
    ListofAppsfromThismonth.forEach((app)=>
    {
        let theDate = app.publishedDate;
        let month = theDate.getUTCMonth() + 1;
        let day = theDate.getUTCDate();
        let year = theDate.getUTCFullYear();
        let newdate = `${day}-${month}-${year}`;
        
        appsList.push([app.publishedDate, app.catagory,app.downloads,app.views, newdate])
        
    });
    res.render('admin/reports/Thismonthapps', {appsList: appsList})
}
exports.ThisMonthNewUsers = async(req, res)=>
{
    const usersList = [];
    const ListofUsersfromThismonth = await Admin.UsersInThismonth();
    console.log(ListofUsersfromThismonth)

    ListofUsersfromThismonth.forEach((userssList)=>
    {
        let theDate = userssList.currentdate;
        let month = theDate.getUTCMonth() + 1;
        let day = theDate.getUTCDate();
        let year = theDate.getUTCFullYear();
        let newdate = `${day}-${month}-${year}`;
        let name =  String(userssList.name);

        if( name == 'null'){
            usersList.push(['Anonymous', userssList.email,newdate])
        }else{
        usersList.push([userssList.name, userssList.email,newdate])
        }
    });
    res.render('admin/reports/Listofthismonthusers', {usersList: usersList})
}
exports.ThisMonthNewDevs = async(req, res)=>
{
    const devList = [];
    const ListofDevsfromThismonths = await BlackList.UsersInThismonth();

    ListofDevsfromThismonths.forEach((DevsList)=>
    {
        let theDate = DevsList.registeredDate;
        let month = theDate.getUTCMonth() + 1;
        let day = theDate.getUTCDate();
        let year = theDate.getUTCFullYear();
        let newdate = `${day}-${month}-${year}`;

        devList.push([DevsList.dev_name, DevsList.dev_email, DevsList.dev_phone, DevsList.payement_ID, newdate])
    });
    res.render('admin/reports/ThismonthDevs', {devsList: devList})
}