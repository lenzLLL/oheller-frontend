import React,{useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { useStateProvider } from '@/context/StateContext'
import axios from 'axios'
import { ADD_SERVICE_MESSAGE, GET_SERVICE_MESSAGES, GET_USER_INFOS } from '@/utils/Constant'
import { BsCheckAll } from 'react-icons/bs'
import TextField from '@mui/material/TextField';
import { reducerCases } from '@/context/Constant'

export default function BuyerMessageContainer() {
  const router = useRouter()
  const {orderId} = router.query
  const [cookies] = useCookies()
  const [runtime,setRuntime] = useState(0)
  const [recipentId,setRecipentId] = useState("")
  const [messageText,setMessageText] = useState("")
  const [messages,setMessages] = useState([])
  const [{showLoginModal,showSignupModal,userInfos,status},dispatch] = useStateProvider()
  const sendMessage = async () => {
    try{
        if(messageText)
        {
          
          const response = await axios.post(`${ADD_SERVICE_MESSAGE}/${orderId}`,{message:messageText,recipentId,date:new Date().getTime()},{withCredentials:true})
          if(response.status === 201)
          {
              getMessage() 
              setMessageText("")
          }
        }    
    }
    catch(err)
    {
      alert(err)
    }
  }
  const getMessage = async () =>{
    try{
        const {data} = await axios.get(`${GET_SERVICE_MESSAGES}/${orderId}`,{withCredentials:true})
        
        if(data.messages)
        {
          let d = data.messages
          for(let i = 0;i<d.length;i++)
          {
            d[i].date = parseInt(d[i].date)
          }
          setMessages(data.messages) 
        }
        setRecipentId(data.recipentId)
         
      }
    catch(err)
    {
      alert(err)
    }
  }
  useEffect(
    ()=>{
        if(cookies.jwt && !userInfos)
        {    const getUserInfos = async () =>{
            
            try{
                const {data:{user}} = await axios.post(GET_USER_INFOS,{},{withCredentials:true})
                let userDatas = {...user}
                dispatch({type:reducerCases.SET_USER,userInfos:userDatas})  
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
      
        
    },[userInfos,cookies]
  )
  useEffect(
    ()=>{
      
          
        if(!isNaN(orderId))
        {
          setTimeout(
            ()=>{
              setRuntime(runtime+1)
              getMessage()
            },5000
          )
        }
          
      

    },[orderId,runtime]
  )
  return (
    <div className='flex justify-center mt-[125px] mb-10'>
        <div className=' flex flex-col justify-center items-end w-[80vw]'>
        
             <div className='max-h-[60vh] h-[500px] overflow-scroll bg-white py-8 px-4 w-[100%]  shadow-xl rounded-md sm:rouned-lg sm:px-10 border flex flex-col'>
                 {
                     messages.map(
                      (message)=>{
                         let date = new Date(message.date)
                          return <div className={`flex mb-2 ${userInfos.id === message.senderId? "justify-end":"jusitfy-start"}`}>
                              <div className={`inline-blog rounded-lg ${message.senderId === userInfos.id?"bg-[#1DBF73] text-white":"bg-gray-100 text-gray-800"} px-4 py-2 max-w- break-all`}>
                                <p>{message.text}</p>
                                <span className={`text-sm ${userInfos.id === message.senderId? 'text-gray-100':'text-gray-600'}`}>
                                    {date.toLocaleString('en-GB')} 
                                </span>
                                <span className=''>
                                    {
                                      message.senderId === userInfos.id && message.isRead &&
                                      <BsCheckAll/>}     
                                </span>
                              </div>  
                          </div>
                      }
                     )
                 }
             </div>
             <div className='mt-8 flex gap-2 w-full justify-end'>
                 <TextField type ="text" placeholder ="Envoyez un message" value ={messageText} onChange={(e)=>setMessageText(e.target.value)}/>
                 <button  className='bg-[#1DBF73] rounded-md text-white rounded- px-4 py-2' onClick={()=>sendMessage()}>
                  Envoyer
                 </button>
             </div>
        </div>
    </div>
  )
}
