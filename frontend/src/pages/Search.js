import { useLocation } from "react-router-dom";
import Apis from "../API_urls/API_urls";
import { useEffect, useState } from "react";
import VerticalCard from "../components/VerticalCard";

function Search(){
    const query=useLocation();
    // console.log("query",query.search.length);

    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    const fetchData=async()=>{
        setLoading(true)
        const Api=await fetch(Apis.search_products.API+query.search);
        const ApiResponse=await Api.json();
        // console.log("ApiResponse:",ApiResponse.data);
        setLoading(false);
        setData(ApiResponse.data)

    }
    useEffect(()=>{
        fetchData()
    },[query])
    return(
        <div className="ml-10 mt-5  mr-10">
        {
            loading && (
                <p className="capitalize text-lg text-center">loading.....</p>
            )
        }
        <p className="text-lg font-semibold my-3">search result:{data.length}</p>

        {
            data.length===0  && !loading  && (
                <p className="capitalize bg-white text-lg text-center  p-4">No data found</p>
            )
        }
        


        {
             data.length!==0 && !loading  &&(
                <VerticalCard loading={loading} data={data} />
                
             )
 
        }







        </div>
    )
}


export default Search;