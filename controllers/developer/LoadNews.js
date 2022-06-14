

exports.LoadNews = (req, res)=>{
    res.render("developer/pannel",{email:res.locals.email})
}