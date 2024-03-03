import React, { useState,useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useStateProvider } from '@/context/StateContext'
import { PROFIL_ADMIN, PROFIL_FREELANCER, PROFIL_SELLER, PROFIL_WORKER } from '@/utils/Constants2'
import { Close } from '@mui/icons-material'
export default function ProfileOver({user,type="home",onIsHover}) {
    const [{userInfos},dispatch] = useStateProvider()  
    const [links,setLinks] = useState( [
    {
        name:"Profil",
        link:"/profil"
    },
    {
        name:"services commandés",
        link:"/buyer/orders"
    },
    {
        name:"Produits commandés",
        link:"/buyer/products/orders"
    },
    {
        name:"Participer aux sondages",
        link:"/sondages"
    },
   
   ]
    )
   const links2 = [
    {
        name:"Déconnexion",
        link:"profil"
    }
   ]
   useEffect(
    ()=>{
        
        if(userInfos.accountType === PROFIL_WORKER){
            setLinks([...links, {
                name:"Offres d'emploi",
                link:"/works"
            }])     
        }
       
    },[]
   )
   const [isHover,setIsHover] = useState(false)
   const router = useRouter()
   const pushTo = (link) => {
       setIsHover(false)
       router.push(link)
   }     
   return (
    <div style = {{boxShadow:"0 0  2px rgba(0,0,0,0.6)"}} className={`rounded-md z-[100] px-6 py-8 fixed ${type !== "phone"? "top-[70px] right-[50px]":"top-[0px] right-0"}   bg-white`}>
        
        {type === "phone" && <div onClick={()=>onIsHover(false)} className='w-full flex justify-end cursor-pointer'><Close/></div>}
        <div className='flex items-center justify-between gap-3'>
        {
                                        user?.url_image ? (<Image  src = {user.url_image} width={40} height={40} className='rounded-full'/>):(<div  className='bg-purple-500 h-10 w-10 p-0 flex items-center justify-center rounded-full relative'>
                                            <span className='m-0 p-0 w-40 h-40 flex items-center justify-center text-xl text-white'>
                                                {
                                                    user.email[0].toUpperCase()
                                                }
                                            </span>
                                        </div>)
                                    }           <div className='text-black flex flex-col justify-center'>
               <p className='font-semibold'>{user?.fullname}</p>
               <p className='text-[#bdbaba]'>{user?.email}</p>
           </div>
        </div>
        
{    (userInfos.accountType === PROFIL_ADMIN || userInfos.accountType === PROFIL_FREELANCER || userInfos.accountType === PROFIL_SELLER) ?   <div onClick = {()=>router.push("/dashboard")} onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)} className={isHover? 'bg-[#434] shadow-md text-white cursor-pointer font-semibold border border-black my-5 rounded-md flex items-center justify-center py-1.5 px-3':'px-3 cursor-pointer font-semibold border border-black my-5 rounded-md flex items-center justify-center py-1.5' }>
            Accéder au tableau de bord
        </div>:<div className='h-5'></div>}
        <hr/>
        <ul className='mt-2'>
            {
                links.map(
                    (item)=>{
                        return (
                            <li onClick={()=>pushTo(item.link)}  className='cursor-pointer text-lg text-[gray] m-1.5 hover:text-purple-500 transition-all duration-300' key = {item.link}>
                                {item.name} 
                            </li>
                        )
                    }
                )
            }
        </ul>
        <hr/>
        <ul>
            {
                !(userInfos.accountType === PROFIL_ADMIN || userInfos.accountType === PROFIL_FREELANCER || userInfos.accountType === PROFIL_SELLER) &&  <li className='cursor-pointer text-lg text-[gray] m-1.5 hover:text-purple-500 transition-all duration-300' key = {"/notifications"}>
                Notifications 
            </li>
            }
            {   
                links2.map(
                    (item)=>{
                        return (
                            <li className='cursor-pointer text-lg text-[gray] m-1.5 hover:text-purple-500 transition-all duration-300' key = {item.link}>
                                {item.name} 
                            </li>
                        )
                    }
                )
            }
        </ul>
    </div>
  )
}
