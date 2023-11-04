const adminisLogin = async (req,res,next)=>
{
    try{
         if(req.session.admin_id){}
         else{
           return  res.redirect("/admin/admin_login")
         }
         next();
    }
    catch(error)
    {
        console.log(error.message)
    }
}
const adminisLogout = async (req,res,next)=>
{
    try{
         if(req.session.admin_id)
         {
            return res.redirect("/admin/admin_dashboard")
         }
        next();
    }
    catch(error)
    {
        console.log(error.message)
    }
}
module.exports= {
    adminisLogin,
    adminisLogout
}