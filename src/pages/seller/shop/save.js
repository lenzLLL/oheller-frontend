import Product from '@/components/product'
import React from 'react'
import {FaStar} from "react-icons/fa"
import { IoSearchCircleOutline } from 'react-icons/io5'
export default function Shop() {
    const data = [
        {
            name:"Nike XR",
        }
        ,
        {
            name:"Nike XR",
        },
        {
            name:"Nike XR",
        },
        {
            name:"Nike XR",
        },
        {
            name:"Nike XR",
        },
        {
            name:"Nike XR",
        }
    ]  
    return (
    <div className='mt-[76px] py-10'>
       <div className='bg-gray-100 h-[65px] flex items-center px-16' >
           <p className='flex gap-1.5'><span className='text-purple-500 cursor-pointer'>Accueil</span>/<span className='text-purple-500 cursor-pointer'>Boutiques</span>/<span>Boutique</span></p> 
       </div>
       <div className='mt-10 flex px-16'>
           <div className='bg-gray-100 w-[300px] '>
               <img className='w-full h-[270]' src = {"https://media.istockphoto.com/id/1336136316/fr/photo/femme-achats-en-ligne-sur-t%C3%A9l%C3%A9phone-intelligent-v%C3%AAtements-de-mode-%C3%A0-la-maison.jpg?b=1&s=612x612&w=0&k=20&c=0CgCnlCd2XUPuY3MrhlQf0Y5_E-O1Ac6MyHHnjZc9QI="}/>
               <div className='flex flex-col p-5 h-auto'>
                   <h1 className='text-2xl font-semibold' style = {{letterSpacing:"2px"}}>Bazaar shop</h1>
                   <div className='flex  items-center gap-1 text-yellow-400 mt-3'>
                       <FaStar/>
                       <FaStar/>
                       <FaStar/>
                       <FaStar className='text-black'/>
                       <FaStar className='text-black'/>
                   </div>
                   <div className='flex  mt-1 text-purple-500 font-semibold gap-2'>
                       <p>Environ 50 produits</p><span className='text-[#555]'>(23 avis)</span> 
                   </div>
                   <hr className='my-5'/>
                  <p className='text-md text-[#555] text-justify'>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
                  </p> 
                  <hr className='my-5'/>
                  <p className='text-[#555]'><span className='text-black font-bold'>Adresse</span> Yaoundé, Monté Jouvence</p>
                  <div className='w-full mt-5'>
                      <button className='cursor-pointer shadow-sm hover:shadow-lg flex flex-row justify-center border w-full py-[10px] items-center gap-2 px-20 bg-orange-400 text-white rounded-sm shadow-sm'>
                          Discussion
                      </button>
                   </div>
               </div>
           </div>
           <div>

           </div>
           <div className='ml-5 flex-1 flex flex-col '>
                <div className='flex bg-gray-100 items-center justify-between h-[55px] py-2 px-3 w-full'>                   
                    <p><span className='font-bold'>21</span> produits trouvés</p>
                    <div className={`flex h-full bg-white items-center justify-between w-[350px] px-2`}>
                       <input type ="text" className='flex-1 outline-none' placeholder="Quel produit recherchez vous?" />
                        <IoSearchCircleOutline className='w-6 h-6 fill-black text-gray-500'/>    
                    </div>
                </div>
                <div className='grid grid-cols-4 mt-10'>
                    {
                        data.map(
                            (item)=>{
                                return <Product data ={item} key = {item.name}/>
                            }
                        )
                    }
                </div>
           </div>
       </div>
    </div>
  )
}
