import React, { useEffect, useState } from 'react'
import UploadProducts from '../components/UploadProducts'
import Apis from '../API_urls/API_urls';
import AdminProductCart from '../components/AdminProductCart';

const AllProducts = () => {
  const [uploadProducts,setUploadProducts]=useState(false);
  const [AllProducts,setAllProducts]=useState([])
  const gettingAllProducts=async ()=>{
    const Api_data= await fetch(Apis.get_all_product.API,{
      method:Apis.get_all_product.method,
      credentials:"include"
    })
   const Api_data_response= await Api_data.json();
   setAllProducts(Api_data_response?.data||[]);
  //  console.log("the Api_data_response:",Api_data_response);
  //  console.log("the Api_data_response called");



  } 
  

  useEffect(()=>{
    gettingAllProducts();
  },[])
  return (
    // main div tag 
    <div>
      {/* all products */}
     <div className='bg-white h-10 flex justify-between items-center pl-10 '>
      <h1 className='font-bold px-10 py-1 text-xl capitalize '>All products </h1>
     
     {/*upload buttotn  */}
       <div className='p-2'> 
           <button className='border-2 bg-sky-400 rounded-full hover:bg-sky-600 hover:text-white px-10 py-1 font-bold' onClick={()=> setUploadProducts(true)}>Upload</button>
        </div>
     

     </div>
     {/* getting all products */}
     <div className=' py-5 gap-4 Align-all-products-items flex items-center justify-center '>
      {
        AllProducts.map((product,index)=>{
          //console.log("product:",product)
          return(
            <AdminProductCart data={product} key={index} getting_all_products_fetch={gettingAllProducts}/>
            
           
          )

        })
      }
     </div>
     {
     uploadProducts&&<UploadProducts onClose={()=>setUploadProducts(false)}  getting_all_products_fetch={gettingAllProducts}/>
     }
    </div>
  )
}

export default AllProducts;
