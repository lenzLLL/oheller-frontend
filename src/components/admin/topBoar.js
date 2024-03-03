import React from 'react'
import { FaArtstation, FaPhone } from 'react-icons/fa'
import { IoStarOutline } from 'react-icons/io5'

export default function TopBoar({users}) {

    return (
    <div className=''>
        <h2 className='mb-[30px] uppercase text-sm'>Dernières Inscriptions</h2>
        {
            users.map(
                (user)=>{
                    return <div className='listItem flex items-center justify-between mb-[20px]' key ={user.id}>
                        <div className='user items-center flex gap-3'>
                            <img className='w-[40px] h-[40px] rounded-full fit-cover' src = {"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"} alt =""/>
                            <div className='userTexts text-[11px] flex flex-col'>
                                <span>{user.fullname}</span> 
                                <span className='font-bold text-gray-300 flex gap-1 items-center'><FaPhone className='text-blue-300'/> {user.contact}</span>
                                <span className='font-bold text-gray-300 flex gap-1 items-center mt-[1px]'><FaArtstation className='text-green-300'/> {"Freelancer"}</span>
                            </div>
                        </div>

                    </div>
                }
            )
        }
    </div>
  )
}
