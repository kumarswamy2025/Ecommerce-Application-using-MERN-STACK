const AddToProductModel = require("../../models/cartProduct");
const userModel = require("../../models/userModel");

const AddToCartController=async(req,res)=>{
    try{
        const {productId} =req?.body;
        const currentUser=req.userid;
        const userid=req.userid


        // finding the current userDetails
        const userDetails=await userModel.findById(userid);

        // console.log("userDetails",userDetails.name);





        // check if product is already available or not
        
        const isProductAvalable=await AddToProductModel.findOne({
            productId,
            userAccountId:currentUser
        });

        
        // console.log("isProductAvalable",isProductAvalable);
        if(isProductAvalable){
            return (
                res.status(200).json({
                    message:"product is already avalable in cart...",
                    success:false,
                    error:true
                })

            )
            

        }

        // this playload is used to store data in DB
        const playLoad={
            productId:productId,
            quantity:1,
            userAccountId:currentUser,
            userDetails:{
                name:userDetails.name,
                email:userDetails.email,
                profilepic:userDetails.profilepic,
                role:userDetails.role
        
            }

        }

        // DB save point
        const AddingProductToCart=new AddToProductModel(playLoad);
        const saveData=await AddingProductToCart.save();

        // sending response
        res.status(200).json({
            message:"product added to cart",
            success:true,
            error: false,
            data:saveData
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

module.exports=AddToCartController;