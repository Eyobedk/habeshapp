


exports.Logout_Admin = (req, res)=>
{
    res.cookie('whwhwyasadador', '',{maxAge:1})
    res.redirect(302, '/admin200/login');
}