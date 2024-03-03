import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import TextField from '@mui/material/TextField';
import { FaHandshake } from 'react-icons/fa'
import axios from "axios"
import { reducerCases } from '@/context/Constant'
import { CREATE_SERVICE_ORDER, GET_USER_SERVICE } from '@/utils/Constant';
export default function Profil() {
  const router = useRouter()
  const {serviceId} = router.query
  const [data,setData] = useState(
    {
    
       serviceId,
       price:0,
       description:""
    }
  )
  const [service,setService] = useState()
  useEffect(
    ()=>{
        if(serviceId)
        {
            
           const getServiceById = async () => {
               try{
                   const d = await axios.get(GET_USER_SERVICE+"/"+serviceId,{withCredentials:true})
                   setService(d.data.service)
                   
               }
               catch(error)
               {
                   alert(error)
               } 
           }
           getServiceById()
        }
    },[serviceId]
  )
  const createOrder = async () => {
    try{
        if(!data.serviceId || !data.price || !data.description)
        {
            alert("veillez remplir tous les champs avant l'envoie de la commande")
            return
        }
        if(!data.serviceId)
        {
            window.location.reload()
        }
        const response = await axios.post(CREATE_SERVICE_ORDER,{...data,date:new Date().getTime()},{withCredentials:true})
        if(response.status === 201)
        {
            alert("Commande envoyé avec success")
            router.push("/")
        }
    }
    catch(err)
    {
         alert(err)
    }
  }
  if(!service)
  {
    return <div>chargement</div>
  }
  return (
   <div className='flex flex-col items-left px-20 justify-center min-h-[80vh] gap-3 mt-[120px] mb-5'>

       <h2 className='text-3xl font-semibold'>Completez les informations de votre commande</h2>
       <h4 className='text-xl'>S'il vous plait veillez nous fournir les informations concernants votre besion</h4>
       <div className='flex flex-col item-center mt-5 w-full gap-2'>

       


     <TextField value = {data.price}  onChange={(e)=>setData({...data,price:e.target.value})} helperText="Minimum trois lettres!" id="outlined-basic" label= {`Entrez votre budget`} type ="number" variant="outlined" />  
     <TextField multiline minRows={5} value = {data.description}  onChange={(e)=>setData({...data,description:e.target.value})} helperText="Minimum trois lettres!" id="outlined-basic" label= {`Décrivez votre besion`} variant="outlined" />  
      
     <button onClick = {()=>createOrder()} className='bg-gray-900 w-[250px] py-2 rounded-[5px] shadow-md duration-200 ease-in hover:shadow-xl px-4 gap-2 text-white  flex items-center justify-center'>
                             <FaHandshake className='w-6 h-6 fill-white text-white'/> Passer la commande  
                            </button> 
           </div> 

       </div>
       
  )
}
