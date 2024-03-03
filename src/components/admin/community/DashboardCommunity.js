import React,{useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import {DELETE_SHOP_BY_ID, GET_ALL_CITIES, GET_ALL_PRODUCT_MESSAGES, GET_ALL_PROFESSION, GET_ALL_SHOPS_USER, GET_ALL_USERS, REMOVE_CITY, REMOVE_PROFESSION } from '@/utils/Constant'
import { DataGrid, GridColDef,GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
export default function DashboardCommunity() {
   const [community,setCommunity] = useState([])
   const getCommunauty = async () => {
    try{
        const data = await axios.get(GET_ALL_USERS,{withCredentials:true}).then(
            (response)=>{
                   // setShops(response.data.shops)
              setCommunity(response.data.users)
            }
        )
    }
    catch(err)
    {
       
    }
  }
   const router = useRouter()
  const roo ="p-[20px] rounded-[10px] border border-[#384256] text-white flex-1 "
//   const deleteProfession = async (id) =>{
//     var answer = window.confirm("Voulez vous vraiment supprimer ?");
//     if (answer) {
//         try{

//             const response = await axios.delete(REMOVE_PROFESSION+id,{withCredentials:true})
//             if(response.status === 200)
//             {
//               Swal.fire(
//                 'Profession Supprimée',
//                 'Profession Supprimée avec success',
//                 'success'
//               ) 
//               window.location.reload() 
//             }
//             else{
//               Swal.fire({
//                 title: 'Error!',
//                 text: "Une erreur s'est prosuite veillez ressayer",
//                 icon: 'error',
//                 confirmButtonText: 'Ok',
//                 buttonsStyling:"danger"
//               }) 
//             }
//         }
//         catch(error)
//         {
//             alert(error)
//         } 
//     }
//   }
const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {field:"img",headerName:"Profil",renderCell:(params)=>{
      return <div><img src= {params.row.url_image? params.row.url_image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9O7HbbLWRQ8VtYn8U_9eg62OxilLQ7z6pNzJYgrMHbTDmeeKmTV3t&usqp=CAE&s" } className='cover rounded-full w-10 h-10 border border-green-300 border-2 cursor-pointer' style = {{boxShadow:"4px 4px  1px rgba(0,0,0,0.1)"}}/></div>
    }},
    {
      field: 'fullname',
      headerName: 'Nom',
      width: 150,
      editable: true,
    },
    {
      field: 'contact',
      headerName: 'Contact',
      width: 150,
      editable: true,
    },
    {
      field: 'city',
      headerName: 'Résidence',
      width: 150,
      editable: true,
    },
    {
      field: 'accountType',
      headerName: 'activité',
      width: 150,
      editable: true,
    },
    {
      field: 'earning',
      headerName: 'Earning (XAF)',
      type: 'number',
      width: 110,
      editable: false,
      align:'left'
    },
  
  ];
   useEffect(
    ()=>{
      getCommunauty()
    },[]
   )
    return (
        <div className='dashboarshop' >
                   <div className= {roo+" box9"}>
            <div className ="flex justify-between items-center">        
            <h1 className='text-4xl font-bold mb-5 mt-3 text-gray-300'>Communauté</h1>

            </div>
            <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={community}
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
