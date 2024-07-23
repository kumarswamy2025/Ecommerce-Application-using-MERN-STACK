const domain="http://localhost:8080/"
var Apis={
    signUp_API:{
        API:`${domain}api/signup`,
        method:"post"
    },
    signIn_API:{
        API:`${domain}api/signin`,
        method:"post"

    },
    current_user_details_API:{
        API:`${domain}api/user-details`,
        method:"get"

    },
    logout_user_API:{
        API:`${domain}api/userLogout`,
        method:"get"
    },
    All_users_API:{
        API:`${domain}api/all-users`,
        method:"get"

    },
    update_user_role:{
        API:`${domain}api/update-user-role`,
        method:"post"
    },
    upload_product:{
        API:`${domain}api/upload-product`,
        method:"post"
    },
    get_all_product:{
        API:`${domain}api/get-products`,
        method:"get"
    },
    update_product:{
        API:`${domain}api/update-product`,
        method:"post"
    },
    delete_product:{
        API:`${domain}api/delete-product`,
        method :"delete"
    },
    categoryProduct:{
        API:`${domain}api/get-category`,
        method:"get"
    },
    categorywiseproduct:{
        API:`${domain}api/get-categorywiseproduct`,
        method:"post"
    },
    getproductDetails:{
        API:`${domain}api/getting-productdetails`,
        method:"post"
    },
    addToCart:{
        API:`${domain}api/addtocart`,
        method:"post"
    },
    getCartCount:{
        API:`${domain}api/getcartcount`,
        method:"get"
    },
    viewCartProduct:{
        API:`${domain}api/view-cart-product`,
        method:"get"

    },
    updateQuantity:{
          API:`${domain}api/update-qantity`,
        method:"post"

    },
    update_qantitycount:{
          API:`${domain}api/update-qantitycount`,
        method:"get"
    },
    delete_addtocart_product:{
          API:`${domain}api/delete-addtocart-product`,
          method:"post"

    },
    search_products:{
        API:`${domain}api/search-product`,
          method:"get"

    },
    filter_product:{
        API:`${domain}api/filter-product`,
          method:"post"
    }

}

export default Apis;