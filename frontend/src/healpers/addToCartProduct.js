import { toast } from "react-toastify";
import Apis from "../API_urls/API_urls";

const addToCartProduct=async (e,id)=>{
    e?.stopPropagation();
    e?.preventDefault();
    const response=await fetch(Apis.addToCart.API,{
        method:Apis.addToCart.method,
        credentials:"include",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            productId:id
        })
    })
    const responseData=await response.json();
    if(responseData.success){
        toast.success(responseData.message)
    }
    if(responseData.error){
        toast.error(responseData.message)
    }
    return responseData;


}

export default addToCartProduct