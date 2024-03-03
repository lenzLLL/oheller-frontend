import React from "react"
import HeroBanner from "@/components/HomeBanner"
import Compagnies from "@/components/Compagnies"
import PopularServices from "@/components/PopularServices"
import Services from "@/components/Services"
import FyverBusiness from "@/components/FyverBusiness"
import { useStateProvider } from "@/context/StateContext"


function Index(){
  
  return <div>
      <HeroBanner/> 
      <Compagnies/>
      <PopularServices/>
      <Everythings/>
      <Services/>
      <SwiperComponent2/>
      <FyverBusiness/>
      <SwiperComponent/>
  </div>
}
import Everythings from "@/components/Everythings"
import JoinFyver from "@/components/JoinFyver"
import Footer from "@/components/Footer"
import AuthWrapper from "@/components/AuthWrapper"
import ProfileOver from "@/components/ProfileOver"
import Swiper from "@/components/swiper"
import SwiperComponent from "@/components/swiper"
import SwiperComponent2 from "@/components/swiper2"

export default Index