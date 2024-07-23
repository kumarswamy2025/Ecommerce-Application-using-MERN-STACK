
const productModel = require("../../models/productModel");
const uploadProductPermission = require("../../healpers/permission");

async  function UpdateProductController(req,res){
    try{
        
        // checking if user is admin or not
        // if user is admin and he can edit the product details 
        const sessionId=req.userid;
        // console.log("sessionId",sessionId);
        if(!uploadProductPermission(sessionId)){
            throw new Error("Permission denied ")
        }
        // de-structuring the product details from the req.body
        // const {_id, productName,brandName,category,productImage,description,price,sellingPrice} = req.body;
        // console.log("the resBody: " + resBody);
        // console.log("_id: " + _id);
        // console.log("productName: " + productName);
        // console.log("\nid:",_id,"\n productName:", productName,"\n brandName:",brandName,"\n category:",category,"\n productImage:",productImage,"\n description:",description,"\n price:",price,"\n sellingPrice:",sellingPrice);
        // const playload={
        //     ...( _id&& {_id:_id}),
        //     ...( productName&& {productName:productName}),
        //     ...(brandName && {brandName:brandName}),
        //     ...(category &&{category:category}),
        //     ...(productImage && {productImage:productImage}),
        //     ...(description && {description:description}),
        //     ...(price && {price:price}),
        //     ...(sellingPrice && {sellingPrice:sellingPrice})

        // }
    
         /* instead of all properties destructuring in req.body  we can use ...resBody   */
         /* ...resBody is rest of body it spread all the req.body properties  */
        const {_id,...resBody}=req.body;

       
       
        //you have to check findByIdAndUpdate  it not
        const updateProduct=await productModel.findByIdAndUpdate(_id,resBody);
        // console.log("updateProduct: " + updateProduct);
        
       
        res.status(200).json({
            message: 'Product details updated successfully',
            success:true,
            error:false,
            data:updateProduct

        })
        
    }  catch(err){

        res.status(400).json({
            message:err.message|| err,
            success:false,
            error:true
        })
    }
}
module.exports =UpdateProductController;