import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useStateProvider } from '@/context/StateContext'
import { GET_USER_INFOS, GET_USER_SERVICE, USER_HAS_ORDER } from '@/utils/Constant'
import reducer from '@/context/StateReducer'
import { reducerCases } from '@/context/Constant'
import DetailsService from '@/components/service/DetailsService'
import PricingService from '@/components/service/PricingService'
import { useCookies } from 'react-cookie'

export default function ServicePage() {
  const router = useRouter()
  const {serviceId} = router.query
  const [{userInfos},dispatch] = useStateProvider()
  const [service,setService] = useState()
  const [hasOrder,setHasOrder] = useState(false)
  const [cookies] = useCookies()
  useEffect(
    ()=>{
        if(serviceId)
        {
            
           const getServiceById = async () => {
               try{
                   const d = await axios.get(GET_USER_SERVICE+"/"+serviceId,{withCredentials:true})
                   setService(d.data.service)
                   dispatch({type:reducerCases.SET_SERVICE_DATA,service:d.data.service})
               }
               catch(error)
               {
                   alert(error)
               } 
           }
           getServiceById()
        }
    },[serviceId,dispatch]
  )
  useEffect(
    ()=>{
        if(cookies.jwt)
        {    const getUserInfos = async () =>{
            
            try{
                const {data:{user}} = await axios.post(GET_USER_INFOS,{},{withCredentials:true})
                let userDatas = {...user}
                dispatch({type:reducerCases.SET_USER,userInfos:userDatas})

                const response = await axios.post(USER_HAS_ORDER,{serviceId,buyerId:user.id},{withCredentials:true})
                if(response.status === 200)
                {
                  setHasOrder(true)
                }
  
            }
            catch(err)
            {
               console.log(err)
               alert(err)
            }

           }
           getUserInfos()
           
        }
        else{
        }
   
        
    },[userInfos,cookies,hasOrder]
  )
  if(!service)
  {
    return <div>chargement</div>
  }
  return (
    <div className='grid grid-cols-3 mt-32'>
        <DetailsService hasOrder = {hasOrder} serviceId={serviceId}/>
        <PricingService/>
    </div>
  )
}
