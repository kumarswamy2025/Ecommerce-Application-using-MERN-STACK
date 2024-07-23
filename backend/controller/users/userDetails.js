const userModel = require("../../models/userModel");

async function userDetailsController(req,res){
    try{
        // console.log("userID ",req.userid);
        const  user=await userModel.findById(req.userid);
        // console.log("user data:",user);
        res.status(200).json({
            message:"user details",
            success:true,
            error:false,
            data:user
        })
        

    }catch(err){
        res.status(400).json({
            message:err.message|| err,
            success:false,
            error:true
        })
    }

}
module.exports =userDetailsController;