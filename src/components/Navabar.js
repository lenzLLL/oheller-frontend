import Link from 'next/link'
import React,{useState,useEffect} from 'react'
import { useStateProvider } from '@/context/StateContext'
import {AiOutlineShoppingCart,AiOutlineHeart} from "react-icons/ai"
import {IoSearchCircleOutline}from "react-icons/io5"
import {BsFillCartFill} from "react-icons/bs"
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { IoDocumentTextOutline } from "react-icons/io5";
import { GET_ALL_LIKED, GET_USER_INFOS, HOST } from '@/utils/Constant'
import { reducerCases } from '@/context/Constant'
import {RiNotification3Line,RiNotification3Fill} from "react-icons/ri"
import {BiMessage,BiSolidMessage} from "react-icons/bi"
import ProfileOver from './ProfileOver'
import Image from 'next/image'
import AuthWrapper from './AuthWrapper'
import Sidebar from './sidebar'

export default function Navabar() {
    
    const [liked,setLiked] = useState([])
    const handlerLogin = () => {
        if(showSignupModal)
        {
            dispatch({type:reducerCases.TOGGLE_SIGNUP_MODAL,showSignupModal:false})   
             }
        
            dispatch({type:reducerCases.TOGGLE_LOGIN_MODAL,showLoginModal:true})   
        
    }
    const handlerSignUp = () => {
        if(showLoginModal)
        {
            dispatch({type:reducerCases.TOGGLE_LOGIN_MODAL,showLoginModal:false})   
             }
        
            dispatch({type:reducerCases.TOGGLE_SIGNUP_MODAL,showSignupModal:true})  
    }
    const router = useRouter()
    const [cookies] = useCookies()
    const [{showLoginModal,showSignupModal,userInfos,status},dispatch] = useStateProvider()
    const [isLoading,setIsLoading] = useState(false)
    const [isFixed,setIsFixed] = useState(false)
    const [currentImage,setCurrentImage] = useState("")
    const [isNavigate,setIsNavigate] = useState(false)
    const [searchData,setSearchData] = useState("")
    const [isHover,setIsHover] = useState(false)
    const getLiked = async () => {
        try{
            const data = await axios.get(GET_ALL_LIKED,{withCredentials:true}).then(
                (response)=>{
            
                    setLiked(response.data.liked)
                  
                }
            )
       
            
            
        }
        catch(err)
        {
            alert(err)
        }
      } 
    const link = [  
      {linkName:"Services",handler:"/services",type:"link"},
      {linkName:"Boutiques",handler:"/shops",type:"link"},
      {linkName:"Experts",handler:"/experts",type:"link"},
      {linkName:"Se connecter",handler:handlerLogin,type:"button"},
      {linkName:"Rejoindre",handler:handlerSignUp,type:"button2"},
    ]
const handleOrder = () => {
    if(status !== "user")
    {
        router.push("/seller/orders")
    }
    router.push("/buyer/orders")    
}
const [cart,setCart] = useState([])
useEffect(
    ()=>{
        if(localStorage.getItem("cart"))
        {
            setCart(JSON.parse(localStorage.getItem("cart")))
        }
        if(router.pathname === "/")
        {
            const positionNavbar = () => {
                window.pageYOffset > 0? setIsFixed(true):setIsFixed(false)
            }
            window.addEventListener("scroll",positionNavbar)
            return ()=> window.removeEventListener("scroll",positionNavbar)   
        }
        else{
            setIsFixed(true) 
        }
    },[router.pathname]
)  
useEffect(
    ()=>{
        if(cookies.jwt && !userInfos)
        {   
        getLiked()
            
            const getUserInfos = async () =>{
            
            try{
                
                const {data:{user}} = await axios.post(GET_USER_INFOS,{},{withCredentials:true})
                let userDatas = {...user}
                dispatch({type:reducerCases.SET_USER,userInfos:userDatas})
                if(user.url_image){
                    setCurrentImage(user.url_image)              
                }
             
                    if(user.isProfilInfosSet === false)
                    {
                        router.push("/profil")
                    }   
            }
            catch(err)
            {
               console.log(err)
            }

           }
           getUserInfos()
           
        }
        else{
        }
        setIsLoading(true)
        
    },[userInfos,cookies]
  )
  
  return (
    <>
       {
        (showLoginModal||showSignupModal) && <AuthWrapper type = {showLoginModal?"login":"signup"}/>
      } 
        {
                <nav className={`flex w-full px-3 xl:hidden justify-between items-center py-3 top-0 z-30 transition-all duration-300 ${isFixed? "fixed bg-white border-b border-gray-200":"absolute border-none bg-transparent border-transparent"}`}>
                    <Link href ="/">
                            <h1 className={`text-3xl font-bold ${!isFixed?"text-white":"text-[#555]"}`}><Image width={100} height={100} src ="/logo/logo-1.png"/></h1> 
                        </Link>
                 
                        <Sidebar  user = {userInfos} liked = {liked.length} cart = {cart.length} isFixed={isFixed} onHandlerSignIn={handlerSignUp} onHandlerSignUp={handlerSignUp} items={link}/>
                
                </nav>
        }      
        {
            isLoading && (
                <nav className={`hidden w-full px-10 xl:flex justify-between items-center py-6 top-0 z-30 transition-all duration-300 ${isFixed? "fixed bg-white border-b border-gray-200":"absolute border-none bg-transparent border-transparent"}`}>
                    {isHover && <ProfileOver user = {userInfos} onHover = {setIsHover}/>}
                    <div>
                        <Link href ="/">
                            <h1 className={`text-3xl font-bold ${!isFixed?"text-white":"text-[#555]"}`}><Image width={100} height={100} src ="/logo/logo-1.png"/></h1> 
                        </Link>
                    </div>
                    { isFixed &&
                    <div className={`flex ${isFixed||userInfos? "opacity-100":"opacity-0"}`}>
                       <input type ="text" placeholder="Quel service recherchez vous?" value = {searchData} className = "w-[27rem] py-2.5 px-4 border" onChange={(e)=>setSearchData(e.target.value)}/>
                    <button onClick = {()=>{router.push(`/search-service?q=${searchData}`) }} className='bg-gray-900 py-1.5 text-white w-16 flex items-center justify-center'>
                        <IoSearchCircleOutline className='w-6 h-6 fill-white text-white'/>    
                        </button> 
                    </div>}
                    
                    { !userInfos?
                        
                            <ul className='hidden xl:flex item-center justify-center gap-5'>
                                {
                                    link.map(
                                        ({linkName,type,handler})=>{
                                            return <li key = {linkName} className={`flex items-center justify-center ${isFixed? "text-base":"text-white"} font-medium`}>
                                                {
                                                    type === "link" && <Link href = {handler}>{linkName}</Link> 
                                                }
                                                                                                {
                                                    type === "button" && <button onClick = {handlerLogin}>{linkName}</button> 
                                                }
                                                                                                                                                {
                                                    type === "button2" && <button onClick = {handlerSignUp} className={`border text-md font-semibold py-1 px-3 rounded-sm ${isFixed? "border-appPrimaryColor text-appPrimaryColor hover:bg-appPrimaryColor hover:text-white":"border-white text-white hover:bg-white hover:text-[#555]"}`} >{linkName}</button> 
                                                }
                                            </li>
                                        }
                                    )
                                }
                            </ul>:<ul className='hidden xl:flex item-center justify-center gap-5'>
                                {
                                    <li className='flex items-center gap-5'>
                                    
                                           <div className='relative' onClick={()=>router.push("/cart")}>
                                               {
                                                isFixed? <AiOutlineShoppingCart className={`cursor-pointer text-2xl flex items-center justify-center ${isFixed? "text-[#535252]":"text-white"} font-medium`}/>:<AiOutlineShoppingCart className={`cursor-pointer text-2xl flex items-center justify-center ${isFixed? "text-[#535252]":"text-white"} font-medium`}/>
                                               } 
                                               < div className='w-[20px] h-[20px] text-white flex items-center justify-center rounded-full absolute -top-2 text-[10px] -right-3 shadow-sm bg-red-400'>
                                                         {cart.length}
                                               </div>
                                           </div>
                                           <div className='relative' onClick={()=>router.push("/liked")}>
                                               {
                                                isFixed? <AiOutlineHeart className={`cursor-pointer text-2xl flex items-center justify-center ${isFixed? "text-[#535252]":"text-white"} font-medium`}/>:<AiOutlineHeart className={`cursor-pointer text-2xl flex items-center justify-center ${isFixed? "text-[#535252]":"text-white"} font-medium`}/>
                                               } 
                                               <div className='w-[20px] h-[20px] text-white flex items-center justify-center rounded-full absolute -top-2 text-[10px] -right-3 shadow-sm bg-red-400'>
                                                         {liked.length}
                                               </div>
                                           </div>
                                           
                                         
                                   
                                    </li>
                                }
                                        <li onClick = {()=>router.push("/services")} className={`cursor-pointer flex items-center justify-center ${isFixed? "text-base":"text-white"} font-medium`}>Services</li>
                                        <li onClick = {()=>router.push("/shops")} className={`cursor-pointer flex items-center justify-center ${isFixed? "text-base":"text-white"} font-medium`}>Boutiques</li>                                                 
                                        <li onClick = {()=>router.push("/experts")} className={`cursor-pointer flex items-center justify-center ${isFixed? "text-base":"text-white"} font-medium`}>Experts</li>                                                 

                                <li className='cursor-pointer' onClick = {(e)=>{e.stopPropagation()}}>
                                    {
                                        userInfos?.url_image ? (<Image onClick = {()=>setIsHover(!isHover)} src = {userInfos.url_image} width={40} height={40} className='rounded-full'/>):(<div onClick = {()=>setIsHover(!isHover)} className='bg-purple-500 h-10 w-10 p-0 flex items-center justify-center rounded-full relative'>
                                            <span onMouseClick = {()=>setIsHover(!isHover)}  className='m-0 p-0 w-40 h-40 flex items-center justify-center text-xl text-white'>
                                                {
                                                    userInfos.email[0].toUpperCase()
                                                }
                                            </span>
                                        </div>)
                                    }
                                </li>     
                            </ul>
                        
                    }

                    
                </nav>
            )
        }
    </>
  )
}
