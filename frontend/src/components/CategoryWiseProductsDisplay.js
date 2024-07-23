import React, { useContext, useEffect,  useState } from 'react'

import fetchCategoryWiseProduct from '../healpers/fetchCategoryWiseProducts';
import DisplayIndianCurrency from '../healpers/DisplayIndianCurrency';

import { Link } from 'react-router-dom';
import addToCartProduct from '../healpers/addToCartProduct';
import Context from '../context';
import scrollTop from '../healpers/ScrollTop';




const CategoryWiseProductDisplay = ({category,heading}) => {
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
     <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] md:gap-6 overflow-scroll scrollbar-none mt-2 transition-all' >
    
       {
        loading?(
          loadingList.map((product,index)=>{
        return(
          <div className='w-full  mt-2 min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white  mb-10 rounded shadow ' key={index}  >
        <div className='bg-slate-300 h-44 min-w-[280px] md:min-w-[145px] p-2 flex justify-center items-center'>
         
        </div>
        <div className='p-2'>
         
          <h2 className='md:font-semibold capitalize font-medium text-base text-ellipsis line-clamp-1 text-black bg-slate-200 p-2  rounded-full w-full animate-pulse'>{}</h2>
          <p className='capitalize text-slate-500 bg-slate-200 p-2 mt-2  rounded-full animate-pulse'></p>
          
          <div className='flex gap-10 mt-2 '>
            <p className='font-semibold text-medium  bg-slate-200 p-2 w-full rounded-full animate-pulse'></p>
            <p className='line-through bg-slate-200 p-1 w-full  rounded-full animate-pulse'></p>

          </div>
          {/* add to cart button */}
          <div className='justify-center flex items-center '>
          <button className=' text-lg capitalize px-2 py-3 mt-4 ml-5 mr-5 rounded-full   w-full font-semibold bg-slate-200 p-3 animate-pulse'></button>

          </div>
         
        </div>
     </div>
        )

      })
        ):(
          data.map((product,index)=>{
        return(
          <Link to={"/product/"+product?._id} className='w-full  mt-2 min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white  mb-10 rounded shadow ' key={index}  onClick={scrollTop} >
        <div className='bg-slate-300 h-44 min-w-[280px] md:min-w-[145px] p-2 flex justify-center items-center'>
            <img src={product?.productImage[0]} alt={product?.productName} className='object-scale-down h-full  hover:scale-110 mix-blend-multiply'/>
        </div>
        <div className='p-2 '>
         
          <h2 className='md:font-semibold capitalize font-medium text-base text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
          <p className='capitalize text-slate-500'>{product?.category}</p>
          
          <div className='flex gap-10'>
            <p className='font-semibold text-medium '>{DisplayIndianCurrency(product?.sellingPrice)}</p>
            <p className='line-through'>{DisplayIndianCurrency(product?.price)}</p>

          </div>
          {/* add to cart button */}
          <div className='justify-center flex items-center'>
          <button className='bg-sky-400  text-lg capitalize px-2 py-0.5 mt-4 ml-5 mr-5 rounded-full hover:bg-sky-600 hover:scale-110 w-full font-semibold' onClick={(e)=>{
            handleAddToCart(e,product?._id);
            

          }}>Add to Cart </button>

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

export default CategoryWiseProductDisplay;
