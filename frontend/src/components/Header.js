import React, { useContext, useState } from 'react';
import Logo from './Logo';
import { FaSearch } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { BsCartFill } from "react-icons/bs";
import {Link, useLocation} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import Apis from '../API_urls/API_urls';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import { useNavigate  } from 'react-router-dom';
import ROLE from '../API_urls/role';
import Context from '../context';


const Header = () => {
    //  dispatch the setUserDetails
     const dispatch=useDispatch();
  const user=useSelector(state=>state?.user?.user);
  // console.log("user header:",user);

  // useNavigate() is used to navigate to the particular page
  const  navigate = useNavigate ();
  const HandleLogout=async ()=>{
    
    const fetchData=await fetch(Apis.logout_user_API.API,{
      method:Apis.logout_user_API.method,
      credentials:"include"
    })
     const datar=await fetchData.json();
   
     if(datar.success){
      toast.success(datar.message);
      dispatch(setUserDetails(null));
    // this is navigated to the login page when the user is loggedout 
      navigate('/login');
      setDisplayMenu(false)

     }
     if(datar.error){
      toast.error(datar.message);


     }

  }
  // display menu items state 
  const [displayMenu,setDisplayMenu]=useState(false);

  // console.log("displayMenu: " + displayMenu);

   // taking search query
   const searchInput=useLocation();
  //  console.log("searchInput",searchInput?.search?.split("=")[1]);

  const URLSearch=new URLSearchParams(searchInput?.search);
  const querySearch=URLSearch.getAll("q")

  // setting search state
  const [search,setSearch]=useState(querySearch);
  
 




  // taking cartcouint from useContext() hook
  const context=useContext(Context);
  // console.log("header:",context);
//  handel on search
 const handleOnSearch=(e)=>{
  const {value}=e.target
  // console.log("handleOnSearch is called....")
  // console.log("value",value);
  setSearch(value)
  if(value){
    navigate(`/search?q=${value}`)
  }
  else{
    navigate("/search")
  }

 }

  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className='h-full flex items-center  container mx-auto  px-6 justify-between'>
        {/* logo */}
      <div >
        {/* when clicking on logo it will render home page */}
        <Link to={'/'}>
        <Logo h={90} w={90}></Logo>
        </Link>
    
      </div>
      {/* search */}
      {/* hiddern the search for mobile version if possible here i am not hiding */}
      {/* hiding property  ==>hiddern:lg */}
      <div className='  hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-0.5 '>
        <input type="text" className='w-96 h-10 rounded-l-full pl-5 border-4 border-slate-200 hover:outline-black ' placeholder='Search for  products,Brands and  More ' onChange={handleOnSearch} value={search} onKeyPress={handleOnSearch}/>
        <div className='text-3xl bg-sky-500	w-10 h-10 flex items-center  rounded-r-full text-black pl-1' onKeyPress={handleOnSearch}>
        <FaSearch />
        </div>
        
      
      </div>
   

      {/* user icon and cart icon */}
      <div className='flex items-center gap-10  '>
        {/* user icon */}
       <div className='relative  flex justify-center'>
       <div className='text-3xl cursor-pointer'>
          {
            // here i am useing ternary operator
            user?.profilepic?<img src={user?.profilepic} alt={user?.name} className='h-10 w-10 rounded-full' onClick={()=>setDisplayMenu(prev=>!prev)}/>:(user?._id ? <FaUserLarge  onClick={()=>setDisplayMenu(prev=>!prev)}/> :<FaUserLarge/> )
            

          }
         

        </div>
        {
            // menu bar when user click on the user profile 
          displayMenu && (  user?.role===ROLE.ADMIN &&(<div className='absolute bg-white  bottom-0 top-11 h-fit p-2 shadow-lg rounded-lg'>
            <nav >
              <Link to={"/admin-panel/all-products"} className='whitespace-nowrap  hover:bg-slate-200' onClick={()=>setDisplayMenu(prev=>!prev)}>Admin Panel</Link>  
            </nav> 
          </div>)
            
          )
        }
       
       
       </div>
        {/* cart icon */}
        {/* relative property used to relate the card and card count */}
        {
          //if user logined then display cart image
          // user._id &&
        }
        <div className=' text-3xl  relative'>
        {
          user?._id?(
            <Link to={"/cart"}>
               <span> <BsCartFill/></span>

            </Link>
           
          ):(
            <span> <BsCartFill/></span>
          )
        }
         
         {/* absolute property used to link the relative property */}
          {
            user?._id?(
              <div className=" bg-sky-500	 rounded-full flex justify-center absolute text-xl -top-2.5 -right-1.5 w-fit">
          <p>{context?.count}</p>
         </div>
            ):(
              <div className=" bg-sky-500	 rounded-full flex justify-center absolute text-xl -top-2.5 -right-1.5 w-fit">
          <p>0</p>
         </div>
            )
          }
         
          

        </div>
        <div>
          {/* here i am using ternary operator   */}
          {
            user?._id?(<button onClick={HandleLogout} className='bg-sky-500 text-xl w-20 rounded-full justify-center'>logout</button>):(<Link to={'login'}>
              <button className='bg-sky-500 text-xl w-20 rounded-full justify-center'>Login</button>
              </Link>)
          }
         
          {/* when clicking on login button it will render the login page */}
          
          
        </div>
      </div>
      </div>


    </header>
  )
}

export default Header
