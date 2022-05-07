const Apps = require('../../models/App')



exports.HandleLoadAllCommnets = async (req, res) =>
{
    
    const ListofComments = await Apps.LoadAllCommnets(req.params.id);
    res.json({ListofComments})
}