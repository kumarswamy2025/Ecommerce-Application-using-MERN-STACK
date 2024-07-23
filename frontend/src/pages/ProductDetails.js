import React, { useContext,useState,useEffect, useCallback } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import Apis from '../API_urls/API_urls';
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import DisplayIndianCurrency from '../healpers/DisplayIndianCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductsDisplay';
import addToCartProduct from '../healpers/addToCartProduct';
// import React, { useContext, useEffect, useRef, useState } from 'react'
import Context from '../context';


const ProductDetails = () => {
  /* useParams() is used to get parameters  */
  
  const params=useParams();
  // console.log("params:",params);
  const [data,setData]=useState({
    productName:"",
    brandName:"",
    category:"",
    productImage:[],
    description:"",
    price:"",
    sellingPrice:""

  })
  // console.log("data response",data);
  // this is an loading state 
  const [loading,setLoading]=useState(false);

  // active image
  const [activeImage,setActiveImage]=useState("");
  
  const fetchData = async () => {
    //setiind loading state is true
    setLoading(true);
    const dataFetch = await fetch(Apis.getproductDetails.API, {
      method: Apis.getproductDetails.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: params?.id
      }
     )
    });
    const dataResponse=await dataFetch.json();
    // console.log("data response",dataResponse);
    setData(dataResponse?.data);
    //  settting active image
    setActiveImage(dataResponse?.data?.productImage[0])

        //setiind loading state is false
        // setLoading(false);
    

  }
// loading product list
  const productListItemsLoad=new Array(5).fill(null);
// handle mouse hover
  const handleMouseHover=(imgURL)=>{
    setActiveImage(imgURL);
  }
  //  discount
   const discount=((data?.price-data?.sellingPrice)/data?.price)*100;
  //  console.log("discount:",discount);
  const handleSetLoadState=()=>{
    setLoading(false)

  }
  // after 1 second the data will display 
 const myTimeout = setTimeout(handleSetLoadState, 1000);
// zoom image coordiante state
 const [zoomImageCoordinate, setZoomImageCoordinate]=useState({
  x:0.5,
  y:0.5
 })
//  zoom image state
const [zoomImage,setZoomImage]=useState(false);

//  handle zoom image
 const handleZoomImage=useCallback((e)=>{
  // setting the zoomImage is true
  setZoomImage(true)
  const {left,top,height,width}=e.target.getBoundingClientRect();
  // console.log("coordinates",left,top,height,width);
  const x_coordinate=(e.clientX-left)/width;
  const y_coordinate=(e.clientY-top)/height;
  setZoomImageCoordinate({
    x:x_coordinate,
    y:y_coordinate
  })
 },[])

 const handleZoomImageOut=()=>{
  setZoomImage(false)

 }
  
 const {fetchUserCartcount}=useContext(Context);
// add to cart
 const handleToAddCart=async(e,id)=>{
  await addToCartProduct(e,id);
  fetchUserCartcount()

 }
 const navigate=useNavigate()
