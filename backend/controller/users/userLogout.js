async function userLogout(req, res) {
    try{
        res.clearCookie("token");
        res.json({
            message: "User logged out successfully",
            error:false,
            success:true,
            data:[]
        })

    }
    catch(err){
        res.json({
            message: err.message,
            error:true,
            success:false
        })
    }
}
module.exports =userLogout;