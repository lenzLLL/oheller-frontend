import React,{useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import {DELETE_SHOP_BY_ID, GET_ALL_CITIES, GET_ALL_PRODUCT_MESSAGES, GET_ALL_PROFESSION, GET_ALL_SHOPS_USER, REMOVE_CITY, REMOVE_PROFESSION } from '@/utils/Constant'
import { DataGrid, GridColDef,GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
export default function DashboardProfession() {
   const [professions,setProfessions] = useState([])
   const router = useRouter()
  const roo ="p-[20px] rounded-[10px] border border-[#384256] text-white flex-1 "
  const deleteProfession = async (id) =>{
    var answer = window.confirm("Voulez vous vraiment supprimer ?");
    if (answer) {
        try{

            const response = await axios.delete(REMOVE_PROFESSION+id,{withCredentials:true})
            if(response.status === 200)
            {
              Swal.fire(
                'Profession Supprimée',
                'Profession Supprimée avec success',
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
    { field: 'secteur', headerName: 'Secteur d\'activité', width: 200,align:"left",headerAlign:"left" },
    { field: 'profession', headerName: 'Profession', width: 200,align:"left",headerAlign:"left" },
    {
        field:"Action",
        headerAlign:"left",
        headerName: 'Action',
        flex:1,
        renderCell:(params)=>{
          return <div onClick={()=>deleteProfession(params.row.id)} className='bg-red-100 text-red-600 p-2 rounded-md cursor-pointer'>
            
              Supprimer
          </div>
        }
      }
  ];


   const getProfession = async () => {
    try{
        const data = await axios.get(GET_ALL_PROFESSION,{withCredentials:true}).then(
            (response)=>{
                   // setShops(response.data.shops)
              setProfessions(response.data.professions)
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

      getProfession()
    },[]
   )
    return (
        <div className='dashboarshop' >
                   <div className= {roo+" box9"}>
            <div className ="flex justify-between items-center">        
            <h1 className='text-4xl font-bold mb-5 mt-3 text-gray-300'>Professions</h1>
            <button onClick = {()=>router.push("/dashboard/admin/profession/add")} className="bg-appPrimaryColor text-sm py-2 border-[#1DDF73] px-2 rounded-lg shadow-sm text-white">
                Ajouter
            </button>
            </div>
            <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={professions}
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
