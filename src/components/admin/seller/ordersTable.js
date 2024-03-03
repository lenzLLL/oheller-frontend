import React,{useState,useEffect} from "react"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { GET_ALL_SELLER_ORDERS_PRODUCT, GET_SELLER_ORDER } from "@/utils/Constant";
import axios from 'axios'
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
    flex:1,
    renderCell:(params)=>{
      return <div>
        
          {params.row.customer.fullname}
      </div>
    }
  }
];

export default function OrdersTable() {
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
React.useEffect(
  ()=>{
      getSellerOrders()
  },[]
)
  return (
    <Box        sx={{
        height: "90%", width: '100%',color:"white",
        "& .MuiDataGrid-root": {
          border: "1px solid white",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "1px solid white",
        },
        "& .name-column--cell": {
          color: "white",
        },
        "& .MuiCheckbox-root": {
          color: `white !important`,
        },
      }}>
      <DataGrid
         sx={{
            boxShadow: 2,
            border: 2,
            '& .hot': {
                backgroundColor: '#ff943975',
                color: '#1a3e72',
              },
              '& .cold': {
                backgroundColor: '#b9d5ff91',
                color: '#1a3e72',
              },
            '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
                color: "white",
                fontWeight: 700,
             },
            borderColor: 'white',
            '& .MuiDataGrid-cell:hover': {
              color: '#8884d8',
            },
            color:"white"
          }}
        rows={orders}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        pageSizeOptions={[15]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}