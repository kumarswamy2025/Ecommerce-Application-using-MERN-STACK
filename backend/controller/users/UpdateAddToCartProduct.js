const AddToProductModel = require("../../models/cartProduct");

const UpdateAddToCartProduct=async(req,res)=>{
    try{
        const currentUserID=req.userid;
        const addToCartProductID=req.body.CartId;
         const Quantity=req.body.quantity

          // Filter object to find the correct document
        const filter = {
            userAccountId: currentUserID,
            _id: addToCartProductID // Assuming CartId is the _id of the document
        };

        // Update object to modify the document
        const update = {
            ...(Quantity && { quantity: Quantity })
        };






         const upgradeQuantity=await AddToProductModel.updateOne(filter, { $set: update })
        //  console.log("addToCartProductID", addToCartProductID, Quantity);


         
        //  console.log("addToCartProductID",addToCartProductID,Quantity);
         res.status(200).json({
            message:"product updated sucessfully...",
            success:true,
            error:false,
            data:upgradeQuantity
         })

    }catch(err){
        console.log("err",err);
        res.status(400).json({
            message:err.message|| err,
            success:false,
            error:true
        })
    }

}

module.exports=UpdateAddToCartProduct
