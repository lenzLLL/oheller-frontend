import React,{useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import {DELETE_SERVICE_BY_ID, DELETE_SHOP_BY_ID, DELETE_SONDAGE_BY_ID, GET_ALL_ADMIN_SONDAGE, GET_ALL_SERVICES_USER, GET_ALL_SHOPS_USER, GET_ALL_SONDAGES, GET_SELLER_ORDER, UPDATE_SERVICE_ORDER } from '@/utils/Constant'
import { DataGrid, GridColDef,GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
export default function DashboardAdminSondage() {
   const [sondages,setSondages] = useState([])
   const router = useRouter()
  const roo ="p-[20px] rounded-[10px] border border-[#384256] text-white flex-1 "
  const deleteSondageById = async (id) =>{
    var answer = window.confirm("Voulez vous vraiment supprimer ce sondage?");
    if (answer) {
        try{

            const response = await axios.delete(DELETE_SONDAGE_BY_ID+id,{withCredentials:true})
            if(response.status === 200)
            {
              Swal.fire(
                'Sondage Supprimé',
                'Votre sondage a été Supprimée avec success',
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
      field: 'title',
      headerName: 'Sondage',
      // type: 'number',
      width: 200,
      align :"left",
    },
    {
        field: 'client',
        headerName: 'Client',
        // type: 'number',
        width: 200,
        align :"left",
        renderCell:(params)=>{
            return <h2>{params.row?.customer?.fullname}</h2>
        }
      },
    {
        field: 'Date de lancement',
        headerName: 'Date de lancement',
        // type: 'number',
        width: 250,
        align :"left",
        renderCell:(params)=>{
          var date = new Date(parseInt(params.row.dateInit))          
          return(
            <p>{date.toLocaleString('en-GB')}</p>
          )
      },
    },
      {
        field: 'Date de fin',
        headerName: 'Date de fin',
        // type: 'number',
        width: 250,
        align :"left",
        renderCell:(params)=>{
          var date = new Date(parseInt(params.row.dateExpire))          
          return(
            <p>{date.toLocaleString('en-GB')}</p>
          )
      }
      },
      {
        field: 'status',
        headerName: 'Statut',
        // type: 'number',
        width: 200,
        align :"left",
      },
      {
        field: 'participants',
        headerName: 'participants',
        // type: 'number',
        width: 200,
        align :"left",
        renderCell:(params)=>{
            return <span>{params.row?.users?.length}/{params?.row?.participants}</span>  
        }
      },
    {
      field: 'Montant',
      headerName: 'Montant du sondage (FCFA)',
      type: 'number',
      width: 150,
      align:"left" ,
      headerAlign:"left",
      renderCell:(params)=>{
        return <span>{params.row.status === "En attente"? "En attente":params.row.montant} FCFA</span>  
    }
    },

      {
        field: 'action',
        headerName: 'Actions',
        // type: 'number',
        width: 250,
        align :"center",
        renderCell:(params)=>{
          return(
            <div style = {{width:250}} className ="flex justify-left gap-3 items-center" >
               {
                params.row.status === "En attente" || params.row.status === "En attente de paiement"? <>
                      <div onClick = {()=>router.push("/dashboard/sondages/sondage-infos-update/"+params.row.id)} className='py-2 px-3 bg-blue-100 rounded-md text-blue-600 font-bold cursor-pointer'>Inspecter</div>
                      <div onClick = {()=>deleteSondageById(params.row.id)}  className='py-2 px-3 bg-red-100 rounded-md text-red-600 font-bold cursor-pointer'>Supprimer</div>
                </> :!params.row.status === "En cours"?<>  <div onClick = {()=>router.push("/dashboard/freelancer/message/"+params.row.id)} className='py-2 px-3 bg-blue-100 rounded-md text-blue-600 font-bold cursor-pointer'>Discussion</div>
               <div onClick = {()=>router.push("/dashboard/freelancer/orders/"+params.row.id)}  className='py-2 px-3 bg-purple-100 rounded-md text-purple-600 font-bold cursor-pointer'>Inspecter</div>
                             </>
                      :params.row.status === "Terminé"?<div onClick = {()=>router.push("/dashboard/freelancer/orders/"+params.row.id)} className='py-2 px-3 bg-purple-100 rounded-md text-purple-600 font-bold cursor-pointer'>Stopper</div>:<div className='py-2 px-3 bg-blue-100 rounded-md text-blue-600 font-bold cursor-pointer'>Inspecter</div>

                               }

          
            </div>
          )
        },
      }
  ];

  const getSondages = async () => {
    try{
        const data = await axios.get(GET_ALL_ADMIN_SONDAGE,{withCredentials:true}).then(
            (response)=>{
                setSondages(response.data.sondages)
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

      getSondages()
    },[]
   )
    return (
        <div className='dashboarshop' >
                   <div className= {roo+" box9"}>
            <div className ="flex justify-between items-center">        
            <h1 className='text-4xl font-bold mb-5 mt-3 text-gray-300'>Sondages</h1>

            </div>
            <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={sondages}
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
