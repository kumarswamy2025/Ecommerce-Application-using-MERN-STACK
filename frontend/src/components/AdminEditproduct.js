import React, {  useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import productCategory from '../healpers/ProductCategory';
import { IoMdCloudUpload } from "react-icons/io";
import UploadImages from '../healpers/UploadImages';
import { IoMdClose } from "react-icons/io";
import DisplayFullProductImage from './DisplayFullProductImage';
import Apis from '../API_urls/API_urls';
import { toast } from 'react-toastify';

const AdminEditproduct = (
    {
        onClose,
        productData,
        fetch_data

      
       
    }) =>  {
        const [data,setData]=useState({
          ...productData,
          productName:productData.productName,
          brandName:productData.brandName,
          category:productData.category,
          productImage:productData.productImage,
          description:productData.description,
          price:productData.price,
          sellingPrice:productData.sellingPrice
      
        });
        // console.log("upload products data: ",data);
      //  full screen url state
      const [fullScreenImage,setFullScreenImage] = useState("");
      
      // open full screen image state
      const [openFullScreenImage,setopenFullScreenImage] = useState(false)
      
      // update the UploadProducts state data
        const handleOnChange=(e)=>{
          const {name,value} = e.target;
          setData((prev)=>{
            return{
              ...prev,
              [name]: value
            }
      
          })
      
        }
      
        // handling uploded images to selete and delete
         
        const handleDeleteProductImage=async(index)=>{
          // console.log("index of image:",index);
          const newProductImage = [...data.productImage];
          newProductImage.splice(index, 1);
      
          setData((prev)=>{
            return{
              ...prev,
              productImage:[...newProductImage]
            }
              
            
      
          })
      
      
      
        }
        const handleUploadProduct=async(e)=>{
          
          const file=e.target.files;
          const uploadImageStack = [];
      
          // Iterate over each file and create an upload promise
          for (let i = 0; i < file.length; i++) {
            const files = file[i];
            uploadImageStack.push(UploadImages(files));
          }
      
      
      
          // setUploadProductImage(file.name);
           // Wait for all uploads to complete
          const  uploadImageCloudinaryArray=await Promise.all(uploadImageStack);
          // console.log("uploadImageCloudinary:",uploadImageCloudinary);
          // console.log("uploadImageCloudinary url:",uploadImageCloudinary.url);
          // Extract URLs from the upload responses
        const uploadedUrls = uploadImageCloudinaryArray.map(upload => upload.url);
          
          setData((prev)=>{
            return{
              ...prev,
              productImage:[...prev.productImage,...uploadedUrls]
            }
              
            
      
          })
            
          
      
      
        }
        //  console.log("upload product image file name :",uploadProductImage);
        // handling the submit button
        const handleOnSubmit =async(e)=>{
          e.preventDefault();
          // console.log("data:",data);
          const API_data= await fetch(Apis.update_product.API,{
            method:Apis.update_product.method,
            credentials:"include",
            headers:{
              "Content-Type": "application/json",
            },
            body:JSON.stringify(data)
      
      
          })
          const response= await API_data.json();
          console.log("response: " +response );
      
          if(response.success) {
            toast.success(response.message);
            onClose();
            fetch_data()
         
            
          }
          
          if(response.error) {
            toast.error(response.message);
            // toast.error("kumar swamy error")
          }
      
        }
    return (
        <div className='h-full w-full bg-slate-200 top-0 bottom-0 left-0 right-0 fixed bg-opacity-35 justify-center flex items-center'>
          <div className="bg-white p-4 w-full rounded max-w-2xl h-full max-h-[80%] overflow-y-scroll  custom-scrollbar">
            <div className='flex justify-center  '>
            <h2 className='font-bold capitalize text-xl fi'> Edit product details </h2>
            {/* close button */}
            <div className='w-fit ml-auto  text-2xl hover:bg-black hover:text-white  hover:rounded-full justify-center flex items-center cursor-pointer' onClick={onClose}>
                 <IoCloseOutline/>
            </div>
            </div>
            
            {/* write here the remaing required fields */}
             <div >
                <form  onSubmit={handleOnSubmit} >
                  {/* product name */}
                  <div className='grid p-4 gap-2 hover:scale-105'>
                  <label htmlFor='product_Name' className='capitalize font-semibold '>product name:</label>
                 <input type="text" className='bg-slate-100 border-2 p-1 rounded border-sky-400 hover:border-black hover:scale-105' id='product_Name' name='productName' placeholder='Enter Product Name' value={data.productName} onChange={handleOnChange} required />
                 </div>
                 {/* brand name */}
                 <div className='grid p-4 gap-2 hover:scale-105'>
                 <label htmlFor='brand_Name' className='capitalize font-semibold'>brand name:</label>
                 <input required type="text" className='bg-slate-100 border-2 p-1 rounded border-sky-400 hover:border-black hover:scale-105' id='brand_Name' name='brandName' placeholder='Enter Brand Name' value={data.brandName} onChange={handleOnChange} />
                 </div>
    
                 {/* category */}
                 <div className='grid p-4 gap-2 hover:scale-105 '>
                 <label htmlFor='category_Name' className='capitalize font-semibold'>category:</label>
                 <select required value={data.category} name='category' className='bg-slate-100 border-2 p-1 rounded border-sky-400 hover:border-black hover:scale-105' onChange={handleOnChange}>
                 <option value={""} >Select Category</option>
                  {
                    productCategory.map((el,index)=>{
                      // console.log(index);
    
                      return (
                        <option value={el.value} key={el.value+index} >{el.label}</option>
                      )
                    })
    
    
    
    
                  }
                  
     
    
                 </select>
    
    
                 </div>
    
                 {/* productImage */}
                 <div className='grid p-4 gap-2 '>
                  <div className='hover:scale-105'>
                 <label htmlFor='product_Image' className='capitalize font-semibold '>product Image:</label>
                 {/* upload button */}
                 <label htmlFor='upload_image_input'>
                 <div className='h-52 w-full bg-slate-200  cursor-pointer' >
                  <div className='flex items-center flex-col justify-center pt-10'>
                     {/* upload icon */}
                     
                     <span className='text-7xl'><IoMdCloudUpload  /></span>
                     <p className='capitalize'>Upload procuct images</p>
                     <input  type="file" multiple id='upload_image_input' className='hidden'  onChange={handleUploadProduct} />
                  </div>
    
                 </div>
                 </label>
                 </div>
                 {/* uploded images */}
                 <div className="pt-5">
                  {
                    // ternary operator 
                    data?.productImage && data?.productImage.length>0?(
                      <div className='grid grid-cols-5 gap-2 '>
                        {
                           data?.productImage.map((el,index)=>{
                            // console.log("index ",index); 
                            return(
                             <div className='relative group:' key={index}>
    
                                    <img src={el} alt={el} key={index} height={100} width={100} className={`bg-slate-200 hover:none ${index <data?.productImage.length ? 'col-span-1' : 'col-span-2'} cursor-pointer`} onClick={()=>{
                                      setopenFullScreenImage(true);
                                      setFullScreenImage(el);
                                    }}
                              />
                              <div>
                                {/* here we take function */}
                              <IoMdClose className='absolute top-0  right-3 text-lg hover:scale-125 cursor-pointer bg-sky-400 rounded-full  ' onClick={()=>{handleDeleteProductImage(index)}}/>
                              </div>
                             </div>
    
                            )
                            
                        
        
                          })
    
                        }
                      </div>
    
                     
    
    
                    ):(
                      <p className='font-bold capitalize'>*please upload images </p>
                    )
                  }
    
                 </div>
                 
    
    
    
    
                 </div>
                 {/* price */}
                 <div className='grid p-4 gap-2 hover:scale-105'>
                 <label htmlFor='price_value' className='capitalize font-semibold'>price:</label>
                 <input required type="number" className='bg-slate-100 border-2 p-1 rounded border-sky-400 hover:border-black hover:scale-105 Hide-Arrows-From-Input-Number ' id='price_value' name='price' placeholder='Enter Price' value={data.price} onChange={handleOnChange} />
                 </div>
    
                 {/* selling_price */}
                 <div className='grid p-4 gap-2 hover:scale-105'>
                 <label htmlFor='selling_price' className='capitalize font-semibold'>selling price:</label>
                 <input required type="number" className='bg-slate-100 border-2 p-1 rounded border-sky-400 hover:border-black hover:scale-105 Hide-Arrows-From-Input-Number ' id='selling_price' name='sellingPrice' placeholder='Enter Selling Price' value={data.sellingPrice} onChange={handleOnChange} />
                 </div>
    
    
    
    
    
                 {/* description */}
                 <div className='grid p-4 gap-2 hover:scale-105'>
                 <label htmlFor='selling_price' className='capitalize font-semibold'>product description:</label>
                 <textarea required className='h-28 bg-slate-100 resize-none p-2' name='description' value={data.description} onChange={handleOnChange} placeholder='Enter Product Description'>
    
                 </textarea>
    
    
    
                 </div>
    
    
                 
    
                 
    
                 {/* submit button */}
                 <div className='bg-sky-400 rounded-full p-2 mt-5 mb-5 justify-center flex hover:bg-sky-600'>
                  <button className='w-full capitalize italic font-medium		'>Update product details</button>
                 </div>
    
               </form>
             </div>
          </div>
          {/* display  product image   in full screen*/}
          {
            openFullScreenImage&& <DisplayFullProductImage imgURL={fullScreenImage} onClose={()=>{setopenFullScreenImage(false)}}></DisplayFullProductImage>
          }
           
    
        </div>
      )
}

export default AdminEditproduct
