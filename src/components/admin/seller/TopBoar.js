import React,{useState,useEffect} from 'react'
import { FaArtstation, FaPhone, FaTimes } from 'react-icons/fa'
import {LiaMoneyBillAlt, LiaTimesCircle, LiaUserTagSolid} from "react-icons/lia"
import {BiTimeFive} from "react-icons/bi"
import axios from "axios"
import { GET_ALL_SELLER_ORDERS_PRODUCT } from '@/utils/Constant'
export default function TopBoarSeller({onOrders}) {
    const [data,setData] = useState([])
    const getSellerOrders = async () => {
        try{
            const response = await axios.get(GET_ALL_SELLER_ORDERS_PRODUCT,{withCredentials:true}).then(
                (response)=>{
                    
                    onOrders(response.data.orders.length)
                    setData(response.data.orders.slice(0,10))      
                }
            ) 
            
      
        }
        catch(err)
        {
            alert(err)
        }
      }

     const getDateTime = (date) => {
        return new Intl.DateTimeFormat('fr-FR', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(date);  
      }
    useEffect(
        ()=>{
            getSellerOrders()
        },[]
    )
    return (
    <div className=''>
        <h2 className='mb-[30px] uppercase text-sm'>Dernières Commandes</h2>
        {
            data.map(
                (order)=>{
                    return <div key = {order.id} className='listItem flex items-center justify-between mb-[20px]'>
                        <div className='user items-center flex gap-3'>
                            <img className='w-[50px] h-[50px] shadow-lg  rounded-full fit-cover' src = {order.product?.images[0]} alt =""/>
                            <div className='userTexts text-[11px] flex flex-col'>
                             <span className='flex gap-1 items-center font-bold'><LiaUserTagSolid className='text-white text-xl'/>{order.customer?.fullname}</span> 
                                <span className='flex gap-1 items-center text-gray-50'><LiaMoneyBillAlt className='text-green-100 text-xl mt-0.5'/>{order?.price} XAF</span> 
                                <span className='flex gap-1 items-center text-gray-50'><BiTimeFive className='text-white text-xl'/>{getDateTime(parseInt(order?.date))}</span>                                 
                                                           </div>
                        </div>

                    </div>
                }
            )
        }
    </div>
  )
}
