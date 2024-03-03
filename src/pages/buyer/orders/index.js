import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { GET_ALL_SERVICES_USER, GET_BUYER_ORDER } from '@/utils/Constant'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
export default function index() {
   const [services,setServices] = useState([])
   const router = useRouter()
   const columns = [

    { field: 'id', headerName: 'ID', width: 70 ,align:"left",headerAlign:"left"},
    {
        field: 'service',
        headerName: 'Service',
        // type: 'number',
        width: 250,
        align :"left",
        renderCell:(params)=>{
          return(
              <p>{params.row.service.title}</p>
          )
        }
      },
      {
        field: 'category',
        headerName: 'Catégorie',
        // type: 'number',
        width: 200,
        align :"left",
        renderCell:(params)=>{
          return(
              <p>{params.row.service.category}</p>
          )
        }
      },
    {
      field: 'price',
      headerName: 'Mon Budget (FCFA)',
      type: 'number',
      width: 150,
      align:"left" ,
      headerAlign:"left"
    },
    {
        field: 'date',
        headerName: 'Date',
        // type: 'number',
        width: 200,
        align :"left",
        renderCell:(params)=>{
            var date = new Date(params.row.date)          
            return(
              <p>{date.toLocaleString('en-GB')}</p>
          )
        }
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
               {
                params.row.isActive? <>
                      <div onClick = {()=>router.push("/seller/services/"+params.row.id)} className='py-2 px-3 bg-blue-100 rounded-md text-blue-600 font-bold cursor-pointer'>Modifier</div>
                      <div  className='py-2 px-3 bg-red-100 rounded-md text-red-600 font-bold cursor-pointer'>Annuler</div>
                </> :!params.row.isCompleted?<div onClick = {()=>router.push("/buyer/orders/message/"+params.row.id)} className='py-2 px-3 bg-blue-100 rounded-md text-blue-600 font-bold cursor-pointer'>Discussion</div>
                      :<div onClick = {()=>router.push("/seller/services/"+params.row.id)} className='py-2 px-3 bg-blue-100 rounded-md text-blue-600 font-bold cursor-pointer'>Aucune action</div>

                               }

          
            </div>
          )
        }
      },
  ];


   const getBuyerOrders = async () => {
    try{
        const data = await axios.get(GET_BUYER_ORDER,{withCredentials:true}).then(
            (response)=>{
                let data = response.data.orders
                for(let i = 0;i<data.length;i++)
                {
                    data[i].date = parseInt(data[i].date)  
                }
                setServices(data) 
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

      getBuyerOrders()
    },[]
   )
    return (
        <div className='mt-[120px] flex flex-col px-5 mb-5' >
            <div className='mb-5'>
                <h1 className='font-semibold text-4xl text-[#555]'>Mes commandes</h1>
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
