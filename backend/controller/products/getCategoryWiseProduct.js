const productModel = require("../../models/productModel");

const getCategoryWiseProduct= async(req,res)=>{
    try{
        const {category}=req?.body || req?.query;
        
        const productList=await productModel.find({category});
        // console.log("productList",productList);
        res.status(200).json({
            message:"categoryList is sended successfully....",
            success:true,
            error:false,
            data:productList
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
module.exports =getCategoryWiseProduct;