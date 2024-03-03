import { EDIT_ORDER_PRODUCT, GET_PRODUCT_ORDER_BY_ID } from '@/utils/Constant'
import React,{useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import axios from "axios"
export default function DashboardSingleOrder() {

  // const saveShop = async () =>{
  //   const response = await axios.post("http://localhost:8080/api/shop/add",{images,features,numbers},{withCredentials:true,params:data})
      
  // } 
  const router = useRouter()
  const {orderId} = router.query
  const [order,setOrder] = useState()
  const [date,setDate] = useState(new Date())
  const getOrderById = async () => {
    try{
        const data = await axios.get(GET_PRODUCT_ORDER_BY_ID+orderId,{withCredentials:true}).then(
            (response)=>{
                setOrder(response.data.order)
                let date = parseInt(response.data.order.date)
                date = new Date(date)
                date = date.toLocaleString('en-GB')
                date = date.toString()
                
                setDate(date)
            
            }
        )
  
    }
    catch(err)
    {
      
    }
  }
  const roo ="p-[50px] rounded-[10px] border border-[#384256] text-white flex-1 "
  const roo2 = "product-order-item relative w-[1px] pt-[65px] bg-[#f45b69]" 
  const editShop = async () => {
    
    try{
     
        const response = await axios.put(EDIT_ORDER_PRODUCT+orderId,{},{withCredentials:true})
        if(response.status === 201)
        {
          router.push("/dashboard/seller/orders")
          Swal.fire(
            'Opération terminée',
            'La commande est enregistré comme livrée!',
            'success'
          )  
        }
      }
    catch(err)
    {
        Swal.fire({
            title: 'Error!',
            text: "Une erreur s'est produite veillez recommencer!",
            icon: 'error',
            confirmButtonText: 'Ok',
            buttonsStyling:"danger"
          }) 
    }
  }
  useEffect(
        ()=>{
            
               getOrderById()
            
        },[orderId]
    )
    return (
        <div className='dashboarshop' >
                   <div className= {roo+" box9"}>
        <h1 className='text-lg text-[#f3f3f1] font-bold uppercase mb-5'>Informations sur la commande</h1>
        <ul>
            <li className= {roo2}>
                <div className='flex gap-5'>
                    <img src = {order?.product?.images[0]} className='w-[200px] rounded-lg h-[200px]'/>
                    <di>
                        <h2 className='text-gray-50 font-[300]'><span className='font-bold'>produit: </span>{order?.product?.title}</h2>
                        <h2 className='text-gray-50 font-[300]'><span className='font-bold'>catégorie: </span>{order?.product?.category}</h2>
                        <h2 className='text-gray-50 font-[300]'><span className='font-bold'>quantité: </span>{order?.quantity}</h2>
                        <h2 className='text-gray-50 font-[300]'><span className='font-bold'>prix: </span>{order?.price} XAF</h2>
                        <h2 className='text-gray-50 font-[300]'><span className='font-bold'>prix total: </span>{order?.totalPrice} XAF</h2>
                        <h2 className='text-gray-50 font-[300]'><span className='font-bold'>taille: </span>{order?.size? order.size:"Aucunes"}</h2>
                        <h2 className='text-gray-50 font-[300]'><span className='font-bold'>Date d'envoie: </span>  22:22:02 </h2>
                        <h2 className='text-gray-50 font-[300]'><span className='font-bold'>Statut: </span>  {order?.status}</h2>


                        
                    </di>
                </div>
            </li>
            <li className= {roo2}>
            <div className='flex gap-5'>
                    <img src = {order?.customer?.url_image? order?.customer?.url_image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG0KXv5HVFNRBzWebIOPk1efHXDUX-nbkSa4D2NJrEzQ&s"} className='w-[200px] rounded-lg h-[200px]'/>
                    <di>
                        <h2 className='text-gray-50 font-[300]'><span className='font-bold'>Nom: </span>{order?.customer?.fullname}</h2>
                        <h2 className='text-gray-50 font-[300]'><span className='font-bold'>Contact: </span>{order?.customer?.contact}</h2>
                        <h2 className='text-gray-50 font-[300]'><span className='font-bold'>Adresse: </span>{order?.customer.quarter}, {order?.customer.city}</h2>



                        
                    </di>
                </div>
            </li>
            <li className='mt-10'><Button onClick = {()=>editShop()} className ="mt-2" variant="contained">Confirmer la livraison</Button></li>
           
          
        </ul>
    
        </div>  
       </div>
  )
}
