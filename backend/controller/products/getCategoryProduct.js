const productModel = require("../../models/productModel");

const getCategoryProduct=async (req,res)=>{
    try{

    //  distinct is used to return the unique values in  category
        const categoryProduct= await productModel.distinct("category");
       const categoryByProduct=[];
       for(const category of categoryProduct){
        // console.log("category:",category);
        const product= await productModel.findOne({ category});
        if(product){
            // console.log("product:",product.category);
            categoryByProduct.push(product);
        }
 

       }
        

        //   console.log("product:",product);
        // console.log("product",categoryByProduct);
        res.status(200).json({
            message:"category product is returned successfully...",
            success: true,
            error: false,
            data: categoryByProduct
        })

    } catch(err){

        res.status(400).json({
            message:err.message|| err,
            success:false,
            error:true
        })
    }
}

module.exports=getCategoryProduct;