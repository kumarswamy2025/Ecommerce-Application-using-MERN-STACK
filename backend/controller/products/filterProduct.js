const productModel = require("../../models/productModel");

const filterProductController=async(req,res)=>{
    try{

        const categoryList=req?.body?.category||[];
        const product=await productModel.find({
            "$or":[
                {
                    productName:{
                        "$in":categoryList
                    }
                },
                {
                    brandName:{
                        "$in":categoryList
                    }

                },
                {
                    category:{
                        "$in":categoryList
                    }
                }
            ]
        })

        res.status(201).json({
            data:product,
            message:"filter data sended sucessfully....",
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

module.exports=filterProductController