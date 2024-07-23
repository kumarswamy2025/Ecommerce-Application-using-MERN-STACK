var mongoose=require('mongoose');

 productUploadSchema=mongoose.Schema({
    productName:{
        type: 'String',
        required: true
    },
    brandName:{
        type: 'String',
        required: true
    },
    category:{
        type: 'String',
        required: true
    },
    productImage:[],
    description:{
        type: 'String',
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    sellingPrice:{
        type: Number,
        required: true
    }
},{
    timestamps:true
})


const productModel=mongoose.model('ProductModel',productUploadSchema);

module.exports=productModel;