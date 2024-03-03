import React,{useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import {DELETE_SHOP_BY_ID, GET_ALL_CITIES, GET_ALL_PRODUCT_MESSAGES, GET_ALL_SHOPS_USER, REMOVE_CITY } from '@/utils/Constant'
import { DataGrid, GridColDef,GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
export default function DashboardCity() {
   const [cities,setCities] = useState([])
   const router = useRouter()
  const roo ="p-[20px] rounded-[10px] border border-[#384256] text-white flex-1 "
  const deleteCity = async (id) =>{
    var answer = window.confirm("Voulez vous vraiment supprimer ?");
    if (answer) {
        try{

            const response = await axios.delete(REMOVE_CITY+id,{withCredentials:true})
            if(response.status === 200)
            {
              Swal.fire(
                'Ville Supprimée',
                'Ville Supprimée avec success',
                'success'
              ) 
              window.location.reload() 
            }
            else{
              Swal.fire({
                title: 'Error!',
                text: "Une erreur s'est prosuite veillez ressayer",
                icon: 'error',
                confirmButtonText: 'Ok',
                buttonsStyling:"danger"
              }) 
            }
        }
        catch(error)
        {
            alert(error)
        } 
    }
  }
   const columns = [

    { field: 'id', headerName: 'ID', width: 70 ,align:"left",headerAlign:"left"},
    { field: 'region', headerName: 'Region', width: 200,align:"left",headerAlign:"left" },
    { field: 'city', headerName: 'Ville', width: 200,align:"left",headerAlign:"left" },
    {
        field:"Action",
        headerAlign:"left",
        headerName: 'Action',
        flex:1,
        renderCell:(params)=>{
          return <div onClick={()=>deleteCity(params.row.id)} className='bg-red-100 text-red-600 p-2 rounded-md cursor-pointer'>
            
              Supprimer
          </div>
        }
      }
  ];


   const getCities = async () => {
    try{
        const data = await axios.get(GET_ALL_CITIES,{withCredentials:true}).then(
            (response)=>{
                   // setShops(response.data.shops)
              setCities(response.data.cities)
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

      getCities()
    },[]
   )
    return (
        <div className='dashboarshop' >
                   <div className= {roo+" box9"}>
            <div className ="flex justify-between items-center">        
            <h1 className='text-4xl font-bold mb-5 mt-3 text-gray-300'>Villes</h1>
            <button onClick = {()=>router.push("/dashboard/admin/ville/add")} className="bg-appPrimaryColor text-sm py-2 border-[#1DDF73] px-2 rounded-lg shadow-sm text-white">
                Ajouter
            </button>
            </div>
            <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={cities}
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
