/* ========================== importing section start here ================================= */
// importing required modules
const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const connectDB=require('./config/db');
const route=require('./routes/index');
const mongoose=require('mongoose');
var bodyparser=require('body-parser');
var cookieParser = require('cookie-parser')

/* ========================== importing section End  here ================================= */

/*========================== configuration section Start here ==================================== */
// configuting dotenv 
dotenv.config();
// assigning the express module to app variable
const app = express();



/*========================== configuration section End here ==================================== */


/* =====================middle ware section Staret  here========================================== */
// configuring cors
app.use(cors({
  // origin domain name 
  origin:process.env.frontend_url,
  // credential is used to save session information in browser
  credentials:true

}));

// converting user side data into json format  to store json data into database 
      /**
       * NOTE: Use this middle wares before the route other wise i will throws an error
       */
     app.use(express.json())
   // app.use(express.urlencoded({ extended: true }));  ==>this is a middleware used to convert user side data into json
   // app.use(bodyparser.json());  ==.==>this is a middleware used to convert user side data into json
  // cookie parser() is used to save cookies in the browser
  app.use(cookieParser());
  // api route start point  for all routes
   app.use('/api',route);


/* =====================middle ware section End here========================================== */


/* =================================== DB comnnection start here ========================================= */

  connectDB()

/* =================================== DB comnnection End here ========================================= */

/*=========================== SERVER CREATED START HERE============================================== */
 // port number 
 const port=8080||process.env.port;
 app.listen(port,()=>{
 console.log(`server is started at ${port}`);
 });

/*=========================== SERVER CREATED END HERE============================================== */


