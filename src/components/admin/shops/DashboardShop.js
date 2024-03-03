import React,{useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import {DELETE_SHOP_BY_ID, GET_ALL_CITIES, GET_ALL_PRODUCT_MESSAGES, GET_ALL_PROFESSION, GET_ALL_SHOPS, GET_ALL_SHOPS_USER, GET_ALL_USERS, REMOVE_CITY, REMOVE_PROFESSION } from '@/utils/Constant'
import { DataGrid, GridColDef,GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
export default function DashboardShops() {
   const [shops,setShops] = useState([])
   const getShops = async () =>{
    try{
        const data = await axios.get(GET_ALL_SHOPS,{withCredentials:true}).then(
          (response)=>{
               setShops(response.data.shops)
          }
        )   
    }
    catch(err){

    }
  }
   const router = useRouter()
  const roo ="p-[20px] rounded-[10px] border border-[#384256] text-white flex-1 "
const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {field:"img",headerName:"Image",renderCell:(params)=>{
      return <div><img src= {params.row.images[0]} className='cover w-20 h-20 cursor-pointer' style = {{boxShadow:"4px 4px  1px rgba(0,0,0,0.1)"}}/></div>
    }},
    {
      field: 'name',
      headerName: 'Nom',
      width: 150,
      editable: true,
    },
    {
      field: 'secteur',
      headerName: 'Secteur',
      width: 150,
      editable: true,
    },
    {
      field: 'city',
      headerName: 'Résidence',
      width: 150,
      editable: true,
    },

  
  ];
   useEffect(
    ()=>{
      getShops()
    },[]
   )
    return (
        <div className='dashboarshop' >
                   <div className= {roo+" box9"}>
            <div className ="flex justify-between items-center">        
            <h1 className='text-4xl font-bold mb-5 mt-3 text-gray-300'>Boutiques</h1>

            </div>
            <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={shops}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>

        </div>  
       </div>
  )
}