// handling buy product
const handleToBuy=async(e,id)=>{
  await addToCartProduct(e,id);
  fetchUserCartcount();
  navigate("/cart")


 }







  // useEffect hook
 useEffect(()=>{
  fetchData();

 },[params])
  
  return (
    <div className="ml-10 mt-10 mr-10 mc  mb-10">
       <div className=" min-h-[200px]   flex gap-10">
        {/* product images */} 
         <div className=' h-96 flex  flex-col lg:flex-row-reverse  gap-4'> 
          {/* selected images */}
         
         {/* change this div tag */}
          <div className='h-[300px] w-[300px] bg-slate-100 lg:h-[500px] lg:w-[500px] transition-all relative p-3'>
          
              <img src={activeImage} alt=""  className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleZoomImageOut}/>
               {/* product zoom */}
              {
                zoomImage &&  <div className='hidden lg:block overflow-hidden object-scale-down absolute min-h-[600px] min-w-[800px] bg-white -right-[510px] top-0   left-[520px]'>
                <div className=' w-full h-full min-h-[600px] min-w-[800px] mix-blend-multiply scale-125' style={{
                  backgroundImage:`url(${activeImage})`,
                  backgroundRepeat:'no-repeat',
                  backgroundPosition:`${zoomImageCoordinate.x*150}% ${zoomImageCoordinate.y*150}% `
                }}>

                </div>

                </div>
              }
            

          </div>


          <div className='h-full '>
          <div className='flex  gap-2 lg:flex-col overflow-scroll over scrollbar-none h-full'>
            {
             loading?(
              productListItemsLoad?.map((ele,index)=>{
                return(
                  <div className='h-20 w-20 rounded bg-slate-400 animate-pulse' key={index} >

                  </div>
                )

              })
             ):(
              <div className='flex  gap-2   lg:flex-col overflow-scroll scrollbar-none h-full '>
                {
                   data?.productImage?.map((imageURL,index)=>{
                    return(
                      <div className='h-20 w-20 rounded bg-slate-100  ' key={index}>
                        <img src={imageURL} alt={imageURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseHover(imageURL)} onClick={()=>handleMouseHover(imageURL)}/>
                       
    
                      </div>
                    )
    
                  })
                }
                
                </div>
             )

            }

          </div>
          </div>

         </div>
         {/* product details */}
         {
          // setting loading animation
          loading?( <div className='flex flex-col gap-2 w-full  transition-all'>
            {/* brand name */}
            < p className='text-xl capitalize bg-slate-400 animate-pulse rounded-full   w-full inline-block  h-5 font-mono'></p>
            <p className='capitalize  lg:text-4xl mt-9 text-2xl font-medium bg-slate-400 animate-pulse  h-5 w-full rounded-full'></p>
            <p className='capitalize bg-slate-400 animate-pulse  h-5 w-full rounded-full mt-9'></p>
          
            {/* cost details */}
            <div className=' flex  gap-5'>
              <p className='text-3xl font-bold bg-slate-400 animate-pulse  h-5 w-full rounded-full mt-9'></p>
              <div className='flex text-2xl mt-9 text-slate-500 bg-slate-400 animate-pulse  h-5 w-full rounded-full'><div className='text-xl line-through font-semibold  flex items-center'></div> <p className='font-semibold text-black capitalize'></p></div>
  
            </div>
            {/* buy and add to cart buttons */}
            <div className='flex  gap-3 p-2 '>
              <button className=' mt-9 capitalize  rounded py-1 px-6 min-w-[120px] text-black text-xl font-medium  bg-slate-400 animate-pulse   '></button>
              <button className=' mt-9 border-2  capitalize   py-1 px-6 min-w-[120px] text-black text-xl font-medium  hover:bg-sky-600 hover:text-white bg-slate-400 animate-pulse  h-10  rounded'> </button>
  
            </div>
            {/* description */}
            <div className=' '>
              <p className='font-medium my-1 mt-9 capitalize text-xl bg-slate-400 animate-pulse  h-5  rounded-full'></p>
              <p className='text-lg	 mt-9 leading-8 text-justify bg-slate-400 animate-pulse h-5 w-full rounded-full'></p>
            </div>
            
           </div>
           ):( 
            <div className='flex flex-col gap-2'>
          < p className='text-xl capitalize bg-sky-300 rounded-full   w-fit px-2 font-mono'>{data?.brandName}</p>
          <p className='capitalize  lg:text-4xl text-2xl font-medium'>{data?.productName}</p>
          <p className='capitalize'>{data?.category}</p>
          {/* stars */}
          <div className='text-sky-500 flex items-center text-xl gap-1.5'>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt/>
         
          </div>
          {/* cost details */}
          <div className=' flex  gap-5'>
            <p className='text-3xl font-bold'>{DisplayIndianCurrency(data?.sellingPrice)}</p>
            <div className='flex text-2xl text-slate-500'>M.R.P:<div className='text-xl line-through font-semibold  flex items-center'>{DisplayIndianCurrency(data?.price)}</div> <p className='font-semibold text-black capitalize'>({Math.trunc(discount)}% OFF)</p></div>

          </div>
          {/* buy and add to cart buttons */}
          <div className='flex  gap-3 p-2 '>
            <button className='border-2 border-sky-400 capitalize  rounded py-1 px-6 min-w-[120px] text-black text-xl font-medium hover:bg-sky-500 hover:text-white' onClick={(e)=>handleToBuy(e,data?._id)}>buy</button>
            <button className='border-2 border-sky-400 capitalize  rounded py-1 px-6 min-w-[120px] text-black text-xl font-medium bg-sky-400 hover:bg-sky-600 hover:text-white' onClick={(e)=>handleToAddCart(e,data?._id)}>add to cart  </button>

          </div>
          {/* description */}
          <div className=' '>
            <p className='font-medium my-1 capitalize text-xl'>Description:</p>
            <p className='text-lg	 leading-8 text-justify'>{data?.description}</p>
          </div>
          
         </div>
         )
         }
        
       </div>
       {/* recomended products */}
       <div className=' mt-40'>
       {
        data?.category &&(
          <CategoryWiseProductDisplay category={data?.category} heading={"recomended products"}/> 

        )
       }
       </div>
      
       
    </div>
  )
}

export default ProductDetails
