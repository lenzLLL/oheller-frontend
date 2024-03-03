import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { GET_ALL_SERVICES_USER } from '@/utils/Constant'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
export default function index() {
   const [services,setServices] = useState([])
   const router = useRouter()
   const columns = [

    { field: 'id', headerName: 'ID', width: 70 ,align:"left",headerAlign:"left"},
    {
        field: 'couverture',
        headerName: 'Couverture',
        headerAlign:"left",
        // type: 'number',
        width: 200,
        align :"center",
        renderCell:(params)=>{
          return(
           
             <img src = {params.row.images[0]} className='w-25 h-25 rounded-2xl'/>
          
    
          )
        }
      },
    { field: 'title', headerName: 'Nom', width: 200,align:"left",headerAlign:"left" },
    { field: 'category', headerName: 'Catégorie', width: 200,align:"left" ,headerAlign:"left" },
    {
      field: 'price',
      headerName: 'Prix (FCFA)',
      type: 'number',
      width: 100,
      align:"left" ,
      headerAlign:"left"
    },
    {
        field: 'time',
        headerName: 'Livraison (Jours)',
        type: 'number',
        width: 100,
        align:"left" ,
        headerAlign:"left"
      },
      {
        field: 'action',
        headerName: 'Actions',
        // type: 'number',
        width: 200,
        align :"center",
        renderCell:(params)=>{
          return(
            <div style = {{width:200}} className ="flex justify-left gap-3 items-center" >
               <div onClick = {()=>router.push("/seller/services/"+params.row.id)} className='py-2 px-3 bg-blue-100 rounded-md text-blue-600 font-bold cursor-pointer'>Modifier</div>
               <div  className='py-2 px-3 bg-red-100 rounded-md text-red-600 font-bold cursor-pointer'>Supprimer</div>
             
          
            </div>
          )
        }
      },
  ];


   const getUserServices = async () => {
    try{
        const data = await axios.get(GET_ALL_SERVICES_USER,{withCredentials:true}).then(
            (response)=>{
                setServices(response.data.services) 
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

      getUserServices()
    },[]
   )
    return (
        <div className='mt-[120px] flex flex-col px-5 mb-5' >
            <div className='mb-5'>
                <h1 className='font-semibold text-4xl text-[#555]'>Vos sevices</h1>
            </div>
        <DataGrid
          rows={services}
          columns={columns}
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
