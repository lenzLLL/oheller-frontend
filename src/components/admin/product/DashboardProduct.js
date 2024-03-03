import React,{useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import {DELETE_PRODUCT_BY_ID, DELETE_SHOP_BY_ID, GET_ALL_PRODUCTS, GET_ALL_SHOPS_USER } from '@/utils/Constant'
import { DataGrid, GridColDef,GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
export default function DashboardProducts() {
   const [products,setProducts] = useState([])
   const router = useRouter()
  const roo ="p-[20px] rounded-[10px] border border-[#384256] text-white flex-1 "
  const deleteProduct = async (id,keys,keyBook) =>{
    var answer = window.confirm("Voulez vous vraiment supprimer cette boutique?");
    if (answer) {
        try{

            const response = await axios.post(DELETE_PRODUCT_BY_ID+id,{keys,keyBook},{withCredentials:true})
            if(response.status === 200)
            {
              Swal.fire(
                'Produit Supprimé',
                'Votre Produit a été Supprimé avec success',
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
        field: 'image',
        headerName: 'Image',
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
    {
      field: 'boutique',
      headerName: 'Boutique',
      headerAlign:"left",
      // type: 'number',
      width: 200,
      align :"left",
      renderCell:(params)=>{
        return(
         
           <p>{params.row.createdBy.name}</p>
    

        )
      }
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
               <div onClick = {()=>router.push("/dashboard/seller/products/"+params.row.id)} className='py-2 px-3 bg-blue-100 rounded-md text-blue-600 font-bold cursor-pointer'>Modifier</div>
               <div onClick={()=>deleteProduct(params.row.id,params.row.keys,params.row.keyBook)}  className='py-2 px-3 bg-red-100 rounded-md text-red-600 font-bold cursor-pointer'>Supprimer</div>
             
          
            </div>
          )
        }
      },
  ];


   const getUserProducts = async () => {
    try{
        const data = await axios.get(GET_ALL_PRODUCTS,{withCredentials:true}).then(
            (response)=>{
                setProducts(response.data.products)
                
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

      getUserProducts()
    },[]
   )
    return (
        <div className='dashboarshop' >
                   <div className= {roo+" box9"}>
            <div className ="flex justify-between items-center">        
            <h1 className='text-4xl font-bold mb-5 mt-3 text-gray-300'>Produits</h1>
            <button onClick = {()=>router.push("/dashboard/seller/products/add")} className="bg-[#1DDF73] text-sm py-2 border-[#1DDF73] px-2 rounded-lg shadow-sm text-white">
                Enregistrer Un produit
            </button>
            </div>
            <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={products}
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
