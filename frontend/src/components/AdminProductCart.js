import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import AdminEditproduct from './AdminEditproduct';
import DeleteProduct from './DeleteProduct';
import DisplayFullProductImage from './DisplayFullProductImage';
import DisplayIndianCurrenct from '../healpers/DisplayIndianCurrency';

const AdminProductCart = ({
    data,
    getting_all_products_fetch
}) => {

  // edit state
 const[editEnable,setEditEnable] =useState(false);
//  console.log("editEnable",editEnable);

// delete state
 const [enableDelete,setEnableDelete] = useState(false);
//  console.log("enabledelete",enableDelete);
// full image state
 const [enableFullImage,setEnableFullImage]=useState(false);
  //  image url
  const [fullScreenImage,setFullScreenImage] = useState("");
  return (
    <div>
      <div className='bg-white p-4 rounded  '>
         
             <div  className='flex justify-center items-center p-5 h-48  '>
              <img src={data?.productImage[0] } height={150} width={150} alt={data._id} className='hover:scale-125 cursor-pointer h-28 w-36 object-scale-down' onClick={()=>{
                setEnableFullImage(true)
                setFullScreenImage(data?.productImage[0]);
              
              
              }} />
             </div>
             <div>
              <div className='justify-center flex items-center'>
              <h2 className='justify-center flex items-center single-line'>{data.productName}</h2>

              </div>
              
              
             
             <p className='justify-center flex font-semibold'>{DisplayIndianCurrenct(data.sellingPrice)}</p>


             </div>
             {/* edit button and delete button */}
           <div className='mt-2'>
           <div className='flex items-center justify-center gap-5'  >
                {/* edit button */}
                <div onClick={()=>{
                    // console.log("edit button is clicked");
                    setEditEnable(true);
                }}>
                {/* delete button */}
                
                <MdModeEditOutline className='text-xl bg-sky-200 cursor-pointer  hover:bg-sky-400 rounded-full  hover:scale-125 hover:text-white' />
                

                </div>
                <div onClick={()=>{setEnableDelete(true)}}>
                {/* delete button */}
                <MdDelete className='text-xl hover:text-white bg-sky-200 cursor-pointer  hover:bg-sky-400 rounded-full   hover:scale-125' onClick={()=>{
                    // console.log("delete button is clicked");
                }}/>
                </div>
                
             </div>
           </div>
            {/* edit product component */}
             
             {
              editEnable && <AdminEditproduct onClose={()=>{setEditEnable(false)}} productData={data} fetch_data={getting_all_products_fetch}/>
             }
             {/* delete the product component */}
             {
              enableDelete && <DeleteProduct onClose={()=>{setEnableDelete(false)}} productData={data} fetch_data={getting_all_products_fetch}/>
             }
             {/* display full product image */}
             {
              enableFullImage && <DisplayFullProductImage onClose={()=>{setEnableFullImage(false)}} imgURL={fullScreenImage}/>
             }
            </div>
          
    </div>
  )
}

export default AdminProductCart
