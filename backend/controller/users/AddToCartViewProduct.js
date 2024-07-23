const AddToProductModel = require("../../models/cartProduct");

const AddToCartViewProduct=async (req,res)=>{
    try{
        const currentUser=req.userid;
        // console.log("userId",currebnt);
        const cartData= await AddToProductModel.find(
         { userAccountId:currentUser}
        ).populate("productId").sort({
            createdAt : -1
        })
        
        // console.log("data",cartData);
        
        res.status(201).json({
            data:cartData,
            message:"Cart data is sended sucessfully",
            success:true,
            error:false

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

module.exports=AddToCartViewProduct
