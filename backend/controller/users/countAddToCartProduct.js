const AddToProductModel = require("../../models/cartProduct");

const countAddToCartProduct=async (req,res)=>{
    try{
        const userId=req.userid;
        const count=await AddToProductModel.countDocuments({
            userAccountId:userId
        })
        // console.log("count:",count);
        // console.log("userId:",userId);

        res.status(201).json({
            message:"counted sucessfully....",
            success:true,
            error:false,
            data:{
                count:count
            }
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

module.exports=countAddToCartProduct