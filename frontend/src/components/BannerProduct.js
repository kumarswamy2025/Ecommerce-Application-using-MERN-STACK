import React, { useEffect, useState } from 'react'
// images for desktopm edition
import image1 from '../assest/banner/img1.webp';
import image2 from '../assest/banner/img2.webp';
import image3 from '../assest/banner/img3.jpg';
import image4 from '../assest/banner/img4.jpg';
import image5 from '../assest/banner/img5.webp';
// images for the mobile edition
import image_mobile1 from '../assest/banner/img1_mobile.jpg';
import image_mobile2 from '../assest/banner/img2_mobile.webp';
import image_mobile3 from '../assest/banner/img3_mobile.jpg';
import image_mobile4 from '../assest/banner/img4_mobile.jpg';
import image_mobile5 from '../assest/banner/img5_mobile.png';

import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
const desktopImages=[
  image1,
  image2,
  image3,
  image4,
  image5


]
const mobileImages=[
  image_mobile1,
  image_mobile2,
  image_mobile3,
  image_mobile4,
  image_mobile5,



]
const BannerProduct = () => {
  //this state is used to scroll  banner images automatically 
  const [currentImage,setCurrentImage]=useState(0);

  // console.log("currentImage=" + currentImage);
 
  // nextImage in the banner
  const nextImage=()=>{
    if(desktopImages.length-1>currentImage){
      setCurrentImage(pre=>pre+1)
    }
  }

    // prevImage in the banner
    const prevImage=()=>{
      if(currentImage!==0){
        setCurrentImage(pre=>pre-1)
      }
    }
  useEffect(()=>{
    // this is for scroll banner images automatically by certain amount of time
    const interval=setInterval(()=>{
      if(desktopImages.length-1>currentImage){
        nextImage();
      }else{
        setCurrentImage(0)
      }
      

    },5000)
    return ()=>clearInterval(interval);
  },[currentImage])
   
  return (
    <div className='  '>
       <div className='h-60 md:h-72  bg-white  mx-10 my-2 rounded relative'>
       <div className='absolute z-10 h-full w-full flex items-center'>
       <div className='hidden md:flex  justify-between w-full text-2xl  '>
       {/* previous button */}
         <button className='bg-white rounded-full shadow-2xl p-1' onClick={prevImage} ><FaAngleLeft /></button>
         {/* next button */}
         <button className='bg-white rounded-full shadow-2xl p-1' onClick={nextImage}><FaAngleRight /></button>
       </div>
    



       </div>
              {/* desktop and tablet edition */}
        <div className='hidden md:flex h-full w-full  overflow-hidden'>
        {
        desktopImages.map((imageURL,index)=>{
          return(
            <div className='h-full w-full min-h-full min-w-full transition-all' key={index} style={{transform:`translateX(-${currentImage*100}%)`}}>
            <img src={imageURL} alt="im-1" className='h-full w-full '/>
          </div>

          )
        })
       }
        </div>
          {/* mobile editionedition */}
               <div className='flex h-full w-full overflow-hidden md:hidden'>
        {
          mobileImages.map((imageURL,index)=>{
          return(
            <div className='h-full w-full min-h-full min-w-full transition-all' key={index} style={{transform:`translateX(-${currentImage*100}%)`}}>
            <img src={imageURL} alt="im-1" className='h-full w-full  '/>
          </div>

          )
        })
       }
        </div>
     
         
       </div>
    </div>
  )
}

export default BannerProduct
