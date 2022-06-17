const {Apps} = require('../../models/App')



exports.HandleLoadAllCommnets = async (req, res) =>
{
    // const TheAppClass = new Apps(req.params.id);
    const ListofComments = await Apps.LoadAllCommnets(req.params.id);
    res.json({ListofComments})
}