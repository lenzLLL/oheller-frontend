import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from "axios"
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination'
import SwiperCore from "swiper";
import  { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules"
import { Pagination } from 'swiper/modules';
import { SEARCH_ALL_SERVICES } from '@/utils/Constant';
import {FaStar} from "react-icons/fa"
import Reviews from './service/Reviews';

export default function SwiperComponent() {
    
      const router = useRouter()
      SwiperCore.use([Autoplay])
      const getData = async () =>{
        try{
           const {data} = await axios.get(`${SEARCH_ALL_SERVICES}`,{withCredentials:true})  
           setServices(data.services)
          }
        catch(err)
        {
        
        }
    }
    const [services,setServices] = useState([])
    useEffect(
      ()=>{
          getData()
      },[]
    ) 

    const getAverage = (reviews) => {
        if(reviews){
          let A = 0
          reviews.forEach(({rating})=>A+=rating)
          A /= reviews.length
          return (A.toFixed(1))
        }
        return 0     
    }
    if(services.length==0)
    {
      return
    }
    return (
    <>
      <div className='flex flex-col  items-center  px-5 py-10 xl:px-10 xl:py-15 bg-purple-50'>
       <div className='flex text-center justify-between items-center'>
           <p className="text-4xl  mb-10 text-[#404145] text-center font-bold">
               Services les plus <span className='text-appPrimaryColor'>Populaires</span> 
           </p>   
       </div> 
      <Swiper
        className ="h-[330px] w-[100%]"
        slidesToShow = {1}
        autoplay = {true}
        speed = {700}
        
        slidesToScroll =  {2}
        controller={{

                dotsWrapperStyle: { marginBottom: 20 }
    
 
        }}
        breakpoints={{
            
          640: {
              slidesPerView: 2
            },
            1000: {
              slidesPerView: 3
            },
            1300: {
              slidesPerView: 4
            }
          }}
          
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        style={{display:"flex",justifyContent:"center"}}
      
      >
       {
        services.map(
          (service)=>{
            let r = service.reviews.length > 0? getAverage(service.reviews):0
            return (
              <SwiperSlide className='w-full flex justify-center'>
                     <div className='max-w-[300px] flex flex-col m-auto gap-1 p-1 cursor-pointer mb-8' onClick={()=>router.push(`/service/${service.id}`)}>
        <div className='relative h-40 w-64'>
            <Image src = {service.images[0]} fill alt ="service" className='rounded-xl'/>  
        </div>
        <div className='flex item-center gap-2'>
            {
              service.createdBy.url_image?
                  <Image src = {service?.createdBy?.url_image} width={30} height={30} alt = "profile" className='rounded-full'/> 
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
            <p className='cursor-pointer line-clamp-2 text-[#404145] h-12'>{service.title.length>50?service?.title.substring(0,45)+"...":service.title}</p>
        </div>
        <div className='flex items-center gap-1 text-yellow-400'>
            <FaStar/>
            <span className='font-medium'>{r}</span>
            <span className='text-[#74767e]'>({service.reviews.length})</span>
        </div>
        <p className='font-semibold'>A partir de {service.price} XAF</p>
    </div>   
              </SwiperSlide>
            )
          }
        )
       }


      </Swiper>
      </div>
    </>
  );
}
