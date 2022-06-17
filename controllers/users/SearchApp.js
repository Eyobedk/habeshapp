const {Apps} = require('../../models/App')


exports.searchThis = async (req, res)=>
{
    const {search} = req.body;
    const Result =[];
    const SearchResult = await Apps.SearchApp(search);
    SearchResult.forEach(app => {
        Result.push([app.appName, app.icon, app.appid, app.appRate, app.views])
    });
    console.log(Result)
    // res.send('done')
     res.render('users/home', {Type: "Search Result", ListApps: Result})
}