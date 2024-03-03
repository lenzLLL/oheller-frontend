import React, { useState } from 'react'
import Navbar from "../../../../components/admin/navbar"
import Swal from 'sweetalert2'
import Footer from "../../../../components/admin/footer"
import Menu from '@/components/admin/menu'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useEffect } from 'react'
import { GET_SHOP_BY_ID, GET_USER_INFOS } from '@/utils/Constant'
import DashboardShop from '@/components/admin/seller/DashboardShop'
import DashboardAddShop from '@/components/admin/seller/DashboardAddShop'
import DashboardUpdateShop from '@/components/admin/seller/DashboardUpdate'
export default function index() {
  const router =useRouter()
  const {shopId} = router.query
  const [cookies] = useCookies()
  const [shop,setShop] =useState({})
  const [data,setData] = useState({email:""})
  const getShopById = async () => {
    try{
        const d = await axios.get(GET_SHOP_BY_ID+"/"+shopId,{withCredentials:true})
        setShop(d.data.shop)
               
    }
    catch(error)
    {
       
    } 
}
  useEffect(
    ()=>{
        if(cookies.jwt)
        {    const getUserInfos = async () =>{
            
            try{
                const {data:{user}} = await axios.post(GET_USER_INFOS,{},{withCredentials:true})
                setData(user)
                if(user.url_image){
                    setCurrentImage(user.url_image)              
                }
              


            }
            catch(err)
            {
               console.log(err)
            }

           }
           getUserInfos()
           
        }
        else{
            router.push("/")
        }
        getShopById()
        
        
    },[cookies,shopId]
  )
  return (
    <div className='main min-h-screen bg-[#2a3445]'>
        <Navbar data={data}/>
        <div className='containe flex'>
            <div className='menuContainer w-[250px] py-[5px] px-[20px]  border-r-[2px] border-r-[#384256]'>
                <Menu data = {data} current = {"/dashboard/seller/shops"}/>
            </div>
            <div className='menuContainer py-[5px] px-[20px] w-[100%]'>
         <DashboardUpdateShop d = {shop}/>
            </div> 
        </div>
        <Footer/>
    </div>
  )
}
