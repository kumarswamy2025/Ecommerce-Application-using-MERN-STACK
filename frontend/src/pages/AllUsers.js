import React, { useEffect, useState } from 'react'
import Apis from '../API_urls/API_urls'
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdOutlineModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
  const [allUsers,setAllUsers]=useState([]);
  const [openUpdateRole,setOpenUpdateRole] =useState(false);
  const [updateUserDetails,setUpdateUserDetails]=useState();
  // console.log("update user details:",updateUserDetails);
  // console.log("update user role:",openUpdateRole);
  const AllUser_response=async ()=>{
    const User_data= await fetch(Apis.All_users_API.API,{
      method:Apis.All_users_API.method,
      credentials:"include"
    });
     const User_data_Response= await  User_data.json();
    //  console.log("front end side all user data updated at :",User_data_Response);
     if(User_data_Response.success){
      setAllUsers(User_data_Response.data)

     }
     if(User_data_Response.error){
      toast.error(User_data_Response.message);

     }

  }
  useEffect(()=>{
    AllUser_response();

  },[])
  
  return (
    <div>
        <table className=' outline border-black w-full'>

        <caption className="caption-top  underline-offset-8 underline h-10 pt-1 font-bold">
           All Users Details
       </caption>
          {/* table heading */}
          
  <thead>
    <tr className='outline border border-black '>
      <th className='  p-2  border-r-4 border-black'>Sr.</th>
      <th className='border-r-4 p-2 border border-black'>Name</th>
      <th className=' p-2 border-r-4 border border-black'>Email</th>
      <th className='border border-r-4 border-black  p-2'>Role</th>
      <th className='border border-black p-2 border-r-4'>CreatedAt</th>
      <th className='border border-black p-2  '>Action</th>

    </tr>
  </thead>
  {/* table body */}
  <tbody>
    {
      allUsers.map((el,index)=>{
        return (
          <tr className='hover:bg-white' key={el._id}>
             <td className='  p-2 outline border border-black'>{index+1}</td>
             <td className='outline border border-black p-2'>{el?.name}</td>
             <td className='outline border border-black p-2'>{el?.email}</td>
             <td className='outline border border-black p-2'>{el?.role}</td>
             <td className='outline border border-black p-2'>{moment(el?.createdAt).format("LLLL")}</td>
             {/* Action button */}
             <td className='outline border border-black pl-10 '>
              <button className='cursor-pointer hover:bg-sky-400 text-2xl rounded-full hover:text-white ' onClick={()=>{
                setOpenUpdateRole(true);
                setUpdateUserDetails(el)
              }
                
                }>
              <MdOutlineModeEdit />
              </button>
             </td>

             
          </tr>
          
        )
      })
      
    }
    
   
  </tbody>
</table>
{
  openUpdateRole && (<ChangeUserRole onClose={()=>setOpenUpdateRole(false)} {...updateUserDetails} calling_fetch_allUserFunction={AllUser_response}/>)
}

      
    </div>
  )
}

export default AllUsers
