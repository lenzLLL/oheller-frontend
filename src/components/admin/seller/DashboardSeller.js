import React,{useEffect,useState} from 'react'
import ChartBox from './../chartBox'
import { FaChartLine, FaShopify, FaUsers } from 'react-icons/fa'
import {GiMoneyStack} from "react-icons/gi"
import {FiShoppingBag} from "react-icons/fi"
import TopBoar2 from './../TopBoar2'
import DataGridDashboardHome from './../homeTble'
import {BsCartCheck} from "react-icons/bs"
import TopBoarSeller from './TopBoar'
import TopBoarSeller2 from './TopBoar2'
import OrdersTable from './ordersTable'
import { GET_ALL_SHOPS } from '@/utils/Constant'
import axios from "axios"
export default function DashboardSeller() {
  const roo ="p-[20px] rounded-[10px] border border-[#384256] text-white flex-1 "
  const returnalue = (value) => {
    if(value>=1000000){
      return (value/1000000).toFixed(2)+"M"
    }
    if(value>=1000)
    {
       return (value/1000).toFixed(2)+"K"
    }
    
    return value
  } 
  const  [products,setProducts] = useState(0)
  const  [orders,setOrders] = useState(0)
  const  [shops,setShops] = useState(0)
  const getShops = async () =>{
    try{
        const data = await axios.get(GET_ALL_SHOPS,{withCredentials:true}).then(
          (response)=>{
               setShops(response.data.shops.length)
          }
        )   
    }
    catch(err){

    }
  }
  useEffect(
    ()=>{
      getShops()
    }
  )
  return (
    <div className='dashboardadmin'>
        <div className={roo+"box1"}>
            <TopBoarSeller onOrders = {setOrders}/>
        </div>
        <div className={roo+""}><ChartBox number={2000+" XAF"} title={"Mes revenus"} icon = {<GiMoneyStack className='text-gray-100 text-4xl'/> }/></div>
        <div className={roo+""}><ChartBox  icon = {<FiShoppingBag className='text-gray-100 text-4xl'/>} number={products} title ="Produits"/></div>
        <div className={roo+"box4"}><TopBoarSeller2 onProducts = {setProducts}/></div>
        <div className={roo+""} ><ChartBox number={orders} title={"Commandes"} icon = {<BsCartCheck className='text-gray-100 text-4xl'/> }/></div>
        <div className={roo+""}><ChartBox number={shops} title={"Boutiques"} icon = {<FaShopify className='text-gray-100 text-4xl'/> }/></div>
        <div className= {roo+" box9"}>
            <h1 className='text-4xl font-bold mb-5 mt-3 text-gray-300'>Commandes</h1>
            <OrdersTable/>
        </div>
        
       

    </div>
  )
}
