import React,{useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import {DELETE_SHOP_BY_ID, GET_ALL_SELLER_ORDERS_PRODUCT, GET_ALL_SHOPS_USER } from '@/utils/Constant'
import { DataGrid, GridColDef,GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
export default function DasboardProductsOrders() {
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

    { field: 'id', headerName: 'ID', width: 90 },
    {field:"Produit",headerName:"Produit",width:150,renderCell:(params)=>{
      return <span>{params.row.product?.title}</span>
    }},
    {
      field: 'quantity',
      align:"left",
      headerAlign:"left",
      headerName: 'Quantité',
      type:'number',
      width: 100,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Prix(Fcfa)',
      width: 150,
      editable: true,
    },
    {
      field: 'totalPrice',
      headerName: 'Montant Total  (FCFA)',
      width: 150,
      editable: true,
    },
    {
      field: 'status',
      align:"left",
      width:100,
      headerAlign:"left",
      headerName: 'Status',
    },
    {
      field:"Client",
      headerAlign:"left",
      headerName: 'Client',
      width:150,
      renderCell:(params)=>{
        return <div>
            {params.row?.customer?.fullname}
        </div>
      }
    },
    {
        field: 'action',
        headerName: 'Actions',
        // type: 'number',
        width: 230,
        align :"center",
        renderCell:(params)=>{
          return(
            <div style = {{width:230}} className ="flex justify-left gap-3 items-center" >
               <div onClick = {()=>router.push("/dashboard/seller/message/"+params.row.id)} className='py-2 px-3 bg-blue-100 rounded-md text-blue-600 font-bold cursor-pointer'>Discussion</div>
               <div onClick = {()=>router.push("/dashboard/seller/orders/"+params.row.id)}  className='py-2 px-3 bg-purple-100 rounded-md text-purple-600 font-bold cursor-pointer'>Consulter</div>

               
          
            </div>
          )
        }
      },
  ];


 
  const [orders,setOrders] = React.useState([])
  const getSellerOrders = async () => {
    try{
        const response = await axios.get(GET_ALL_SELLER_ORDERS_PRODUCT,{withCredentials:true}).then(
            (response)=>{
                setOrders(response.data.orders)      
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
