import { GET_ALL_NOTIFICATIONS, GET_ALL_SHOPS_USER, SET_ALL_READED_NOTIFICATIONS } from '@/utils/Constant'
import React,{useEffect,useState} from 'react'
import axios from "axios"
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function DashboardNoitifications() {
    const [notifications,setNotifications] = useState([])       
    const setAllReadedNotifications = async () => {
        try{
            const response = await axios.put(SET_ALL_READED_NOTIFICATIONS,{},{withCredentials:true})
          }
        catch(err)
        {
             
        }
      
      }
    const getStatus = (value) => {
      if(value==="infos"){
        return "info"
      }
      return "danger"
    }
    const getAllNotifications = async ()=>{
      try{
        const data = await axios.get(GET_ALL_NOTIFICATIONS,{withCredentials:true}).then(
          (response)=>{
              setNotifications(response.data.notifications)
          
          }
      )
 
      }
    catch(err)
    {
        alert(err)
    }
    }
    useEffect(
        ()=>{
            setAllReadedNotifications()
            getAllNotifications()
        },[]
    )
  const roo ="p-[20px] rounded-[10px] border border-[#384256] text-white flex-1 "

    return (
        <>
   <div className='dashboarshop h-full' >
                   <div className= {roo+ " box9"}>
            <div className ="flex justify-between items-center">        
            <h1 className='text-4xl font-bold mb-5 mt-3 text-gray-300'>Notifications</h1>

            </div>

            <div className='bg-white min-h-[90%] overflow-scroll rounded-lg p-10'>
               {
                notifications.length !== 0 && (notifications.map(
                  (n)=>{

                    return <Alert className="mb-3" severity={getStatus(n.type)}><div>
                          <h2 className='font-semibold'>{n.title}</h2>
                          <p>{n.message}</p>
                      </div></Alert>
                  }
                ))
               } 
            </div>


        </div>  
       </div>
      </>
  )
}
