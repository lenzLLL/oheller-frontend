import React,{useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import {DELETE_SERVICE_BY_ID, DELETE_SHOP_BY_ID, GET_ALL_SERVICES_USER, GET_ALL_SHOPS_USER } from '@/utils/Constant'
import { DataGrid, GridColDef,GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
export default function DashboardService() {
   const [services,setServices] = useState([])
   const router = useRouter()
  const roo ="p-[20px] rounded-[10px] border border-[#384256] text-white flex-1 "
  const deleteService = async (id,keys) =>{
    var answer = window.confirm("Voulez vous vraiment supprimer ce service?");
    if (answer) {
        try{

            const response = await axios.post(DELETE_SERVICE_BY_ID+id,{keys},{withCredentials:true})
            if(response.status === 200)
            {
              Swal.fire(
                'Service Supprimé',
                'Votre service a été Supprimée avec success',
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
               <div onClick = {()=>router.push("/dashboard/freelancer/services/"+params.row.id)} className='py-2 px-3 bg-blue-100 rounded-md text-blue-600 font-bold cursor-pointer'>Modifier</div>
               <div onClick={()=>deleteService(params.row.id,params.row.keys)}  className='py-2 px-3 bg-red-100 rounded-md text-red-600 font-bold cursor-pointer'>Supprimer</div>
             
          
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
        <div className='dashboarshop' >
                   <div className= {roo+" box9"}>
            <div className ="flex justify-between items-center">        
            <h1 className='text-4xl font-bold mb-5 mt-3 text-gray-300'>Serivces</h1>
            <button onClick = {()=>router.push("/dashboard/freelancer/services/add")} className="bg-appPrimaryColor text-sm py-2 border-appPrimaryColor px-2 rounded-lg shadow-sm text-white">
                Créer Un service
            </button>
            </div>
            <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={services}
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
