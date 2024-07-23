import React from 'react';
import signin from '../assest/signin.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {  Link, useNavigate  } from 'react-router-dom';
import { useState } from 'react';
import ImageToBase64 from '../healpers/ImageToBase64';
import Apis from '../API_urls/API_urls';
import { toast } from 'react-toastify';

const Signup = () => {
   // this state is used to see and hide password in password field
   let[password,setPassword]=useState(false);
   let[conformpassword,setConformpassword]=useState(false);
// useNavigate is used to navigate to the specific website
   const navigate=useNavigate();


   // this state is used to store the email and password 
   let [data,setData]=useState({
     email:"",
     password:"",
     name:"",
     confirmPassword:"",
     profilepic:""
   })
  //  console.log(data);
   // this handleOnChange funtion is used to handle any change in email field and password field and   update in email  and password state 
   let handleOnChange=(e)=>{
     const {name,value}=e.target
     setData((prev)=>{
       return (
         {
           ...prev,
           [name]:value
         }
       )
     })
   }
   // this handlesubmit function is used to handle when form is submitted it automatically refreshes 
   // this function prevents auto refresh when  form is submitted 
   let handleSubmit=async (res)=>{
     // preventDefault()  method is predefined method in browser
     res.preventDefault()
     // alert('data is submited please wait...')
    //  we fetch operation is performeed here 
    // here we use post request
    
    if(data.password===data.confirmPassword){
      var dataResponse=await fetch(Apis.signUp_API.API,{
        method: "post",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify(data)

      });
      console.log("signup data",data);
       // response 
     const dataAPI=await dataResponse.json();
    //  console.log("data api:",dataAPI);
    if(dataAPI.success){
      toast.success(dataAPI.message);
      // navigate to login page when user is sucesssfully created otherwise it will not be navigated to the login page
      navigate("/login")
    }
    if(dataAPI.error){
      toast.error(dataAPI.message)
    }

    }else{
      // console.log('please check password and confirm password');
      toast.error("please check password and confirm password")
    }
  
   
   }
  //  this function is to upload profile pic
  // the main aim of this function is to convert image to base64 and update in user pic section
const handleProfilePic=async(e)=>{
  const imageData=e.target.files[0];
  const imagePic=await ImageToBase64(imageData);
  // printing the image base64 string here
  // console.log(data.profilepic);
  setData((prev)=>{
    return(
      {
        ...prev,
        profilepic:imagePic
      }
    )

  })
  


}
  return (
    <>
    <section id='login'>
      <div className='mx-auto container  p-5 '>
       <div className='bg-white p-5 py-5 w-full max-w-md mx-auto  ' >
        {/* user icom */}
       <div className='w-20 h-15 mx-auto  relative rounded-full overflow-hidden'>
      <div> <img src={data.profilepic||signin} alt='user icon'/></div>
      <form>
        <label>
        <div className='text-xs bg-slate-200 text-center absolute top-12 rounded-full cursor-pointer w-full bg-opacity-4.5 pt-0.3 h-5' >upload photo</div>
          <input type="file" className='hidden'  onChange={handleProfilePic}/>
        </label>
      </form>
       </div>
       {/* form tag */}
       <form className='mt-2 flex flex-col gap-6' onSubmit={handleSubmit}>
       <div>
        <label>Name:</label>
        <div className='bg-zinc-300	p-2'>
        <input type="text" className='w-full h-full outline-none  bg-transparent' required name='name' value={data.name} onChange={handleOnChange} placeholder='Enter Your Name'/>

        </div>
        
       </div>
       <div>
        <label>Email:</label>
        <div className='bg-zinc-300	p-2'>
        <input type="email" className='w-full h-full outline-none  bg-transparent' required name='email' value={data.email} onChange={handleOnChange} placeholder='Enter Email'/>

        </div>
        
       </div>

       <div>
        <label>Password:</label>
        <div className='bg-zinc-300	 p-2 flex'>
        <input type={password?"text":"password"} required name='password' value={data.password} onChange={handleOnChange} className='w-full h-full outline-none bg-transparent ' placeholder='Enter Password' />
        <div className='cursor-pointer text-2xl ' onClick={()=>{
          setPassword((prev)=>!prev)
        }}>
          <span>
            {
              password?<FaEyeSlash/>:  <FaEye/>
            }
            
          
          </span>
        </div>

        </div>
      
       </div>
       <div>
        <label>Confirm Password:</label>
        <div className='bg-zinc-300	 p-2 flex'>
        <input type={conformpassword?"text":"password"} required name='confirmPassword' value={data.confirmPassword} onChange={handleOnChange} className='w-full h-full outline-none bg-transparent ' placeholder='Enter confirm Password' />
        <div className='cursor-pointer text-2xl ' onClick={()=>{
          setConformpassword((prev)=>!prev)
        }}>
          <span>
            {
              conformpassword?<FaEyeSlash/>:  <FaEye/>
            }
            
          
          </span>
        </div>

        </div>
      
       </div>
       
       <span className='flex justify-center'>
       <button className="bg-sky-500 text-cyan-100 text-xl  px-5 py-2 rounded-full mt-1 hover:scale-150 font-bold hover:bg-sky-400">Sign up</button>

       </span>
       
       </form>

      <div className='mt-5'>
        <p>Already  have  account ? 
          <Link to={'/login'} className='hover:text-red-600 hover:underline text-sky-600 '>Login</Link>


        </p>
      </div>
       </div>

      </div>


    </section>
    </>
  )
}

export default Signup
