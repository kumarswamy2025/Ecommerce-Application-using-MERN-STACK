var mongoose=require('mongoose');
// creating database schema
var userSchema=new mongoose.Schema({
    name:{
        type: 'String',
        required: true
    },
    email:{
        type: 'String',
        required: true,
        unique: true
    },
    password:{
        type: 'String',
        required: true

    },
    profilepic:{
        type: 'String',
      
        
    },
    role:{
        type: 'String',
    }

},{
     // the use of timestamps is set to the current date when a document is created or updated.
     /* n Mongoose, the timestamps option in a schema definition automatically adds createdAt and updatedAt fields to your schema. These fields are automatically managed by Mongoose and are set to the current date when a document is created or updated.
     
     Here's a breakdown of what each of these fields represents:

    i)==> createdAt: This field stores the date and time when the document was first created.
    ii)==> updatedAt: This field stores the date and time when the document was last updated.
     By setting timestamps: true in your schema, Mongoose will handle the creation and updating of these fields for you, making it easier to track the creation and modification times of your documents.
     
     */

    timestamps:true
});
const userModel=mongoose.model('UserModel',userSchema);

module.exports=userModel;
