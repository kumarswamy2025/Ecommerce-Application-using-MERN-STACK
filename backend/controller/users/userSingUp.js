/* =================================importing section Start here ==================================  */
const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');
/* =================================importing section End here ==================================  */

/*================================ Code start here ================================================== */
// functions for user signup 
async function userSignUpController(req,res){
    try{
       const { name,email,password}=req.body;
        // console.log("req.body",req.body);
        if(!name){
            throw new Error("please provide a name");
        }
        if(!email){
            throw new Error("please provide a email");
        }
        if(!password){
            throw new Error("please provide a password");
        }
        // checkking if email is already  exists    
        const email_check=await userModel.findOne({email});
        // if email is already exists then throws an new error
        if(email_check){
            throw new Error(`email already exists plese provide an new email OR login with this ${email}`);
        }
        // converting plane text password to hash password 
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        if(!hashPassword){
            throw new Error("please provide a hash password");
        }

        // here overwrite the password
        const overWritePassword={
            // we can call overWritePassword is also playload 
            ...req.body,
            role:"GENERAL",
            password:hashPassword
        }

    /*
      {
            name,
            email,
            password


        }  instead of this we can give the req.body in userModel()
          
    
     */
       
        // here we used the overWritePassword variable beacuse the password is updated to hash passsword otherwise we use req.body

        const userData=new userModel(overWritePassword);
        const savedUserData= await userData.save();

        res.status(201).json({
            data:savedUserData,
            success:true,
            error:false,
            // this message is is displayed in the frontend side
            message:"user created successfully..."


        })

    }
    catch(err){
        res.json({
            message: err.message,
            error:true,
            success:false
        })
        // console.log('error occurred in the userSingUp   ',err);
        // console.log("req body:",req.body);
     

    }

}

/*================================ Code End here ================================================== */

module.exports =userSignUpController;