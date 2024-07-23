import Apis from "../API_urls/API_urls"

const fetchCategoryWiseProduct=async (categoryName)=>{
    // console.log("categoryName",categoryName);
    const fetchDate= await fetch(Apis.categorywiseproduct.API,{
        method:Apis.categorywiseproduct.method,
        headers:{
            "content-type": "application/json"
        },
        body:JSON.stringify({
            category:categoryName


        })
    });
    const fetchDataResponse=await fetchDate.json();

    return fetchDataResponse;


}

export default fetchCategoryWiseProduct