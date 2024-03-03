import React, { useState } from 'react'
import Navbar from "../../../components/admin/navbar"
import Swal from 'sweetalert2'
import Footer from "../../../components/admin/footer"
import Menu from '@/components/admin/menu'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useEffect } from 'react'
import { GET_USER_INFOS } from '@/utils/Constant'
import DashboardShop from '@/components/admin/seller/DashboardShop'
import DashboardAddShop from '@/components/admin/seller/DashboardAddShop'
import DashboardAddProduct from '@/components/admin/product/DashboardAddProduct'
import DashboardAddSondage from '@/components/admin/sondages/DashboardAddSondage'
import DashboardQuestion from '@/components/admin/sondages/DashboardQuestion'
import DashboardAdminQuestion from '@/components/admin/sondages/DashboardAdminSondageQuestions'
import DashboardNoitifications from '@/components/admin/notifications/DashboardNoitifications'
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
                <Menu data = {data} current = {"/dashboard/notifications"}/>
            </div>
            <div className='menuContainer py-[5px] px-[20px] w-[100%]'>
            <DashboardNoitifications/>
            </div> 
        </div>
        <Footer/>
    </div>
  )
}
