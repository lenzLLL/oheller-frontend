import axios from "axios"
import { GET_ALL_USERS } from '@/utils/Constant';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {useState,useEffect} from "react"
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

const rows = [
  { id: 1,url_image:"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",fullname: 'Younda Lenz', contact: '671434007', city: "Yaoundé",accountType:"Freelancer",earning:1000 },
  { id: 2,url_image:"https://images.pexels.com/photos/9222625/pexels-photo-9222625.jpeg?auto=compress&cs=tinysrgb&w=600",fullname: 'Younda Lenz', contact: '671434007', city: "Yaoundé",accountType:"Freelancer",earning:1000 },
  { id: 3,url_image:"https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&h=204&fit=crop&w=228&dpr=1",fullname: 'Younda Lenz', contact: '671434007', city: "Yaoundé",accountType:"Freelancer",earning:1000 },
  { id: 4,url_image:"https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=600",fullname: 'Younda Lenz', contact: '671434007', city: "Yaoundé",accountType:"Freelancer",earning:1000 },
  { id: 5,url_image:"https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600",fullname: 'Younda Lenz', contact: '671434007', city: "Yaoundé",accountType:"Freelancer",earning:1000 },
  { id: 6,url_image:"https://images.pexels.com/photos/428361/pexels-photo-428361.jpeg?auto=compress&cs=tinysrgb&w=600",fullname: 'Younda Lenz', contact: '671434007', city: "Yaoundé",accountType:"Freelancer",earning:1000 },
  { id: 7,url_image:"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",fullname: 'Younda Lenz', contact: '671434007', city: "Yaoundé",accountType:"Freelancer",earning:1000 },
  { id: 8,url_image:"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",fullname: 'Younda Lenz', contact: '671434007', city: "Yaoundé",accountType:"Freelancer",earning:1000 },
  { id: 9,url_image:"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",fullname: 'Younda Lenz', contact: '671434007', city: "Yaoundé",accountType:"Freelancer",earning:1000 },
  { id: 10,url_image:"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",fullname: 'Younda Lenz', contact: '671434007', city: "Yaoundé",accountType:"Freelancer",earning:1000 },
  { id: 11,url_image:"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",fullname: 'Younda Lenz', contact: '671434007', city: "Yaoundé",accountType:"Freelancer",earning:1000 },
  { id: 12,url_image:"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",fullname: 'Younda Lenz', contact: '671434007', city: "Yaoundé",accountType:"Freelancer",earning:1000 },
  { id: 13,url_image:"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",fullname: 'Younda Lenz', contact: '671434007', city: "Yaoundé",accountType:"Freelancer",earning:1000 },
  

];



export default function DataGridDashboardHome() {
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
       alert(err)
    }
  }
  useEffect(
    ()=>{
        getCommunauty()
    },[]
  )
  return (
    <Box sx={{ height: "90%", width: '100%',color:"white" }}>
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
        rows={community}
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