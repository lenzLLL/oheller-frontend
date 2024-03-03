import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { FaStar } from 'react-icons/fa'
import { TextField } from '@mui/material'
import axios from 'axios'
import { ADD_REVIEW } from '@/utils/Constant'
export default function AddReviews() {
 
  const [data,setData] = useState({reviewText:"",rating:0})
  const router = useRouter()
  const {serviceId} = router.query
  const addReview = async () => {
    try{
       
        const response = await axios.post(`${ADD_REVIEW}${serviceId}`,{text:data.reviewText,rating:data.rating},{withCredentials:true})
  
        if(response.status === 201)
        {
          setData({reviewText:"",rating:0})
          window.location.reload()
        }
    }
    catch(err)
    {
      alert(err)
    }
  }
  return (
    <div className='mb-10'>
        <h3 className='text-2xl my-5 font-normal text-[#404145]'>Donnez Votre Avis</h3>
        <div className='flex flex-col items-start justify-start gap-3'>
           <TextField type ="text" multiline minRows={2} onChange={(e)=>setData({...data,reviewText:e.target.value})} value = {data.reviewText}  id="outlined-basic" label= {`Votre Commentaire`} variant="outlined" className='w-[300px]' /> 
           <div className='flex gap-1'>
               {
                [1,2,3,4,5].map(
                  (item)=>{
                    return <FaStar onClick={()=>setData({...data,rating:item})} key = {item} className={`cursor-pointer ${data.rating >= item? "text-yellow-400":"text-gray-400"}`}/>
                  }
                )
               } 
           </div>
           
           <button onClick = {()=>addReview()} className="bg-[#1DDF73] py-3 border-[#1DDF73] px-3 rounded-lg shadow-sm text-white">
                Poster
            </button>
        </div>
    </div>
  )
}
