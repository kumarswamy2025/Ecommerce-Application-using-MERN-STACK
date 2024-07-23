// import userModel from "../models/userModel";

const userModel=require("../../models/userModel");
async function AllUsers(req,res){
    try{
        // console.log("user id:",req.userId);
        const allUsers =await userModel.find();
        // console.log("all user details:",allUsers[0].name);


        res.status(200).json({
            message:"All users data ",
            data:allUsers,
            success:true,
            error:false
        });

    }
    catch(err){
        res.status(400).json({
            message:err.message|| err,
            success:false,
            error:true
        })
    }
}

module.exports = AllUsers;