const Apps = require('../../models/App')



exports.HandleLoadAllCommnets = async (req, res) =>
{
    
    const ListofComments = await Apps.LoadAllCommnets(req.params.id);
    console.log(JSON.stringify(ListofComments))
    res.json({ListofComments})

}