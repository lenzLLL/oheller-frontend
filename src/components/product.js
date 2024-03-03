import React from 'react'
import { FaStar } from 'react-icons/fa'
export default function Product({data}) {
  return (
    <div className='flex flex-col mb-10 cursor-pointer w-[200px] hover:border p-3 transition-all duration-75'>
        <img src ={"/product.jpg"} className='w-[200px] h-auto'/>
        <h3 style = {{letterSpacing:"2px"}} className='text-gray-500 mt-3 mb-1'>Headphone</h3>
        <hr/>
        <h2 className='mt-5 text-purple-500 font-semibold'>{data.name}</h2>
        <div className='flex  items-center gap-1 text-yellow-400 mt-0.5'>
                       <FaStar/>
                       <FaStar />
                       <FaStar style={{fill:"grey"}} className='text-black'/>
                       <FaStar style={{fill:"grey"}} className='text-black'/>
                       <FaStar style={{fill:"grey"}} className='text-black'/>
                       <span className='text-gray-300'>23</span>
                   </div>
        <h3 style = {{letterSpacing:"2px"}} className='text-[#555] font-semibold'>25 000 XAF</h3>
    </div>
  )
}
