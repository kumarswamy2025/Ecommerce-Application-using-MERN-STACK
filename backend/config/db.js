const mongoose = require('mongoose');

async function connectDB(){
    try{
        await  mongoose.connect(process.env.MONGO_uri);
        console.log('DB connection is established successfully....');


    }
    catch(error){
        console.log(`error at config=>db.js=>${error}`);

    }
}

module.exports = connectDB;