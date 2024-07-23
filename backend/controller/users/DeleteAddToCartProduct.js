const AddToProductModel = require("../../models/cartProduct");

const DeleteAddToCartProduct=async(req,res)=>{
    try{
        const currentUserID=req.userid;
        const addToCartProductID=req.body.CartId;
        const upgradeQuantity=await AddToProductModel.deleteOne({
            _id: addToCartProductID 
        })
        res.status(201).json({
            message:"product deleted sucessfully...",
            success:true,
            error:false
        })

    }
    catch(err){
        console.log("err",err);
        res.status(400).json({
            message:err.message|| err,
            success:false,
            error:true
        })
    }

}

module.exports=DeleteAddToCartProduct