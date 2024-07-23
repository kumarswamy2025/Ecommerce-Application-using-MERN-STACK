const productModel = require("../../models/productModel");

const SearchProduct=async (req,res)=>{
    try{

        const query=req.query.q;
        // console.log("query",query);
        // in regular expression, The "i" modifier specifies a case-insenitive match.
        // in regular expression, The 'g' flag stands for "global" and is used to specify that a regular expression should perform a global search
        const regex=new RegExp(query,'i','g')

        const productData=await productModel.find({
            "$or":[
                {
                    productName:regex
                },
                {
                    brandName:regex

                },
                {
                    category:regex
                }
            ]
        })






        res.status(200).json({
            message:"sended sucessfully",
            success:true,
            error:false,
            data:productData
            
            
        })

    }
    catch(err){
        console.log(err);

        res.status(400).json({
        
            message:err.message|| err,
            success:false,
            error:true
        })
    }

}

module.exports=SearchProduct