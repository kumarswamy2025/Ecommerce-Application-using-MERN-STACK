import React, { useState } from 'react'
import ROLE from '../API_urls/role'
import { IoCloseCircle } from "react-icons/io5";
import Apis from '../API_urls/API_urls';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    onClose,
    _id,
    calling_fetch_allUserFunction,
  }) => {
    const [userRole,setUserRole]=useState(role);
    // console.log("change user role--->user id:",_id);
    const handle_change_role=(result)=>{
        // console.log(result.target.value);
        setUserRole(result.target.value);

    }
    
    const updateUserRole= async()=>{
      const fetchData= await fetch(Apis.update_user_role.API,{
        method:Apis.update_user_role.method,
        "credentials":"include",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          userid:_id,
          role:userRole,
          name:name,
          email:email
        })
      })
      const fetchDataResponse=await fetchData.json();
      console.log("update user role:",fetchDataResponse);
      // if role is updated sucessfully then update role pop will close and it will return sucessfull message
      if(fetchDataResponse.success) {
        toast.success(fetchDataResponse.message);
        onClose();
        calling_fetch_allUserFunction();
      }
      // if role is updated fail then update role pop will not  close and it will return error message

      if(fetchDataResponse.error) {
        toast.error(fetchDataResponse.message);
        // onClose();
      }
      // console.log('fetchDataResponse:',fetchDataResponse);


    }
  return (
    <div className='   w-full h-full fixed top-0 left-0 bottom-0 right-0 flex items-center  justify-between  z-10 bg-slate-200 bg-opacity-40'>
    <div className='mx-auto w-full max-w-sm p-4 bg-white shadow-md'>
      {/* close button */}
        <button className='block ml-auto text-2xl hover:scale-150  ' onClick={onClose}>
        <IoCloseCircle />
        </button>
       <h1 className='font-bold justify-center flex text-2xl italic underline-offset-8	underline capitalize pb-5 '>change user role </h1>
       {/* name */}
       <p className="pb-2 text-lg">Name:{name}</p>
       {/* email */}
       <p className="pb-2 text-lg">Email:{email}</p>
       {/* role */}
       <div className="flex gap-3 pt-2">
       <p className="pb-2 text-lg">Role:</p>
       <select className=' border-black border-solid rounded-lg px-1 py-1 border-2 hover:border-sky-400' value={userRole} onChange={handle_change_role}>
          {
            Object.values(ROLE).map(el=>{
                return(
                    <option value={el} key={el}>{el}</option>

                )
            })
          }
       </select>
       </div>
       {/* button */}
      <div  className="flex justify-center pt-5">
      <button className='w-full cursor-pointer mx-auto block rounded-full border-2 bg-sky-400 hover:text-white hover:scale-110' onClick={updateUserRole}>Change Role </button>

      </div>
    </div>
  
    </div>
  )
}

export default ChangeUserRole
