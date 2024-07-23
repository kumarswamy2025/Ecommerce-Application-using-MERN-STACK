const productModel = require("../../models/productModel");

const getProductDetails=async(req,res)=>{  
    try{
        const {productId}=req.body;
        const getProductData=await productModel.findById(productId);
        res.status(200).json({
            message:"product data is sended sucessfully..... ",
            success:true,
            error:false,
            data:getProductData
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

module.exports=getProductDetails