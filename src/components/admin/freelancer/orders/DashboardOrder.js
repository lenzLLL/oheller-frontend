import React,{useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import {DELETE_SERVICE_BY_ID, DELETE_SHOP_BY_ID, GET_ALL_SERVICES_USER, GET_ALL_SHOPS_USER, GET_SELLER_ORDER, UPDATE_SERVICE_ORDER } from '@/utils/Constant'
import { DataGrid, GridColDef,GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
export default function DashboardOrder() {
   const [orders,setOrders] = useState([])
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

  const editOrder = async (status,orderId) => {
    
    try{
        
        const response = await axios.put(UPDATE_SERVICE_ORDER+orderId,{status},{withCredentials:true})
        if(response.status === 201)
        {
          Swal.fire(
            'Opération terminée',
            'La commande est enregistré comme livrée!',
            'success'
          )
          window.location.reload()  
        }
      }
    catch(err)
    {
       alert(err)
        Swal.fire({
            title: 'Error!',
            text: "Une erreur s'est produite veillez recommencer!",
            icon: 'error',
            confirmButtonText: 'Ok',
            buttonsStyling:"danger"
          }) 
    }
  }

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
        field: 'description',
        headerName: 'Description',
        // type: 'number',
        width: 200,
        align :"left",
      },
      {
        field: 'status',
        headerName: 'Statut',
        // type: 'number',
        width: 200,
        align :"left",
      },
    {
      field: 'price',
      headerName: 'Budget du client (FCFA)',
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
        width: 250,
        align :"center",
        renderCell:(params)=>{
          return(
            <div style = {{width:250}} className ="flex justify-left gap-3 items-center" >
               {
                params.row.status === "En attente"? <>
                      <div onClick = {()=>router.push("/seller/services/"+params.row.id)} className='py-2 px-3 bg-blue-100 rounded-md text-blue-600 font-bold cursor-pointer'>Activer</div>
                      <div onClick = {()=>editOrder("Rejeté",params.row.id)}  className='py-2 px-3 bg-red-100 rounded-md text-red-600 font-bold cursor-pointer'>Rejeter</div>
                </> :params.row.status === "En cours"?<>  <div onClick = {()=>router.push("/dashboard/freelancer/message/"+params.row.id)} className='py-2 px-3 bg-blue-100 rounded-md text-blue-600 font-bold cursor-pointer'>Discussion</div>
               <div onClick = {()=>router.push("/dashboard/freelancer/orders/"+params.row.id)}  className='py-2 px-3 bg-purple-100 rounded-md text-purple-600 font-bold cursor-pointer'>Informations</div>
                             </>
                      :params.row.status === "Livré"?<div onClick = {()=>router.push("/dashboard/freelancer/orders/"+params.row.id)} className='py-2 px-3 bg-purple-100 rounded-md text-purple-600 font-bold cursor-pointer'>Informations</div>:<div className='py-2 px-3 bg-blue-100 rounded-md text-blue-600 font-bold cursor-pointer'>Aucune action</div>

                               }

          
            </div>
          )
        },
      }
  ];

  const getSellerOrders = async () => {
    try{
        const data = await axios.get(GET_SELLER_ORDER,{withCredentials:true}).then(
            (response)=>{
              let data = response.data.orders
              for(let i = 0;i<data.length;i++)
              {
                  data[i].date = parseInt(data[i].date)  
              }
              setOrders(data) 
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

      getSellerOrders()
    },[]
   )
    return (
        <div className='dashboarshop' >
                   <div className= {roo+" box9"}>
            <div className ="flex justify-between items-center">        
            <h1 className='text-4xl font-bold mb-5 mt-3 text-gray-300'>Commandes</h1>
      
            </div>
            <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={orders}
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
