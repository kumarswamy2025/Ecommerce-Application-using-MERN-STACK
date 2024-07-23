var mongoose=require('mongoose');

const AddProductSchema=mongoose.Schema({
    productId:{
        ref:"ProductModel",
        type: String,
    },

    quantity:Number,
    userAccountId:String,
    userDetails:{
        name:{
            type: 'String',
            // required: true,
        },
        email:{
            type: 'String',
        //    required: true,
        },
        profilepic:{
            type: 'String',
          
            
        },
        role:{
            type: 'String',
        }

    }
},{
    timestamps:true
})


const AddToProductModel=mongoose.model('CartModel',AddProductSchema);

module.exports=AddToProductModel;