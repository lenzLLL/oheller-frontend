import React,{useEffect,useState} from 'react'
import { data } from 'autoprefixer'
import Image from 'next/image'
import axios from "axios"
import { useRouter } from 'next/router'
import { GET_ALL_NOTIFICATIONS } from '@/utils/Constant'
export default function Navbar({data}) {
    const [notifications,setNotifications] = useState([])
    const getNoticiationS = async () => {
        try{
            const data = await axios.get(GET_ALL_NOTIFICATIONS,{withCredentials:true}).then(
                (response)=>{
                    let tab = response.data.notifications.filter(a=>a.isReaded === false)
                    setNotifications(tab)
                
                    
                }
            )
       
            
            
        }
        catch(err)
        {
            alert(err)
        }
      }
      
    useEffect(
        ()=>{
            getNoticiationS() 
        },[]
    )
    const router = useRouter()
    return (
    <div className='w-[100%] text-white p-[20px] flex items-center justify-between'>
        <div className='logo flex items-center gap-[10px] font-bold'>
            <img src = "/logo/logo-2.png" className='w-[110px]'/>
        </div>
        <div className='icons flex items-center gap-[20px]'>
        
            <div onClick={()=>router.push("/dashboard/notifications")} className='notification relative cursor-pointer' >
                <img src ="/dashboard/notifications.svg"/>
                <span className='absolute bg-[#f85151] rounded-full flex items-center justify-center w-[20px] -top-3 -right-1.5 h-[20px] text-white text-sm'>{notifications.length}</span>    
            </div>  
            <div className='user flex items-center gap-2 '>
              {
                                        data?.url_image ? (<Image  src = {data?.url_image} width={"35px"} height={"35px"} className='rounded-full'/>):(<div onClick = {()=>setIsHover(!isHover)} className='bg-purple-500 h-[35px] w-[35px] p-0 flex items-center justify-center rounded-full relative'>
                                            <span className='m-0 p-0 w-[26px] h-[26px] flex items-center justify-center text-lg text-white'>
                                                {
                                                    data?.email[0]?.toUpperCase()
                                                }
                                            </span>
                                        </div>)
                                    }
        
            </div>

        </div>

    </div>
  )
}
