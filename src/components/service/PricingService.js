import React,{useEffect} from 'react'
import { useRouter } from 'next/router'
import { useStateProvider } from '@/context/StateContext'
import { FiClock} from 'react-icons/fi'
import {GiMoneyStack} from "react-icons/gi"
import { FaHandshake } from 'react-icons/fa'
import { HiSaveAs } from 'react-icons/hi'
import { useCookies } from 'react-cookie'
import { useState } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import {BsFillChatLeftTextFill} from "react-icons/bs"


export default function PricingService() {
  const router = useRouter()
  const [cookies] = useCookies()
  const [{userInfos,service},dispatch] = useStateProvider()
  const [isLoading,setIsLoading] = useState(false)
  useEffect(
    ()=>{
        if(cookies.jwt && !userInfos)
        {    const getUserInfos = async () =>{
            
            try{
                const {data:{user}} = await axios.post(GET_USER_INFOS,{},{withCredentials:true})
                let userDatas = {...user}
                dispatch({type:reducerCases.SET_USER,userInfos:userDatas})
                if(user.url_image){
                    setCurrentImage(user.url_image)              
                }
             
                    if(user.isProfilInfosSet === false)
                    {
                        router.push("/profil")
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
        }
        setIsLoading(true)
        
    },[userInfos,cookies]
  )

  return (
    <>
        {
            service && <div className='sticky top-36 mb-10 h-max w-96 flex flex-col items-center'>
                <div className='border px-5 py-7 flex flex-col gap-5'>

                    <div>
                        <div className='text-[#62646a] font-semibold text-sm flex gap-6'>
                            <div className='flex items-center gap-2'>
                                <FiClock className='text-xl'/>
                                <span>livraison après {service?.time} jours</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <GiMoneyStack className='text-xl'/>
                                <span>{service?.price} XAF</span>
                                
                            </div>    
                        </div>
                    </div>
                                        <div className='flex justify-between gap-3'>
                        <h4 className='text-md font-normal text-justify text-[#74767e]'>{service?.description}</h4>
                    </div>
                    <ul>
                        {
                            service.features?.map(
                                (feature)=>{
                                    return <li className='flex items-center gap-3'><BsCheckLg className='text-[#4f5156] text-lg'/> <span className='text-[#4f5156] text-lg'>{feature}</span></li>
                                }
                            )
                        }
                    </ul>
                    <ul>                        {
                            service.userId === userInfos?.id? (
                                <button onClick = {()=>router.push("/seller/services/"+service.id)}  className='bg-gray-900 py-2 rounded-[5px] shadow-md w-full duration-200 ease-in hover:shadow-xl px-4 gap-2 text-white  flex items-center justify-center'>
                                <HiSaveAs className='w-6 h-6 fill-white text-white'/> Modifier   
                                </button>  
                            ):                    <button onClick = {()=>{router.push(`/service/order/${service.id}`) }} className='bg-gray-900 w-full py-2 rounded-[5px] shadow-md duration-200 ease-in hover:shadow-xl px-4 gap-2 text-white  flex items-center justify-center'>
                             <FaHandshake className='w-6 h-6 fill-white text-white'/> Solliciter le service  
                            </button> 
                        }
               </ul>
                </div>
              
                     <button onClick = {()=>{router.push(`/search-service?q=${searchData}`) }} className='text-gray-700 border-gray-700 bg-outlined border w-[300px] font-semibold py-2 rounded-[5px] mt-3 shadow-sm duration-200 ease-in hover:bg-gray-700 hover:text-white px-4 gap-2 flex items-center justify-center '>
                             Envoyer un message   
                            </button> 
               
            </div>
        }
    </>
  )
}
