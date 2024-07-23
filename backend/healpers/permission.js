const userModel=require("../models/userModel");
const  uploadProductPermission= async(userid)=>{
    const user=await userModel.findById(userid);
    // console.log("user: ", user);

    if(user.role==='ADMIN'){
        return true;

    }
    return false;

}


module.exports=uploadProductPermission;