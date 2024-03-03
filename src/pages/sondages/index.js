import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { GET_ALL_SERVICES_USER, GET_BUYER_ORDER, PARTICIPE_SONDAGE } from '@/utils/Constant'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
export default function index() {
   const [sondages,setSondages] = useState([])
   const router = useRouter()
   const columns = [

    { field: 'id', headerName: 'ID', width: 70 ,align:"left",headerAlign:"left"},
    {
        field: 'sondage',
        headerName: 'Sondage',
        // type: 'number',
        width: 250,
        align :"left",
        renderCell:(params)=>{
          return(
              <p>{params.row.sondage.title}</p>
          )
        }
      },
      {
        field: 'statut',
        headerName: 'Statut',
        // type: 'number',
        width: 200,
        align :"left",
        renderCell:(params)=>{
          return(
              <p>{params.row.sondage.status}</p>
          )
        }
      },
    {
      field: 'gain',
      headerName: 'Mon Gain (FCFA)',
      type: 'number',
      width: 300,
      align:"left" ,
      headerAlign:"left",
      renderCell:(params)=>{
        return <h2>Vous avez gagné {params.row.isAgree? params.row.sondage.participation:0} fcfa {!params.row.isAgree && "sur "+params.row.sondage.participation+" fcfA"}</h2>
      }
    },
    {
        field: 'date',
        headerName: 'Date de fin',
        // type: 'number',
        width: 200,
        align :"left",
        renderCell:(params)=>{
            var date = new Date(parseInt(params.row.sondage.dateExpire))          
            return(
              <p>{date.toLocaleString('en-GB')}</p>
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
            var dateNow = parseInt(new Date().getTime())
            return(
            <div style = {{width:200}} className ="flex justify-left gap-3 items-center" >

                  { ((parseInt(params.row.sondage.dateExpire)-dateNow<=0)||(params.row.isAgree)||(params.row.sondage.status === "Terminé"))?    <div  className='py-2 px-3 bg-blue-100 rounded-md text-blue-600 font-bold cursor-pointer'>fermé</div>:<div onClick = {()=>router.push("/sondages/answers/"+params.row.sondage.id)} className='py-2 px-3 bg-blue-100 rounded-md text-blue-600 font-bold cursor-pointer'>Participer</div>
                   
}

          
            </div>
          )
        }
      },
  ];


   const getUserondages = async () => {
    try{
        const data = await axios.get(PARTICIPE_SONDAGE,{withCredentials:true}).then(
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

      getUserondages()
    },[]
   )
    return (
        <div className='mt-[120px] flex flex-col px-5 mb-5' >
            <div className='mb-5'>
                <h1 className='font-semibold text-4xl text-[#555]'>Participer aux sondages</h1>
            </div>
        <DataGrid
          rows={sondages}
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
