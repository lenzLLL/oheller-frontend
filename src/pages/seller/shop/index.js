import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {GET_ALL_SHOPS_USER } from '@/utils/Constant'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
export default function index() {
   const [shops,setShops] = useState([])
   const router = useRouter()
   const columns = [

    { field: 'id', headerName: 'ID', width: 70 ,align:"left",headerAlign:"left"},
    {
        field: 'cover',
        headerName: 'Couverture',
        headerAlign:"left",
        // type: 'number',
        width: 200,
        align :"center",
        renderCell:(params)=>{
          return(
           
             <img src = {params.row.cover} className='w-25 h-25 rounded-2xl'/>
          

          )
        }
      },
    { field: 'name', headerName: 'Nom', width: 200,align:"left",headerAlign:"left" },
    { field: 'secteur', headerName: 'Secteur', width: 200,align:"left" ,headerAlign:"left" },
    { field: 'type', headerName: 'Type de produit', width: 200,align:"left" ,headerAlign:"left" },
    
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


   const getUserShops = async () => {
    try{
        const data = await axios.get(GET_ALL_SHOPS_USER,{withCredentials:true}).then(
            (response)=>{
                setShops(response.data.shops)
            
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

      getUserShops()
    },[]
   )
    return (
        <div className='mt-[120px] flex flex-col px-5 mb-5' >
            <div className='mb-5'>
                <h1 className='font-semibold text-4xl text-[#555]'>Mes boutiques</h1>
            </div>
        <DataGrid
          rows={shops}
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
