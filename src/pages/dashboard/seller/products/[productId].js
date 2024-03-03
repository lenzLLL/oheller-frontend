import React, { useState } from 'react'
import Navbar from "../../../../components/admin/navbar"
import Swal from 'sweetalert2'
import Footer from "../../../../components/admin/footer"
import Menu from '@/components/admin/menu'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useEffect } from 'react'
import { GET_PRODUCT, GET_SHOP_BY_ID, GET_USER_INFOS } from '@/utils/Constant'
import DashboardShop from '@/components/admin/seller/DashboardShop'
import DashboardAddShop from '@/components/admin/seller/DashboardAddShop'
import DashboardUpdateShop from '@/components/admin/seller/DashboardUpdate'
import DashboardUpdateProduct from '@/components/admin/seller/DashboardUpdateProduct'
export default function index() {
  const router =useRouter()
  const {productId} = router.query
  const [cookies] = useCookies()
  const [product,setProduct] =useState({})
  const [data,setData] = useState({email:""})
  const getProductById = async () => {
    try{
        const d = await axios.get(GET_PRODUCT+productId,{withCredentials:true})
        setProduct(d.data.product)   
    }
    catch(error)
    {
       alert(error)
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
        getProductById()
        
        
    },[cookies,productId]
  )
  return (
    <div className='main min-h-screen bg-[#2a3445]'>
        <Navbar data={data}/>
        <div className='containe flex'>
            <div className='menuContainer w-[250px] py-[5px] px-[20px]  border-r-[2px] border-r-[#384256]'>
                <Menu data = {data} current = {"/dashboard/seller/products"}/>
            </div>
            <div className='menuContainer py-[5px] px-[20px] w-[100%]'>
         <DashboardUpdateProduct d = {product}/>
            </div> 
        </div>
        <Footer/>
    </div>
  )
}