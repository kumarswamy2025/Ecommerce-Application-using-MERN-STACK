import React from 'react'
import { useSelector } from 'react-redux';
import { FaUserLarge } from "react-icons/fa6";
import { Link, Outlet } from 'react-router-dom';

const AdminPanel = () => {
  const user=useSelector(state=>state?.user?.user);
  return (
    <div className=' min-h-[calc(100vh-120px)] flex'>
      <aside className='bg-slate-50   min-h-full w-full max-w-60 shadow-2xl'>
        {/* profile image  */}
        <div className='flex justify-center pt-8 pr-5 bg-sky-400 h-40  items-center flex-col '>
        <div className='text-5xl  '>
          {
            // here i am useing ternary operator
            user?.profilepic?<img src={user?.profilepic} alt={user?.name} className='h-20 w-20 rounded-full ' />: <FaUserLarge/>
            

          }
         

        </div>
        {/* user name */}
        <p className='font-serif	text-lg  capitalize font-semibold'>{user?.name}</p>
        <p className='pb-2 text-sm'>{user?.role}</p>
        </div>
        {/* navigation bar */}
        <div>
          <nav className='grid    p-4 capitalize'>
            <Link to={"all-user"} className=' hover:bg-slate-200  p-4 flex justify-center hover:font-bold'>All users </Link>
            <Link to={"all-products"} className='p-4 hover:bg-slate-200 flex justify-center  hover:font-bold'>All Products </Link>
          
          </nav>
        </div>
       
        
        
        </aside>
      <main className='h-full w-full p-4'>
        <Outlet></Outlet>
      </main>
      
    </div>
   
  )
}

export default AdminPanel
