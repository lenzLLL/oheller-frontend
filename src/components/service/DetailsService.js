import { useStateProvider } from '@/context/StateContext'
import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import Reviews from './Reviews'
import AddReviews from './AddReviews'


export default function DetailsService({hasOrder}) {
  const [{service,hasOrdered}] = useStateProvider()
  const [currentImage,setCurrentImage] = useState("")
  const [rating,setRating] = useState(0)
  useEffect(
    ()=>{
        if(service)
        {
          setCurrentImage(service.images[0])
        }
    },[service,rating,hasOrder]
  )
  return (
    <div className='col-span-2 flex flex-col px-5 py-5'>
        <h2 className='text-2xl font-bold text-[#404145] mb-[15px]'>{service.title}</h2>
        <div className='flex items-center gap-2 mt-1'>
           <div>
           {
              service.createdBy.url_image?
                  <Image src = {service.createdBy.url_image} width={30} height={30} alt = "profile" className='rounded-full'/> 
              :
                  <div className='bg-purple-500 h-7 w-7 p-0 flex items-center justify-center rounded-full relative'>
                      <span className='text-lg text-white'>
                          {service.createdBy.email[0].toUpperCase()}  
                      </span>
                  </div>   
      
            }
           </div>
           <div className='flex items-center gap-2'>
               <h4 className='font-bold text-[#27272a]'>{service.createdBy.fullname}</h4>
               <h6 className='text-[#74767e]'>{service.createdBy.email}</h6>
               <div className='flex items-center gap-1'>
               <div className='flex gap-1'>
                           {
                                [1,2,3,4,5].map(
                                (item)=>{
                                    return <FaStar  key = {item} className={`cursor-pointer ${rating >= item? "text-yellow-400":"text-gray-400"}`}/>
                                 }
                               )
                           } 
                   </div>
               </div>     
           </div>  
        </div>
        <div className='flex flex-col mt-5'>
            <div className='max-h-[1000px] max-w-[1000px] overflow-hidden'>
                <Image  src = {currentImage} height = {1000} width = {1000} className='cursor-pointer hover:scale-110 transition-all duration-500'/>
            </div>
            <div className='flex gap-4 flex-wrap mt-1 '>
                {
                  service.images.length>1 && service.images.map(
                    (image)=>{
                      return  <Image  src = {image} height = {100} key ={image} alt ="image" width = {100} onClick = {()=>setCurrentImage(image)} className={`${currentImage === image?"":"blur-sm"}  transition-all cursor-pointer duration-500`}/>
                    }
                  )
                }        
            </div>  
        </div>
        <div>
            <h3 className='text-3xl my-5 font-medium text-[#404145]'>A Propos Du Service</h3>  
            <p className='text-[#555]'>{service.description}</p>
        </div>
        
          <h3 className='my-5 text-3xl font-medium text-[#404145]'>A Propos Du Vendeur</h3>
          <div className='flex gap-5'>
          <div className=' flex gap-4'>
          {
              service.createdBy.url_image?
                  <Image src = {service.createdBy.url_image} width={120} height={120} alt = "profile" className='rounded-full'/> 
              :
                  <div className='bg-purple-500 h-10 w-10 p-0 flex items-center justify-center rounded-full relative'>
                      <span className='text-lg text-white'>
                          {service.createdBy.email[0].toUpperCase()}  
                      </span>
                  </div>   
      
            } 
          </div>
          <div className='flex flex-col gap-1'>
              <div className='flex gap-2 items-center'>
                  <h4 className='font-medium text-lg'>
                      {service.createdBy.fullname}
                  </h4>
                  <span className='text-[#74767e]'>
                      @{service.createdBy.email}
                  </span>
              </div>
              <span className='text-[#555] font-semibold'>{"12 commandes livrés avec success"}</span>
              <div className ="flex items-center gap-1">
              <div className='flex gap-1'>
                           {
                                [1,2,3,4,5].map(
                                (item)=>{
                                    return <FaStar  key = {item} className={`cursor-pointer ${rating >= item? "text-yellow-400":"text-gray-400"}`}/>
                                 }
                               )
                           } 
                   </div> 
                    <span className='text-yellow-500 ml-2'>{rating}</span>
                    <span className='text-yellow-500'>({service.reviews.length})</span>

              </div>
              
          </div>
        </div>
        <Reviews onRating = {setRating}/>
        {hasOrder && <AddReviews/>}
    </div>
  )
}
