import React,{useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import {DELETE_SHOP_BY_ID, GET_ALL_SHOPS_USER } from '@/utils/Constant'
import { DataGrid, GridColDef,GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
export default function index() {
   const [shops,setShops] = useState([])
   const router = useRouter()
  const roo ="p-[20px] rounded-[10px] border border-[#384256] text-white flex-1 "
  const deleteShop = async (id,keys,keyCover) =>{
    var answer = window.confirm("Voulez vous vraiment supprimer cette boutique?");
    if (answer) {
        try{

            const response = await axios.post(DELETE_SHOP_BY_ID+"/"+id,{keys,keyCover},{withCredentials:true})
            if(response.status === 200)
            {
              Swal.fire(
                'Boutique Supprimée',
                'Votre profil a été Supprimée avec success',
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
               <div onClick = {()=>router.push("/dashboard/seller/shops/"+params.row.id)} className='py-2 px-3 bg-blue-100 rounded-md text-blue-600 font-bold cursor-pointer'>Modifier</div>
               <div onClick={()=>deleteShop(params.row.id,params.row.keys,params.row.keyCover)}  className='py-2 px-3 bg-red-100 rounded-md text-red-600 font-bold cursor-pointer'>Supprimer</div>
             
          
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
        <div className='dashboarshop' >
                   <div className= {roo+" box9"}>
            <div className ="flex justify-between items-center">        
            <h1 className='text-4xl font-bold mb-5 mt-3 text-gray-300'>Boutiques</h1>
            <button onClick = {()=>router.push("/dashboard/seller/shops/add")} className="bg-[#1DDF73] text-sm py-2 border-[#1DDF73] px-2 rounded-lg shadow-sm text-white">
                Créer Une Boutique
            </button>
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
