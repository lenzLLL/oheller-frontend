import React, { useEffect, useState } from 'react'
import { FaArtstation, FaPhone, FaTimes } from 'react-icons/fa'
import {CiShoppingTag} from "react-icons/ci"
import {LiaMoneyBillAlt, LiaTimesCircle, LiaUserTagSolid} from "react-icons/lia"
import {BiTimeFive} from "react-icons/bi"
import { RiShoppingBag2Line } from "react-icons/ri";
import axios from "axios"
import { FaShoppingBasket } from "react-icons/fa";
import { GET_ALL_PRODUCTS } from '@/utils/Constant'
export default function TopBoarSeller2({onProducts}) {
    const [data,setData] = useState([])
    
   const getUserProducts = async () => {
    try{
        const data = await axios.get(GET_ALL_PRODUCTS,{withCredentials:true}).then(
            (response)=>{
                setData(response.data.products)
                onProducts(response.data.products.length)
            }
        )        
    }
    catch(err)
    {
        alert(err)
    }
  }
    const products = [
        {
            id:1,
            img:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
            name:"black watch",
            price:"2000"
        },
        {
            id:1,
            img:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
            name:"black watch",
            price:"2000"
        },
        {
            id:1,
            img:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
            name:"black watch",
            price:"2000"
        },
        {
            id:1,
            img:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
            name:"black watch",
            price:"2000"
        },
        {
            id:1,
            img:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
            name:"black watch",
            price:"2000"
        },
        {
            id:1,
            img:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
            name:"black watch",
            price:"2000"
        },
        {
            id:1,
            img:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
            name:"black watch",
            price:"2000"
        },
        {
            id:1,
            img:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
            name:"black watch",
            price:"2000"
        }
    ]
    useEffect(
        ()=>{
            getUserProducts()
        },[]
    )

    const getDateTime = (date) => {
        return new Intl.DateTimeFormat('fr-FR', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(date);  
      }
    return (
    <div className=''>
        <h2 className='mb-[30px] uppercase text-sm'>Produits Récents</h2>
        {
            data.map(
                (product)=>{
                    return <div className='listItem flex items-center justify-between mb-[20px]' key ={product?.id}>
                        <div className='user items-center flex gap-3'>
                            <img className='w-[50px] h-[50px] shadow-lg  rounded-full fit-cover' src = {product?.images[0]} alt =""/>
                            <div className='userTexts text-[11px] flex flex-col'>
                                <span className='flex gap-1 items-center font-bold'><CiShoppingTag className='text-white text-xl'/>{product?.title}</span> 
                                <span className='flex gap-1 items-center text-gray-50'><LiaMoneyBillAlt className='text-green-100 text-xl mt-0.5'/>{product?.price} XAF</span> 
                                <span className='flex gap-1 items-center text-gray-50'><RiShoppingBag2Line className='text-white text-xl'/>{product.category}</span>                                 
                                 

                               
                                                           </div>
                        </div>

                    </div>
                }
            )
        }
    </div>
  )
}
