import React, { useContext, useEffect, useRef, useState } from 'react'

import fetchCategoryWiseProduct from '../healpers/fetchCategoryWiseProducts';
import DisplayIndianCurrency from '../healpers/DisplayIndianCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import addToCartProduct from '../healpers/addToCartProduct';
import Context from '../context';

const HorizentalCardComponent = ({category,heading}) => {
    const [data,setData]=useState([]);
    // console.log("data",data);
    const [loading,setLoading]=useState(false);
    const loadingList=new Array(13).fill(null);
    const fetchData=async ()=>{
      setLoading(true);
      const  categoryProduct=await fetchCategoryWiseProduct(category);
     
      // setLoading(false);
     
      setData(categoryProduct.data);
      // console.log("categoryProduct",categoryProduct);

    }
    const handleSetLoadState=()=>{
      setLoading(false)

    }
    // after 1 second the data will display 
   const myTimeout = setTimeout(handleSetLoadState, 1000);
  
    // const [scroll,setScroll]=useState(0);
    const scrollElement=useRef();
    
    // scroll right
    const scrollRight=()=>{
      scrollElement.current.scrollLeft+=300
    }
    // scroll left
    const scrollLeft=()=>{
      scrollElement.current.scrollLeft-=300
    }
    const {fetchUserCartcount}=useContext(Context);
   
    // handle addtocart
    const handleAddToCart=async(e,id)=>{
      
      await addToCartProduct(e,id);
      fetchUserCartcount();
  
  
    }
    useEffect(()=>{
      fetchData();

    },[])

  return (
    <div className=' ml-10 mt-5  mr-10 mc border-transparent	 relative'>
     <h2 className='text-2xl font-bold capitalize'>{heading}</h2>
     <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none mt-2 transition-all' ref={scrollElement}>
      {/* previous button */}
      <button className='bg-white rounded-full shadow-2xl p-1 absolute -left-4 text-xl hidden md:block  hover:scale-125'  onClick={scrollLeft}><FaAngleLeft /></button>
         {/* next button */}
         <button className='bg-white rounded-full shadow-2xl p-1 absolute -right-5 text-lg  hidden md:block  hover:scale-125' onClick={scrollRight}><FaAngleRight /></button>
       {
        // ternary operator 
        loading?(
          loadingList.map((product,index)=>{
        return(
          <div className='w-full  mt-2 min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white h-36 mb-10 rounded shadow flex ' key={index}  >
        <div className='bg-slate-300 h-full min-w-[120px] md:min-w-[145px] p-2 '>
           
        </div>
        <div className='p-2 mt-3'>
          <h2 className='md:font-semibold capitalize font-medium text-base text-ellipsis line-clamp-1 text-black bg-slate-400 px-20 py-2.5 w-full animate-pulse rounded-full'>{}</h2>
          <p className='capitalize text-slate-500 bg-slate-400 p-1 mt-2 py-2.5 animate-pulse rounded-full'></p>
          <div className='flex gap-3 mt-2'>
            <p className='font-semibold text-medium bg-slate-400 p-1 w-full py-2.5 animate-pulse rounded-full'></p>
            <p className='line-through bg-slate-400 p-1 w-full py-2.5 animate-pulse rounded-full'></p>

          </div>
          {/* add to cart button */}
          <div className='justify-center flex items-center w-full'>
          <button className='  text-lg capitalize px-2  mt-4  rounded-full   font-semibold bg-slate-400 p-1 w-full py-2.5 animate-pulse'></button>

          </div>
         
        </div>
     </div>
        )

      })
        ):(
          data.map((product,index)=>{
        return(
          <Link to={"product/"+product?._id} className='w-full  mt-2 min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white h-36 mb-10 rounded shadow flex' key={index}  >
        <div className='bg-slate-300 h-full min-w-[120px] md:min-w-[145px] p-2 '>
            <img src={product?.productImage[0]} alt={product?.productName} className='object-scale-down h-full  hover:scale-110 mix-blend-multiply'/>
        </div>
        <div className='p-2'>
          <h2 className='md:font-semibold capitalize font-medium text-base text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
          <p className='capitalize text-slate-500'>{product?.category}</p>
          <div className='flex gap-3'>
            <p className='font-semibold text-medium'>{DisplayIndianCurrency(product?.sellingPrice)}</p>
            <p className='line-through'>{DisplayIndianCurrency(product?.price)}</p>

          </div>
          {/* add to cart button */}
          <div className='justify-center flex items-center'>
          <button className='bg-sky-400  text-lg capitalize px-2 py-0.5 mt-4  rounded-full hover:bg-sky-600 hover:scale-110 font-semibold' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>

          </div>
         
        </div>
     </Link>
        )

      })

        )
        
          
        
     
     }
     </div>
    
    
    
      
    </div>
  )
}

export default HorizentalCardComponent
