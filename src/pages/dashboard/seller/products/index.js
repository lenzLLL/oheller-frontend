import React, { useState } from 'react'
import Navbar from "../../../../components/admin/navbar"
import Footer from "../../../../components/admin/footer"
import Menu from '@/components/admin/menu'
import DashboardAdmin from '@/components/admin/DashboardAdmin'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useEffect } from 'react'
import { DELETE_SHOP_BY_ID, GET_USER_INFOS } from '@/utils/Constant'
import DashboardSeller from '@/components/admin/seller/DashboardSeller'
import DashboardShop from '@/components/admin/seller/DashboardShop'
import DashboardProducts from '@/components/admin/product/DashboardProduct'
export default function index() {
  const [cookies] = useCookies()
  const [data,setData] = useState({email:""})
  const router =useRouter()

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
        
        
    },[cookies]
  )
  return (
    <div className='main min-h-screen bg-[#2a3445]'>
        <Navbar data={data}/>
        <div className='containe flex'>
            <div className='menuContainer w-[250px] py-[5px] px-[20px]  border-r-[2px] border-r-[#384256]'>
                <Menu data = {data} current = {"/dashboard/seller/products"}/>
            </div>
            <div className='menuContainer py-[5px] px-[20px] w-[100%]'>
                <DashboardProducts/>
            </div> 
        </div>
        <Footer/>
    </div>
  )
}
