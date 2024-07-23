const jwt=require("jsonwebtoken")



async function authToken(req,res,next){
    try{
        
        const token=req.cookies?.token;
        // console.log("token-1 :",token);
        // checking if token  is not available then return this response
        if(!token){
            // console.log("token-2 :",token);
          return   res.status(200).json({
                message: "please login...! ",
                error: true,
                success:false 
            })
           
        }
       
      
        // verify a token symmetric
     jwt.verify(token, process.env.jwt_secret_key, function(err, decoded) {
    //    console.log("error:",err);
    //    console.log("decoded :",decoded);
       if(err){
        // console.log("errror in authToken file: ",err);
        return res.status(401).json({
            message: "please login...! ",
            error: true,
            success: false
        });
       }
    //    console.log("this is authToken file decoded: ",decoded);
       req.userid=decoded?._id;
      
    //    console.log("this is authToken file decoded user id: ",decoded?._id);
    // console.log("auth token file req.userId: ",req.userid);
   
       next();
  });
 


    }catch(err){
      
        res.status(400).json({
            message:err.message||err,
            data:[],
            success:false,
            error:true
        })

    }

}
module.exports=authToken;