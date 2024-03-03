import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { GET_ALL_BUYER_ORDERS_PRODUCT, GET_ALL_SERVICES_USER, GET_BUYER_ORDER } from '@/utils/Constant'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
export default function index() {
   const [orders,setOrders] = useState([])
   const router = useRouter()
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
            {params.row?.shop?.createdBy?.fullname}
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
               <div onClick = {()=>router.push("/buyer/products/orders/message/"+params.row.id)} className='py-2 px-3 bg-blue-100 rounded-md text-blue-600 font-bold cursor-pointer'>Discussion</div>
               <div onClick={()=>deleteShop(params.row.id,params.row.keys,params.row.keyCover)}  className='py-2 px-3 bg-red-100 rounded-md text-red-600 font-bold cursor-pointer'>Annuler</div>
            </div>
          )
        }
      },
  ];


   const getBuyerOrders = async () => {
    try{
        const data = await axios.get(GET_ALL_BUYER_ORDERS_PRODUCT,{withCredentials:true}).then(
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
      getBuyerOrders()

    },[]
   )
    return (
        <div className='mt-[120px] flex flex-col px-5 mb-5' >
            <div className='mb-5'>
                <h1 className='font-semibold text-4xl text-[#555]'>Mes commandes</h1>
            </div>
        <DataGrid
          rows={orders}
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
