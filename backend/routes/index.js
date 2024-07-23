/* =================================importing section Start here ==================================  */
const express=require('express');
const userSignUpController=require('../controller/users/userSingUp');
const userSignInController = require('../controller/users/userSignIn');
const authToken = require('../middleware/authToken');
const userDetailsController = require('../controller/users/userDetails');
const userLogout = require('../controller/users/userLogout');
const AllUsers = require('../controller/users/AllUsers');
const updateUserRole = require('../controller/users/updateUserRole');
const uploadProductController = require('../controller/products/uploadProduct');
const getAllProductsController = require('../controller/products/getAllProducts');
const UpdateProductController = require('../controller/products/UpdateProduct');
const deleteProductController = require('../controller/products/DeleteProduct');
const getCategoryProduct = require('../controller/products/getCategoryProduct');
const getCategoryWiseProduct = require('../controller/products/getCategoryWiseProduct');
const getProductDetails = require('../controller/products/getProductDetails');
const AddToCartController=require('../controller/users/AddToCartController');
const countAddToCartProduct = require('../controller/users/countAddToCartProduct');
const AddToCartViewProduct = require('../controller/users/AddToCartViewProduct');
const UpdateAddToCartProduct = require('../controller/users/UpdateAddToCartProduct');
const DeleteAddToCartProduct = require('../controller/users/DeleteAddToCartProduct');
const SearchProduct = require('../controller/products/SearchProduct');
const filterProductController = require('../controller/products/filterProduct');

/* =================================importing section End here ==================================  */

/*========================== configuration section Start here ==================================== */

var routes=express.Router();
/*========================== configuration section End here ==================================== */

/* ===================================== NORMAL ROUTES =============================================== */
// post method for singup page
// this is end point for the singup controller
routes.post('/signup',userSignUpController);

// post method for signin page
routes.post('/signin',userSignInController);

// getting data 
routes.get("/user-details",authToken,userDetailsController);

// user logout 
routes.get("/userLogout",userLogout)

/* ============================ ADMIN PANEL ROUTES ========================================================= */

// this is API end point is for admin panel to fetch data
routes.get("/all-users",authToken,AllUsers)

// this is API end point is for admin panel to  update user role
routes.post("/update-user-role",authToken,updateUserRole)


/* =============================== PRODUCT UPLOAD ROUTES ===================================================== */
// uploading the products
routes.post("/upload-product",authToken,uploadProductController);

// getting the products 
// here we can remove the authToken if possible 
routes.get("/get-products",authToken,getAllProductsController);

// updating the product  details
routes.post("/update-product",authToken,UpdateProductController)

// delete the product 

routes.delete("/delete-product",authToken,deleteProductController)

//getting category of the product
routes.get("/get-category",getCategoryProduct);

//getting product list by category wise
routes.post("/get-categorywiseproduct",getCategoryWiseProduct);

// getting product data by its id 
routes.post("/getting-productdetails",getProductDetails)

// adding product to controller
routes.post("/addtocart",authToken,AddToCartController);

// countng the cart product 
routes.get("/getcartcount",authToken,countAddToCartProduct);

// getting cart products data
routes.get("/view-cart-product",authToken,AddToCartViewProduct);
// updating cart product quantity
routes.post("/update-qantity",authToken,UpdateAddToCartProduct);

// deleting add to cart products
routes.post("/delete-addtocart-product",authToken,DeleteAddToCartProduct)

// searching products API
routes.get("/search-product",SearchProduct);

// fileter product data
routes.post("/filter-product",filterProductController);


module.exports=routes;