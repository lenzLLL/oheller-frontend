import React,{useEffect,useState} from "react"
import { useStateProvider } from '@/context/StateContext'
import { FaStar } from "react-icons/fa"
import Image from "next/image"


export default function Reviews({onRating}) {
  const [{service,hasOrdered}] = useStateProvider()
  const [average,setAverage] = useState(0)
  useEffect(
    ()=>{
      if(service && service.reviews.length)
      {
        let A = 0
        service.reviews.forEach(({rating})=>A+=rating)
        A /= service.reviews.length
        setAverage(A.toFixed(1))
        onRating(average)
      }
    },[onRating,average]
  )
  return (
    <div >
      <h3 className="text-2xl my-5 text-[#404145]">Commentaires</h3>
      <div className="flex gap-3 mb-5">
                  <h5 className="text-gray-700">{service.reviews.length} Avis pour ce service</h5> 
                  <div className="flex text-yellow-500 items-center gap-2">
                  <div className='flex gap-1'>
                           {
                                [1,2,3,4,5].map(
                                (item)=>{
                                    return <FaStar  key = {item} className={`cursor-pointer ${average >= item? "text-yellow-400":"text-gray-400"}`}/>
                                 }
                               )
                           } 
                   </div>
                   <span>{average}</span>
                  </div>   
              </div>
      {
        service.reviews && (
          <div className="mb-10 h-[400px]" style={{overflow:"scroll"}}>

              <div className="flex flex-col gap-6">
                  {
                    service.reviews.map(
                      (review)=>{
                        return   <div className="flex gap-3 border-t pt-6">
                                      {
                                          review.buyer?.url_image?
                                          <img src = {review.buyer.url_image}  alt = "profile" className='rounded-full w-16 h-16'/> 
                                          :
                                          <div className='bg-purple-500 h-7 w-7 p-0 flex items-center justify-center rounded-full relative'>
                                              <span className='text-lg text-white'>
                                                 {service.createdBy.email[0].toUpperCase()}  
                                              </span>
                                          </div>   
      
                                       }
                                       <div className="flex flex-col gap-2">
                                           <h4>{review.buyer.fullname}</h4> 
                                           <div className="flex text-yellow-500 items-center gap-2">
                                               <div className='flex gap-1'>
                                                 {
                                                   [1,2,3,4,5].map(
                                                     (item)=>{
                                                     return <FaStar  key = {item} className={`cursor-pointer ${review.rating >= item? "text-yellow-400":"text-gray-400"}`}/>
                                                    }
                                                      )
                                                  } 
                                              </div>
                                              
                                           </div> 
                                           <p>{review.text}</p>  

                                       </div> 

                        </div>
                      }
                    )
                  }
                  
              </div>  
                
          </div>
        )
      }
    </div>
  )
}
