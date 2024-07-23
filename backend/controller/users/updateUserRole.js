const userModel = require("../../models/userModel");

async function updateUserRole(req,res){
    try{
        // checking if user if user is admin or not
        // if you dont get req.userid then import from the AUTHTOKEN file variable is decoded?._id
        const session_user=req.userid;
        // console.log("update user role-->session_user",session_user);


        const user=await userModel.findById(session_user);
        // console.log("user role:",user.role);
        // destructure the data comming from req.body
        const {name,email,role,userid}=req.body;
        // console.log(name,email,role,userid);
        // console.log("user id from req.body",req.userid);
        // setting up the play load and it is used to edit db data based on the userId
        const playload={
            ...(email && {email:email}),
            ...(name && {name:name}),
            ...(role && {role:role}),
        }
        // the req.userId is comming from middle ware
        // console.log("userId: ",req.userId);
        // find the user by id  and update user details
        const updateuser=await userModel.findByIdAndUpdate(userid, playload);
        res.status(200).json({
            message:"user role is updated successfully",
            success:true,
            error:false,
            data:updateuser

        })


    }
    catch(err){
        res.status(400).json({
            message:err.message|| err,
            success:false,
            error:true
        })
    }
}
module.exports =updateUserRole;