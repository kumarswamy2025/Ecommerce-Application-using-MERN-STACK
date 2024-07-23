const uploadProductPermission = require("../../healpers/permission");
const productModel = require("../../models/productModel");

async function deleteProductController (req,res){
    try{
        // const sessionId=req.userid;
        // console.log("sessionId",sessionId);
        // if(!uploadProductPermission(sessionId)){
        //     throw new Error("Permission denied ")
        // }
        const {_id}=req.body;
        const deleteProduct=await productModel.findByIdAndDelete(_id);
        res.status(200).json({
            message: 'Product details deleted successfully',
            success:true,
            error:false,
            data:deleteProduct

        })

    }
    catch(err){

        res.status(400).json({
            message:err.message|| err,
            success:false,
            error:true
        })}
}

module.exports=deleteProductController