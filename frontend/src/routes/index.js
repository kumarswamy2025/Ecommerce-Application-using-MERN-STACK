import {createBrowserRouter} from 'react-router-dom';
import App from '../App'
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import Signup from '../pages/Signup';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import AllProducts from '../pages/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Search from '../pages/Search';
var route= createBrowserRouter([
    // creating browser routes
    {
        // this is path-1
        // this is main main 
        path:'/',
        element:<App/>,
        // child routes-1
        children:[
            {
                path:'',
                element:<Home></Home>
            },
            // this is child routes-2
            // this child route in render inside  the main component
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'forgot-password',
                element:<ForgotPassword/>
            },
            {
                path:'singup',
                element:<Signup></Signup>

            },
            {
                path:'admin-panel',
                element:<AdminPanel/>,
                // child routes for admin panel 
                children:[
                    {
                        path:'all-user',
                        element:<AllUsers/>
                    },
                    {
                        path:'all-products',
                        element:<AllProducts/>
                        
                    }
                ]

            },
            {
                path:'category-product',
                element:<CategoryProduct/>

            },
            
            {
                path:'product/:id',
                element:<ProductDetails/>

            },
            {
                path:'cart',
                element:<Cart/>

            },
            {
                path:'search',
                element:<Search/>

            }

           
            

        ]

    }
    
])


export default route;