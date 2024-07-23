import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Apis from './API_urls/API_urls';
import Context from "./context/index"
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
 
  //  dispatching the state data
  const dispatch=useDispatch();

  //  this state is used to tell count of cart
  const [count,setCount]=useState(0)
  
  var  fetchUserDetails= async ()=>{
    const Data_Response=await fetch(Apis.current_user_details_API.API,{
      method:Apis.current_user_details_API.method,
      // credentials:"include" is used to send cookies to backend 
      credentials:'include'
    })
   
    const DataApi=await Data_Response.json();
    // console.log("dataApi:",DataApi);
    if(DataApi.success){
      dispatch(setUserDetails(DataApi.data))

    }

  }

  // fetching userCartcount
  const fetchUserCartcount=async ()=>{
    const Data_Response=await fetch(Apis.getCartCount.API,{
      method:Apis.current_user_details_API.method,
      credentials:"include"
     
    })
   const  dataResponse=await Data_Response.json();
  //  console.log("dataResponse:",dataResponse.data?.count);
  // storing user cart data to state
  setCount(dataResponse.data?.count)

  }
   useEffect(()=>{
    // calling fetchuserDetails API
    fetchUserDetails();
     // calling fetchUserCartcount
     fetchUserCartcount();

  },[])
  return (
    <>
    <Context.Provider value={
      {
        fetchUserDetails, //user details is fetching
        count, //user cart count
        fetchUserCartcount  //user cart fetch function
      }
        }>
      
    
    
  <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"/>
    <Header></Header>
 {/* main tag */}
 {/* applying styles for child routes it shows where content to display */}
   <main className='min-h-[calc(100vh-120px)] pt-16'> 
      {/* outlet used to render multiple components in single component  */}
      <Outlet></Outlet>
  </main>
    <Footer></Footer>
    </Context.Provider>
    </>
  );
}

export default App;
