import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizentalCardComponent from '../components/HorizentalCardComponent'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizentalCardComponent category={"airpodes"} heading={"Top's Airpodes"}/>
      <HorizentalCardComponent category={"earphones"} heading={"popular earphones"}/>
      <VerticalCardProduct category={"mobiles"} heading={"popular mobiles"}/> 

      <VerticalCardProduct category={"Mouse"} heading={"Mouses"}/> 
      <VerticalCardProduct category={"camera"} heading={"camera"}/> 
      <VerticalCardProduct category={"printers"} heading={"printers"}/> 
      <VerticalCardProduct category={"processor"} heading={"processor"}/> 
      <VerticalCardProduct category={"refrigerator"} heading={"refrigerator"}/> 
      <VerticalCardProduct category={"speakers"} heading={"speakers"}/> 
      <VerticalCardProduct category={"televisions"} heading={"televisions"}/> 
      <VerticalCardProduct category={"trimmers"} heading={"trimmers"}/> 
      <VerticalCardProduct category={"watches"} heading={"watches"}/> 



    </div>
  )
}

export default Home
