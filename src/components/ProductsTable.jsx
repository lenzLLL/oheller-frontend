import React,{useEffect,useState} from "react"
import InputQuantityCom from "./InputQuantityCom";
import { ADD_PRODUCT_ORDER,GET_ALL_LIKED, GET_SELLER_ORDER } from "@/utils/Constant";
import axios from "axios"
import Swal from 'sweetalert2'

export default function ProductsTable({ className,type="cart" }) {
  const [cart,setCart] = useState([])
  const deleteCart = (id) => {
        let newD = cart.filter(c=>c.id !== id) 
        setCart(newD)
        localStorage.setItem("cart",JSON.stringify(newD))
        
  }


  const [isLoading,setIsLoading] = useState(false)
  const addOrder = async (data) => {
    try{
    const response = await axios.post(ADD_PRODUCT_ORDER,{...data,date:new Date().getTime()},{withCredentials:true})
    }
    catch(err)
    {
       
        Swal.fire({
          title: 'Error!',
          text: 'Une erreur s\'est produite veillez ressayer s\'il vous  plait',
          icon: 'error',
          confirmButtonText: 'Ok',
          buttonsStyling:"danger"
        })    
        
       
      
    }
   
  }
  const getLiked = async () => {
    try{
        const data = await axios.get(GET_ALL_LIKED,{withCredentials:true}).then(
            (response)=>{
        
                setCart(response.data.liked)
              
            }
        )
   
        
        
    }
    catch(err)
    {
        alert(err)
    }
  } 
  const addOrders = async () => {
      try{
         setIsLoading(true)
          for(let i = 0;i<cart.length;i++)
          {
         alert("cool")
            
            await addOrder(cart[i])
          } 
        
          setIsLoading(false)
          Swal.fire(
            'Commande envoyée',
            'Votre commande a été envoyé avec success!',
            'success'
          )
          localStorage.removeItem("cart")
          window.location.replace("/") 
      }
      catch(err)
      { 
        alert(err)

      }  
  }
  useEffect(
    ()=>{
        if(type!=="cart")
        {
            getLiked()
          
            
        }
        else if(localStorage.getItem("cart") && type === "cart")
        {
          setCart(JSON.parse(localStorage.getItem("cart"))) 
        }
    },[]
  )
  return (
    <>
    <div className={`w-full ${className || ""}`}>
      <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
              <td className="py-4 pl-10 block whitespace-nowrap min-w-[300px]">
                produit
              </td>
             
              <td className="py-4 whitespace-nowrap text-center">taille</td>
              <td className="py-4 whitespace-nowrap text-center">prix</td>
              <td className="py-4 whitespace-nowrap  text-center">quantité</td>
              <td className="py-4 whitespace-nowrap  text-center">total</td>
              <td className="py-4 whitespace-nowrap text-right w-[114px]"></td>
            </tr>
            {/* table heading end */}
            {
              cart?.map(
                (c)=>{
                  return (
                    <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="pl-10  py-4  w-[380px]">
                      <div className="flex space-x-6 items-center">
                        <div className="w-[100px] h-[100px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                          <img
                            src={c.img}
                            alt="product"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <p className="font-medium text-[15px] text-qblack">
                            {c.title}
                          </p>
                        </div>
                      </div>
                    </td>
               
                    <td className="text-center  px-2">
                      <div className="flex space-x-1 items-center justify-center">
                        <span className="text-[15px] font-normal">{c.size? c.size:""}</span>
                      </div>
                    </td>
                    <td className="text-center  px-2">
                      <div className="flex space-x-1 items-center justify-center">
                        <span className="text-[15px] font-normal">{c.price} XAF</span>
                      </div>
                    </td>
                    <td className="">
                      <div className="flex justify-center items-center">
                        <InputQuantityCom q = {c.quantite} />
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="flex space-x-1 items-center justify-center">
                        <span className="text-[15px] font-normal">{c.price*c.quantite} XAF</span>
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="flex space-x-1 items-center justify-center">
                        <span onClick = {()=>deleteCart(c.id)} className="cursor-pointer">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z"
                              fill="#AAAAAA"
                            />
                          </svg>
                        </span>
                      </div>
                    </td>
                  </tr>
                  )
                }
              )
            }
          
       
          </tbody>
        </table>
      </div>
    </div>
    <div className="w-full sm:flex justify-between">
        <div className="discount-code sm:w-[270px] w-full mb-5 sm:mb-0 h-[50px] flex">
        </div>
        <div className="flex space-x-2.5 items-center">
          <button disabled = {isLoading} onClick = {()=>addOrders()} >
            <div className="w-[220px] h-[50px] bg-[#F6F6F6] flex justify-center items-center">
              <span className="text-sm font-semibold">
                Envoyer la commande
              </span>
            </div>
          </button>
          
        </div>
      </div>
    </>
  );
}
