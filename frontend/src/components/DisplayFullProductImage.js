import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'

const DisplayFullProductImage = (
    {
        imgURL,
        onClose

    }
) => {
  return (
   <div className='fixed top-0 bottom-0 left-0 right-0 mx-auto flex justify-center items-center '>
    <div className='bg-white shadow-lg  rounded  max-w-5xl mx-auto '>
    <div className='w-fit ml-auto  text-3xl hover:bg-sky-400 hover:text-black  hover:rounded-full justify-center flex items-center cursor-pointer ' onClick={onClose}>
             <IoCloseOutline/>
        </div>
       <div className='flex justify-center p-2 max-w-[80vh] max-h-[80vh]'>

         <img src={imgURL} alt="" className="w-full h-full "  />
      </div>
        
    </div>
     


   </div>

  )
}

export default DisplayFullProductImage
