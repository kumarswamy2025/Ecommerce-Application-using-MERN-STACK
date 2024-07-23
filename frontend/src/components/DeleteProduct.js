import React from 'react'
import Apis from '../API_urls/API_urls'
import { toast } from 'react-toastify'

const DeleteProduct = ({
    onClose,
    productData,
    fetch_data
}) => {
  //  deleteing the product 
  const handleOnDelete=async()=>{
    const fetch_data_from_api=await fetch(Apis.delete_product.API,{
     method:Apis.delete_product.method,
     credentials:"include",
      headers:{
              "Content-Type": "application/json",
            },
            body:JSON.stringify(productData)
    })
    const fetch_data_response=await fetch_data_from_api.json();
    console.log("fetch_data_response:",fetch_data_response);
    if(fetch_data_response.success){
      toast.success(fetch_data_response.message);
      onClose();
      fetch_data()

    }
    if(fetch_data_response.error){
      toast.error(fetch_data_response.message);


    }
 }
  return (
    <div className='h-full w-full bg-slate-200 top-0 bottom-0 left-0 right-0 fixed bg-opacity-35 justify-center flex items-center'>

      <div className="bg-white p-4 w-full rounded max-w-xl h-full max-h-[50%] overflow-y-scroll  custom-scrollbar">
                  {/* heading   */}
                <div>
                    <h1 className='capitalize font-bold text-2xl flex justify-center'>do you want to delete product ?</h1>
                </div>
                {/* product image  */}
                <div className='flex justify-center'>
                    <img src={productData.productImage[0]} alt={productData.productName} height={200} width={200}/>
                </div>
                {/* product name */}
                <div>
                <h1 className='capitalize font-bold text-2xl flex justify-center'>{productData.productName}</h1>
                </div>
                {/* buttons cancel and delete */}
                <div className='flex  pt-5'>
                    {/* cancel button */}
                    <div className='bg-green-400 w-60 flex justify-center h-10 hover:scale-110 cursor-pointer rounded shadow-xl' onClick={()=>{onClose()}}>
                      <button >Cancel</button>
                    </div>
                    {/* delete button */}
                   
                    <div className='ml-auto bg-red-600 w-60  flex justify-center h-10 cursor-pointer pl-2 hover:scale-x-110  rounded shadow-xl' onClick={()=>{handleOnDelete()}} > 
                      <button >delete</button>
                    </div>
                   

                </div>

          
        </div>
    </div>
  )
}

export default DeleteProduct
