import React from 'react'
import { FaArtstation, FaPhone, FaTimes } from 'react-icons/fa'
import {LiaMoneyBillAlt, LiaTimesCircle, LiaUserTagSolid} from "react-icons/lia"
import {BiTimeFive} from "react-icons/bi"
export default function TopBoarSeller() {
    const orders = [
        {
            id:1,
            product:"https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            customer:"Younda Nandjou Lenz",
            qte:2,
            amount:"2000"
        },
        {
            id:1,
            product:"https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            customer:"Younda Nandjou Lenz",
            qte:2,
            amount:"2000"
        },
        {
            id:1,
            product:"https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            customer:"Younda Nandjou Lenz",
            qte:2,
            amount:"2000"
        },
        {
            id:1,
            product:"https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            customer:"Younda Nandjou Lenz",
            qte:2,
            amount:"2000"
        },
        {
            id:1,
            product:"https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            customer:"Younda Nandjou Lenz",
            qte:2,
            amount:"2000"
        },
        {
            id:1,
            product:"https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            customer:"Younda Nandjou Lenz",
            qte:2,
            amount:"2000"
        },
        {
            id:1,
            product:"https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            customer:"Younda Nandjou Lenz",
            qte:2,
            amount:"2000"
        },
        {
            id:1,
            product:"https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            customer:"Younda Nandjou Lenz",
            qte:2,
            amount:"2000"
        },
        {
            id:1,
            product:"https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            customer:"Younda Nandjou Lenz",
            qte:2,
            amount:"2000"
        },
        {
            id:1,
            product:"https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            customer:"Younda Nandjou Lenz",
            qte:2,
            amount:"2000"
        },
        {
            id:1,
            product:"https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            customer:"Younda Nandjou Lenz",
            qte:2,
            amount:"2000"
        },
        {
            id:1,
            product:"https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            customer:"Younda Nandjou Lenz",
            qte:2,
            amount:"2000"
        }
    ]
    return (
    <div className=''>
        <h2 className='mb-[30px] uppercase text-sm'>Dernières Commandes</h2>
        {
            orders.map(
                (order)=>{
                    return <div className='listItem flex items-center justify-between mb-[20px]' key ={order.id}>
                        <div className='user items-center flex gap-3'>
                            <img className='w-[50px] h-[50px] shadow-lg  rounded-full fit-cover' src = {order.product} alt =""/>
                            <div className='userTexts text-[11px] flex flex-col'>
                                <span className='flex gap-1 items-center font-bold'><LiaUserTagSolid className='text-white text-xl'/>{order.customer}</span> 
                                <span className='flex gap-1 items-center text-gray-50'><LiaMoneyBillAlt className='text-green-100 text-xl mt-0.5'/>{order.amount} XAF</span> 
                                <span className='flex gap-1 items-center text-gray-50'><BiTimeFive className='text-white text-xl'/>{"28/01:2022 12:00:00"}</span> 

                               
                                                           </div>
                        </div>

                    </div>
                }
            )
        }
    </div>
  )
}
