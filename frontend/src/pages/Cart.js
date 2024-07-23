import { useContext, useEffect, useState } from "react";
import Apis from "../API_urls/API_urls";
import Context from "../context";
import { MdDelete } from "react-icons/md";
import DisplayIndianCurrency from './../healpers/DisplayIndianCurrency';

function Cart(){

    const [data,setData]=useState([]);

    const [loading,setLoading]=useState(false);
    
    // console.log("cart data:",data);

    // console.log("cart data:",data[0]?._id);

   

    const context=useContext(Context);
    // console.log("context:",context);
    const loadingCart=new Array(context.count).fill(null)

    // fetching the cart products data
    const fetchData=async()=>{
        
        const data=await fetch(Apis.viewCartProduct.API,{
            method:Apis.viewCartProduct.method,
            credentials:"include",
            headers:{
                "content-type":"application/json"
            }
        })
        const dataResponse=await data.json();

    

        // console.log("dataResponse",dataResponse.data);
        if(dataResponse.success){
        setData(dataResponse.data);


        }

    }

  

    // increase quatity post Api
    const IncreaseQuantity=async(id,qty)=>{
        // console.log("id:",id);
        const fetchData1=await fetch(Apis.updateQuantity.API,{
           
            method:Apis.updateQuantity.method,
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                quantity:qty+1,
                CartId:id
            })
        })
        const fetchDataResponse=await fetchData1.json();

        if(fetchDataResponse.success){
            fetchData()
        }
        
       

    }

      // decrease quatity post Api
       const DecreaseQuantity=async(id,qty)=>{
        if(qty>=2){
            const fetchData1=await fetch(Apis.updateQuantity.API,{
                method:Apis.updateQuantity.method,
                credentials:"include",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({
                    quantity:qty-1,
                    CartId:id
                   
                })
            })
            const fetchDataResponse=await fetchData1.json();
            
            if(fetchDataResponse.success){
                fetchData()
              
            }

        }
        
       

    }
    // deleting add to cart product
    const deleteAddToCartProduct=async (id)=>{
        const fetchData1=await fetch(Apis.delete_addtocart_product.API,{
            method:Apis.delete_addtocart_product.method,
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                
                CartId:id
               
            })
        })
        const fetchDataResponse=await fetchData1.json();
        
        if(fetchDataResponse.success){
            fetchData()
            context.fetchUserCartcount();
          
        }



    }
    // handeling loading when quantity increses oor decreses
    const handleLoading =async()=>{
        setLoading(true)
        await fetchData();
        setLoading(false)
    }

    useEffect(()=>{
        handleLoading()
     
       

    },[])
  
    // calculating  total quantity
    const totalQuantity=data.reduce((previousValue,currentValue)=>previousValue+currentValue.quantity,0)
    // calculating total price
     const totalPrice=data.reduce((prev,currnt)=>prev+(currnt.quantity*currnt?.productId?.sellingPrice),0)
    return(
        <div className="md:ml-10 mt-5  md:mr-10 ml-0  mr-0">
        
        <div className=" my-5">
            {
                data.length===0 && !loading ? (
                    <p className="capitalize  bg-white py-5 text-center  text-lg">no data available</p>
                ):(
                    <div className="flex flex-col lg:flex-row lg:gap-10 gap-5 lg:justify-between ">
                        {/* view product */}
                        <div className="w-full max-w-4xl ">

                            {
                                loading ?(
                                    loadingCart.map((ele,index)=>{
                                        return(
                                            <div key={index} className="bg-slate-400 h-32 my-3 w-full border border-slate-400 animate-pulse "> 

                                            </div>

                                        )
                                    })
                                    

                                ):(
                                    data.map((product,index)=>{
                                        // console.log("index",index);
                                        // console.log("product",product);

                                        return(
                                            <div key={index} className="bg-slate-100 h-32 my-3 w-full border border-slate-100  grid grid-cols-[128px,1fr]"> 
                                           
                                            {/* product image */}
                                           <div className="h-32 w-32 bg-white ">
                                            <img src={product?.productId?.productImage[0]} alt="" className="h-full w-full object-scale-down  mix-blend-multiply"/>
                                           </div>
                                           {/* product details */}

                                           <div className="px-4 py-2 relative ">
                                            {/* delete icon */}
                                            <div className="absolute top-8 md:top-6 right-5 cursor-pointer md:p-2  hover:bg-red-800 hover:text-white rounded-full text-xl" onClick={()=>deleteAddToCartProduct(product?._id)}>
                                                <MdDelete/>

                                            </div>
                                            <h2 className="capitalize text-lg lg:text-xl text-ellipsis line-clamp-1">{product?.productId?.productName}</h2>
                                            <h2 className="capitalize text-slate-500">{product?.productId?.category}</h2>
                                            {/* selling price */}
                                            <div className="flex  items-center  justify-between">
                                            <p className="font-medium text-lg">{DisplayIndianCurrency(product?.productId?.sellingPrice)}</p>
                                            <p className="font-medium text-lg"> {DisplayIndianCurrency(product?.productId?.sellingPrice*product?.quantity)}</p>


                                            </div>
                                            {/* increase and decrease button */}
                                            <div className="flex items-center gap-3 mt-1">
                                                <button className="border border-sky-400 hover:bg-sky-400 hover:text-white  w-6 h-6 rounded text-2xl flex justify-center items-center" onClick={()=>{
                                                    DecreaseQuantity(product?._id,product?.quantity);
                                                  
                                                   
                                                    }}>-</button>
                                                <span>{product?.quantity}</span>
                                                <button className="border border-sky-400 hover:bg-sky-400 hover:text-white  w-6 h-6 rounded text-2xl flex justify-center items-center" onClick={()=>{
                                                    IncreaseQuantity(product?._id,product?.quantity)
                                                  
                                                    
                                                    
                                                    }}>+</button>

                                            </div>


                                           </div>

                                            </div>
                                        )

                                    })

                                )
                            }


                        </div>

                        {/* summary */}
                        <div className="mt-1 lg:mt-2.5 w-full max-w-sm">
                            {
                                loading ?(
                                    <div className=" h-36 bg-slate-400 animate-pulse">
                                        

                                    </div>


                                ):(
                                    <div className=" h-36 bg-white">
                                        <h2 className="bg-sky-400 px-4 py-2">Summary</h2>
                                        <div className="flex items-center justify-between px-4 gap-4 font-medium text-lg text-slate-600">
                                            <p>Quantity</p>
                                            <p>{totalQuantity}</p>
                                        </div>
                                        <div className="flex items-center justify-between px-4 gap-4 font-medium text-lg text-slate-600">
                                            <p className="capitalize">total price</p>
                                            <p>{DisplayIndianCurrency(totalPrice)}</p>

                                        </div>
                                        <div className="mt-2">
                                            <button className="capitalize bg-blue-600 w-full p-2 rounded-full">payment</button>
                                        </div>
                                    

                                </div>

                                )
                            }
                        </div>

                       


                    </div>
                  
                )
            }
            
        </div>
        
        </div>
    )
}

export default Cart;