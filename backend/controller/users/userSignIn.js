const userModel = require("../../models/userModel");
const bcrypt=require("bcryptjs");
const jwt = require('jsonwebtoken');




async function userSignInController(req,res){
    
    try{
        const {email,password} = req.body

    
    //    console.log("req.body:",req.body.password);

        if(!email){
           throw new Error("please provide a valid email");
        }
        if(!password){
            throw new Error("please provide a valid password")
        }
        // getting email from database
        const user=await userModel.findOne({email})
        if(!user){
            throw new Error("user not found")
        }
        // checking password is correct or not
        const password_check= await  bcrypt.compare(password, user.password);
       

        // console.log("password-check:",password_check);
        if(password_check){
            // JWT Authentication 
           const jwtData= {
            // id is generated randomly 
            _id:user._id,
            // email is taken from db(userModel)
            email:user.email

           }
        //    console.log("jwtData: " , jwtData);
          const token= await jwt.sign(jwtData, process.env.jwt_secret_key, { expiresIn: 60*60*8 });

//   console.log("the userSingn token:",token);
              const tokenOption={
                httpOnly: true,
                secure:true
            }
          res.cookie("token",token,tokenOption).json({
                message:"login successfully",
                data:token,
                success:true,
                error:false

            })
            

        }
       

        else{
            throw new Error("please entire a valid password");
        }
        


    }
    catch(err){
        
        res.json({
            message: err.message,
            error:true,
            success:false
        })

    }
}
module.exports =userSignInController;