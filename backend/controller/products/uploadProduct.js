const uploadProductPermission = require("../../healpers/permission");
const productModel = require("../../models/productModel");

const uploadProductController=async (req,res)=>{
    try{
        
        // checking if user is admin or not
        // if user is admin and he can upload the products details 
        const sessionId=req.userid;
        if(!uploadProductPermission(sessionId)){
            throw new Error("Permission denied ")
        }

        const productmodel= await productModel(req.body);
        const productmodel_save= await productmodel.save();
        res.status(201).json({
            message:"product uploded successfully",
            success:true,
            error:false,
            data:productmodel_save


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


module.exports=uploadProductController;