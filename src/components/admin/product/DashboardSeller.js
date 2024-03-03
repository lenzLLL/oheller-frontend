import React from 'react'
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

export default function DashboardSeller() {
  const roo ="p-[20px] rounded-[10px] border border-[#384256] text-white flex-1 "
    return (
    <div className='dashboardadmin'>
        <div className={roo+"box1"}>
            <TopBoarSeller/>
        </div>
        <div className={roo+""}><ChartBox number={23} title={"Mes revenus"} icon = {<GiMoneyStack className='text-gray-100 text-4xl'/> }/></div>
        <div className={roo+""}><ChartBox icon = {<FiShoppingBag className='text-gray-100 text-4xl'/>} number={23} title ="Produits"/></div>
        <div className={roo+"box4"}><TopBoarSeller2/></div>
        <div className={roo+""} ><ChartBox number={23} title={"Commandes"} icon = {<BsCartCheck className='text-gray-100 text-4xl'/> }/></div>
        <div className={roo+""}><ChartBox number={23} title={"Boutiques"} icon = {<FaShopify className='text-gray-100 text-4xl'/> }/></div>
        <div className= {roo+" box9"}>
            <h1 className='text-4xl font-bold mb-5 mt-3 text-gray-300'>Commandes</h1>
            <OrdersTable/>
        </div>
        
       

    </div>
  )
}
