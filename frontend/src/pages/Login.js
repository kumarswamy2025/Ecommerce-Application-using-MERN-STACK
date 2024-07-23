import React, { useContext, useState } from 'react';
import signin from '../assest/signin.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate  } from 'react-router-dom';
import Apis from '../API_urls/API_urls';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
  // this state is used to see and hide password in password field
  let[password,setPassword]=useState(false);

  // using navigate hook here
  const navigate=useNavigate();
// context data 
  const {fetchUserDetails,fetchUserCartcount}=useContext(Context);
  // console.log("fetchUserDetails:",fetchUserDetails());


  // this state is used to store the email and password 
  let [data,setData]=useState({
    email:"",
    password:""
  })
  // console.log(data);
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
  let handleSubmit=async(res)=>{
    // preventDefault()  method is predefined method in browser
    res.preventDefault()
    // alert('data is submited please wait...')
    // here data is posting
    const fetch_Data= await fetch(Apis.signIn_API.API,{
      method:Apis.signIn_API.method,
        // credential is used to save session information in browser
      credentials:"include",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify(data)

    
    })
    const response= await fetch_Data.json();
    if(response.success){
      toast.success(response.message);
     
      navigate("/");
     //fetch user details if user is sucessfully logged in
     fetchUserDetails();
     fetchUserCartcount();

    }
    if(response.error){
      toast.error(response.message)


    }

  }
  return (
    <>
    <section id='login'>
      <div className='mx-auto container  p-5 '>
       <div className='bg-white p-5 py-5 w-full max-w-md mx-auto  ' >
        {/* user icom */}
       <div className='w-20 h-15 mx-auto'>
       <img src={signin} alt='user icon'/>
       </div>
       {/* form tag */}
       <form className='mt-2 flex flex-col gap-6' onSubmit={handleSubmit}>
       <div>
        <label>Email:</label>
        <div className='bg-zinc-300	p-2'>
        <input type="email" className='w-full h-full outline-none  bg-transparent' name='email' value={data.email} onChange={handleOnChange} placeholder='Enter Email'/>

        </div>
        
       </div>
       <div>
        <label>Password:</label>
        <div className='bg-zinc-300	 p-2 flex'>
        <input type={password?"text":"password"} name='password' value={data.password} onChange={handleOnChange} className='w-full h-full outline-none bg-transparent ' placeholder='Enter Password' />
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
       <div className='flex justify-end mt-1 hover:underline  hover:text-rose-700 '>
        <Link to={'/forgot-password'}>
      
       <p>forgot password ?</p></Link>
       </div>
       <span className='flex justify-center'>
       <button className="bg-sky-500 text-cyan-100 text-xl  px-5 py-2 rounded-full mt-1 hover:scale-150 font-bold hover:bg-sky-400">Login</button>

       </span>
       
       </form>

      <div className='mt-5'>
        <p>Don't have  account ? 
          <Link to={'/singup'} className='hover:text-red-600 hover:underline text-sky-600 '> Sing up</Link>


        </p>
      </div>
       </div>

      </div>


    </section>
    </>
  )
}

export default Login
