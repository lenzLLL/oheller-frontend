import React,{useEffect,useState} from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FaStar } from 'react-icons/fa'
export default function SearchGrid({service}) {
  const router = useRouter()
  const [average,setAverage] = useState(0)
  const [reviews,setReviews] = useState(0)
  useEffect(
    ()=>{
        if(service && service.reviews?.length)
        {
          let A = 0
          service.reviews.forEach(({rating})=>A+=rating)
          A /= service.reviews.length
          setAverage(A.toFixed(1))
          setReviews(service.reviews.length)
        }

    },[service,reviews,average]
  )
  return (
    <div className='max-w-[300px] flex flex-col gap-2 p-1 cursor-pointer mb-8' onClick={()=>router.push(`/service/${service.id}`)}>
        <div className='relative h-40 w-64'>
            <Image src = {service.images[0]} fill alt ="service" className='rounded-xl'/>  
        </div>
        <div className='flex item-center gap-2'>
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
            <span className='text-md'>
                <strong className='font-medium'>{service.createdBy.fullname}</strong>
            </span>
        </div>
        <div>
        <p className='cursor-pointer line-clamp-2 text-[#404145] h-11'>{service.title.length>50?service?.title.substring(0,45)+"...":service.title}</p>
              
                  </div>
        <div className='flex items-center gap-1 text-yellow-400'>
            <FaStar/>
            <span className='font-medium'>{average}</span>
            <span className='text-[#74767e]'>({reviews})</span>
        </div>
        <p className='font-semibold'>A partir de {service.price} XAF</p>
    </div>
  )
}
