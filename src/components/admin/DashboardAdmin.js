import React,{useEffect,useState} from 'react'
import TopBoar from './topBoar'
import ChartBox from './chartBox'
import { FaChartLine, FaShopify, FaUsers } from 'react-icons/fa'
import {LiaBusinessTimeSolid} from "react-icons/lia"
import TopBoar2 from './TopBoar2'
import DataGridDashboardHome from './homeTble'
import axios from "axios"
import { GET_ALL_ADMIN_SONDAGE, GET_ALL_SERVICES, GET_ALL_SERVICES_USER, GET_ALL_SHOPS, GET_ALL_USERS, GET_LAST_LOGIN } from '@/utils/Constant'

export default function DashboardAdmin() {
  const roo ="p-[20px] rounded-[10px] border border-[#384256] text-white flex-1 "
  const [services,setServices] = useState(0)
  const [boutiques,setBoutiques]  = useState(0)
  const [users,setUsers] = useState([])
  const [login,setLogin] = useState([])
  const [sondages,setSondages] = useState(0)
  const [community,setCommunity] = useState(0) 
  const getCommunauty = async () => {
    try{
        const data = await axios.get(GET_ALL_USERS,{withCredentials:true}).then(
            (response)=>{
                   // setShops(response.data.shops)
              setCommunity(response.data.users.length)
            }
        )
    }
    catch(err)
    {
       alert(err)
    }
  }
  const getServices = async () => {
    try{
        const data = await axios.get(GET_ALL_SERVICES,{withCredentials:true}).then(
            (response)=>{
                   // setShops(response.data.shops)
              setServices(response.data.services.length)
            }
        )
    }
    catch(err)
    {
       alert(err)
    }
  }
  const getSondages = async () => {
    try{
        const data = await axios.get(GET_ALL_ADMIN_SONDAGE,{withCredentials:true}).then(
            (response)=>{
                   // setShops(response.data.shops)
              setSondages(response.data.sondages.length)
            }
        )
    }
    catch(err)
    {
       alert(err)
    }
  }
  const getShops = async () =>{
    try{
        const data = await axios.get(GET_ALL_SHOPS,{withCredentials:true}).then(
          (response)=>{
               setBoutiques(response.data.shops.length)
          }
        )   
    }
    catch(err){

    }
  }
  const getLastLogin = async () =>{
    try{
        const data = await axios.get(GET_LAST_LOGIN,{withCredentials:true}).then(
          (response)=>{
               setLogin(response.data.users)
          }
        )   
    }
    catch(err){
    }
  }
  useEffect(
    ()=>{
        getCommunauty()
        getServices()
        getSondages()
        getShops()
        getLastLogin()
    },[]
  )
  return (
    <div className='dashboardadmin'>
        <div className={roo+"box1"}>
            <TopBoar users={login}/>
        </div>
        <div className={roo+""}><ChartBox icon = {<FaUsers className='text-gray-100 text-4xl'/>} title ="Utilisateurs" number={community}/></div>
        <div className={roo+""}><ChartBox icon = {<LiaBusinessTimeSolid className='text-gray-100 text-4xl'/>} number={services} title ="Services"/></div>
        <div className={roo+"box4"}><TopBoar2/></div>
        <div className={roo+""} ><ChartBox number={boutiques} title={"Boutiques"} icon = {<FaShopify className='text-gray-100 text-4xl'/> }/></div>
        <div className={roo+""}><ChartBox number={sondages} title={"Sondages"} icon = {<FaChartLine className='text-gray-100 text-4xl'/> }/></div>
        <div className= {roo+" box9"}>
            <h1 className='text-4xl font-bold mb-5 mt-3 text-gray-300'>Votre Communauté</h1>
            <DataGridDashboardHome/>
        </div>
        
       

    </div>
  )
}
