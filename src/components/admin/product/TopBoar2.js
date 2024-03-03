import React from 'react'
import { FaArtstation, FaPhone, FaTimes } from 'react-icons/fa'
import {CiShoppingTag} from "react-icons/ci"
import {LiaMoneyBillAlt, LiaTimesCircle, LiaUserTagSolid} from "react-icons/lia"
import {BiTimeFive} from "react-icons/bi"
import {AiOutlineShoppingCart} from "react-icons/ai"
export default function TopBoarSeller2() {
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
    return (
    <div className=''>
        <h2 className='mb-[30px] uppercase text-sm'>Produits Populaires</h2>
        {
            products.map(
                (product)=>{
                    return <div className='listItem flex items-center justify-between mb-[20px]' key ={product.id}>
                        <div className='user items-center flex gap-3'>
                            <img className='w-[50px] h-[50px] shadow-lg  rounded-full fit-cover' src = {product.img} alt =""/>
                            <div className='userTexts text-[11px] flex flex-col'>
                                <span className='flex gap-1 items-center font-bold'><CiShoppingTag className='text-white text-xl'/>{product.name}</span> 
                                <span className='flex gap-1 items-center text-gray-50'><LiaMoneyBillAlt className='text-green-100 text-xl mt-0.5'/>{product.price} XAF</span> 
                                <span className='flex gap-1 items-center text-gray-50'><AiOutlineShoppingCart className='text-white text-xl'/>23</span> 

                               
                                                           </div>
                        </div>

                    </div>
                }
            )
        }
    </div>
  )
}
