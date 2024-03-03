import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { GET_ALL_SERVICES_USER, GET_ALL_WORK_REQUEST_USER, GET_ALL_WORK_REQUEST_WORKER, GET_BUYER_ORDER, GET_USER_INFOS, PARTICIPE_SONDAGE } from '@/utils/Constant'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { useStateProvider } from '@/context/StateContext';
import { PROFIL_FREELANCER, PROFIL_WORKER } from '@/utils/Constants2';
export default function index() {
   const [request,setRequest] = useState([])
   const router = useRouter()
   const [user,setUser] = useState()
   const [{showLoginModal,showSignupModal,userInfos},dispatch] = useStateProvider()  
  const [cookies] = useCookies()
   

  const columns2 = [
    
    { field: 'id', headerName: 'ID', width: 70 ,align:"left",headerAlign:"left"},
    {
        field: 'profession',
        headerName: 'Profession',
        // type: 'number',
        width: 250,
        align :"left",
        renderCell:(params)=>{
          return(
              <p>{params.row.worker.work}</p>
          )
        }
      },
      {
        field: 'localisation',
        headerName: 'Localisation',
        // type: 'number',
        width: 250,
        align :"left",
        renderCell:(params)=>{
          return(
              <p>{params.row.worker.city}, {params.row.worker.quarter}</p>
          )
        }
      },
      {
        field: 'expérience',
        headerName: 'Annnées d\'expériences',
        // type: 'number',
        width: 250,
        align :"left",
        renderCell:(params)=>{
          return(
              <p>{params.row.worker.experience}</p>
          )
        }
      },
      {
        field: 'statut',
        headerName: 'Statut',
        // type: 'number',
        width: 250,
        align :"left",
        renderCell:(params)=>{
          return(
              <p>{params.row.isAgree? "Utilisateur disponible":"En attente d'une réponse"}</p>
          )
        }
      },
      {
         field: 'action',
         headerName: 'Actions',
         // type: 'number',
         width: 300,
         align :"left",
         renderCell:(params)=>{
             var dateNow = parseInt(new Date().getTime())
             return(
             <div style = {{width:200}} className ="flex justify-left gap-3  items-center" >

                <a href = {params.row.worker.url_cv} download><div  className='py-2 px-3 bg-blue-100 rounded-md text-blue-600 font-bold cursor-pointer'>Télécharger le cv</div> </a>
                   
 

          
             </div>
           )
         }
       },
  ];


   const getAllWorkRequest = async () => {
    try{
        
        const data = await axios.get(GET_ALL_WORK_REQUEST_USER,{withCredentials:true}).then(
            (response)=>{
                setRequest(response.data.data) 
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
        if(cookies.jwt)
        {    const getUserInfos = async () =>{
            try{
                const {data:{user}} = await axios.post(GET_USER_INFOS,{},{withCredentials:true})
                setUser(user)
            }
            catch(err)
            {
               console.log(err)
            }
          }
          getUserInfos()
        } 
     getAllWorkRequest()
      
    },[cookies,userInfos]
   )
    return (
        <div className='mt-[120px] flex flex-col px-5 mb-5' >
            <div className='mb-5'>
                <h1 className='font-semibold text-4xl text-[#555]'>Offres d'emploi</h1>
            </div>
        <DataGrid
          rows={request}
          columns={columns2}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
  )
}
