import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../healpers/ProductCategory';
import VerticalCard from '../components/VerticalCard';
import Apis from '../API_urls/API_urls';

const CategoryProduct = () => {
    const params=useParams();
    // console.log("Category Product:",params.categoryName);
    // params.categoryName
    const navigate=useNavigate()



    const [data,setData]=useState([]);
    // console.log("data",data);
    const[loading,setLoading]=useState(false);
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el =>{
      urlCategoryListObject[el] = true
    })
    
    // sorting state
    const [sortBy,setSortBy]=useState("");

    // console.log("sortBy",sortBy);
      // setting felter list
      const [filterCategoryList,setFilterCategoryList]=useState([])
    // fetch function
    const fetchData=async()=>{
      const response=await fetch(Apis.filter_product.API,{
        method:Apis.filter_product.method,
        credentials:"include",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({
          category:filterCategoryList
        })
      });
      const dataResponse=await response.json();
      setData(dataResponse?.data||[])
      // console.log("dataResponse?.data",dataResponse?.data);
    }
  
    // setting  selecting category
    const [selectCategory,setSelectCategory]=useState(urlCategoryListObject);

    const handleSelectCategory=(e)=>{
      const {name,value,checked}=e.target;
      // console.log("name:",name,"value",value,"checked",checked );
      // console.log(e.target);
      setSelectCategory((preve)=>{
        return{
          ...preve,
          [value]:checked
        }

      })


    }
    // console.log("selectCategory:",selectCategory);

    // handleing sorting price
    const handleOnChangeSort=(e)=>{
      const {value}=e.target;
      setSortBy(value);
      if(value === "asc"){
        setData(prev=>prev.sort((a,b)=>a.sellingPrice-b.sellingPrice))
      }
      if(value === "dsc"){
        setData(prev=>prev.sort((a,b)=>b.sellingPrice-a.sellingPrice))
      }
    }

    useEffect(()=>{
      fetchData();
    },[filterCategoryList])



    useEffect(()=>{
      const arrayOfCategory=Object.keys(selectCategory).map((categoryKeyName)=>{
        if(selectCategory[categoryKeyName]){
          return categoryKeyName
        }
        return null

      }).filter(element=>element);
// console.log("arrayOfCategory:",arrayOfCategory);
       setFilterCategoryList(arrayOfCategory)


       const urlFormat = arrayOfCategory.map((el,index) => {
        if((arrayOfCategory.length - 1 ) === index  ){
          return `category=${el}`
        }
        return `category=${el}&&`
      })

       navigate("/category-product?"+urlFormat.join(""))

    },[selectCategory])


    useEffect(()=>{

    },[sortBy])

  return (
    <div className='ml-10 mt-10 mr-10 mb-10'>
      {/* desktop version */}
      <div className='hidden md:grid grid-cols-[250px,1fr] gap-10 '>
        {/* left side */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll  scrollbar-none'>
          {/* sort by price  */}
          <div>
            <h3 className='uppercase text-base font-medium text-slate-500 border-slate-300  border-b-2 '>sort by</h3>
            
            <form className='text-lg flex  flex-col  gap-2 py-2'>
              {/* low to high */}
              <div className=''>
              <label className='capitalize cursor-pointer flex items-center gap-3'>  
               <input type="radio" name='sortBy'checked={sortBy === "asc"}  value={"asc"} onChange={handleOnChangeSort} />
               price - low to high</label>
              </div>

              {/* high to low */}

              <div className=''>
              <label className='capitalize cursor-pointer  flex items-center gap-3'>
                 <input type="radio" name='sortBy' checked={sortBy === "dsc"} value={"dsc"}  onChange={handleOnChangeSort}/>
                 price - high to low  </label>
              </div>

            </form>


          </div>
          {/* sort by category wise */}
          <div>
            <h3 className='uppercase text-base font-medium text-slate-500 border-slate-300  border-b-2 '>Category</h3>
            
            <form className='text-lg flex  flex-col  gap-2 py-2'>

              {
                productCategory.map((category,index)=>{

                  return(
                    <div className='flex items-center gap-3 ' key={index}>
                      <input type="checkbox" name={"category"} checked={selectCategory[category?.value]} value={category?.value} id={category?.value}  onChange={handleSelectCategory}/>
                      <label htmlFor={category?.value} className='cursor-pointer'>{category?.label}</label>
                    </div>
                  )


                })

              }

            </form>


          </div>


        </div>
        {/* right side */}
        <div className='lg:px-[50px] px-[10px]  '>
          <p className='font-medium  text-slate-800  text-lg my-2 capitalize'>search result:{data.length}</p>
          <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)] '>
          {
            data.length!==0 && !loading &&(
              <VerticalCard data={data}  loading={loading}/>
            )
          }
          </div>
        
        </div>

      </div>
    
    </div>
  )
}

export default CategoryProduct
