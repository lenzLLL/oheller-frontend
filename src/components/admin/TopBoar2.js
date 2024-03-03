import React from 'react'
import { FaArtstation, FaMoneyBill, FaPhone } from 'react-icons/fa'
import {GrTransaction} from "react-icons/gr"
import {TbArrowsTransferDown} from "react-icons/tb"

export default function TopBoar2() {
    const users = [
        {
            id:1,
            name:"Younda Nandjou Lenz",
            contact:"671434007",
            picture:"",
            amount:"2000"
        },
        {
            id:1,
            name:"Younda Nandjou Lenz",
            contact:"671434007",
            picture:"",
            amount:"2000"
        },
        {
            id:1,
            name:"Younda Nandjou Lenz",
            contact:"671434007",
            picture:"",
            amount:"2000"
        },
        {
            id:1,
            name:"Younda Nandjou Lenz",
            contact:"671434007",
            picture:"",
            amount:"2000"
        },
        {
            id:1,
            name:"Younda Nandjou Lenz",
            contact:"671434007",
            picture:"",
            amount:"2000"
        },
        {
            id:1,
            name:"Younda Nandjou Lenz",
            contact:"671434007",
            picture:"",
            amount:"2000"
        },
        {
            id:1,
            name:"Younda Nandjou Lenz",
            contact:"671434007",
            picture:"",
            amount:"2000"
        },
        {
            id:1,
            name:"Younda Nandjou Lenz",
            contact:"671434007",
            picture:"",
            amount:"2000"
        },
        {
            id:1,
            name:"Younda Nandjou Lenz",
            contact:"671434007",
            picture:"",
            amount:"2000"
        },
        {
            id:1,
            name:"Younda Nandjou Lenz",
            contact:"671434007",
            picture:"",
            amount:"2000"
        },
        {
            id:1,
            name:"Younda Nandjou Lenz",
            contact:"671434007",
            picture:"",
            amount:"2000"
        },
        {
            id:1,
            name:"Younda Nandjou Lenz",
            contact:"671434007",
            picture:"",
            amount:"2000"
        }
    ]
    return (
    <div className=''>
        <h2 className='mb-[30px] uppercase text-sm'>Dernières Transactions</h2>
        {
            users.map(
                (user)=>{
                    return <div className='listItem flex items-center justify-between mb-[20px]' key ={user.id}>
                        <div className='user flex items-center gap-3'>
                            <img className='w-[40px] h-[40px] rounded-full fit-cover' src = {"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"} alt =""/>
                            <div className='userTexts text-[11px] flex flex-col'>
                                <span>{user.name}</span> 
                                <span className='font-bold text-gray-300 flex gap-1 items-center'><FaMoneyBill/> {user.amount} XAF</span>
                                <span className='font-bold text-gray-300 flex gap-1 items-center mt-[1px] text-red-300'><TbArrowsTransferDown/>Retrait</span>

                            </div>
                        </div>

                    </div>
                }
            )
        }
    </div>
  )
}
