const productModel = require("../../models/productModel")

const getAllProductsController=async (req,res)=>{
    try{
        const allProducts= await productModel.find().sort({
            createdAt : -1
        })
        res.status(200).json({
            message: "getting all products",
            success:true,
            error:false,
            data:allProducts
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
module.exports = getAllProductsController