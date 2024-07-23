import { useState } from "react";
import Apis from "../API_urls/API_urls";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function CategoryList(){
    const [categoryProduct,setCategoryProduct] = useState([])
    // console.log("CATEGORY",categoryProduct);

    // loading animations for products
    const [loading,setLoading] = useState(false);
   
    
    

    const fetch_API_data=async()=>{
        setLoading(true);
        const fetch_data=await fetch(Apis.categoryProduct.API,{
            method:Apis.categoryProduct.method,
            credentials:"include"
        })
        const fetch_data_response=await fetch_data.json();
        // console.log("data:", fetch_data_response);
        setLoading(false);
        setCategoryProduct(fetch_data_response.data);

        // console.log("length:",fetch_data_response.data.length);
        
         


    }
    const categoryLoading=new Array(10).fill(null);
    // console.log("category length: " + categoryLength);
    useEffect(()=>{
        fetch_API_data()
    },[])
    return(
    
        <div className="container mx-auto p-4 ">
        <div className="flex items-center  gap-2 justify-between p-5 mt-4 ml-4 mr-5 overflow-scroll scrollbar-none">
        {
                // ternary operator
                loading?(
                    categoryLoading.map((el,index)=>{
                        return(
                            <div className="h-16 w-16 md:h-20 md:w-20 bg-white rounded-full overflow-hidden animate-bounce" key={index}>

                                     </div>

                        )

                    })
                   
                ):(
                categoryProduct.map((product,index)=>{
                  return(
                   <Link to={"/category-product?category="+product?.category} key={index}  className="cursor-pointer capitalize">
                   <div  className="h-16 w-16   md:h-20 md:w-20  rounded-full  overflow-hidden bg-white flex items-center justify-center p-2">
                    {/* 
                    mix-blend-multiply-->this property is used to remove the background color of image 
                    object-scale-down --> this property is used to adject image automatically given height and width

                    
                    */}
                        <img src={product?.productImage[0]} alt={product?.productName} className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all" />
                    </div>
                    <p className="text-center md:text-base text-sm">{product?.category}</p>
                    
                   </Link>
                  )

                }))
            }
        </div>
       

            
        </div>
    )

}

export default CategoryList;