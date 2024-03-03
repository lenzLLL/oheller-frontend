import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import {HiSaveAs} from "react-icons/hi"
import Swal from 'sweetalert2'

import {ImFilePicture} from "react-icons/im"
import axios from 'axios';
import { ADD_CITY, ADD_SECTEUR, ADD_SERVICE, ADD_SHOP } from '@/utils/Constant';
import { MdDelete } from 'react-icons/md';
import { useRouter } from 'next/router';
export default function DashboardAddSecteur() {
  const [images,setImages] = useState([])
  const [features,setFeatures] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  const [currentFeature,setCurrentFeature] = useState()
  const [isHover,setIsHover] = useState(false)
  const [isHover2,setIsHover2] = useState(false)
  const [numbers,setNumbers] = useState([])
  const [currentNumber,setCurrentNumber] = useState("")
  const roo ="p-[20px] rounded-[10px] border border-[#384256] text-white flex-1 "
  
  const regions = [
    "Région de l'Adamaoua",
    "Région du Centre",
    "Région de l'Est",
    "Région de l'Extrême-Nord",
    "Région du Littoral",
    "Région du Nord",
    "Région du Nord-Ouest",
    "Région de l'Ouest",
    "Région du Sud",
    "Région du Sud-Ouest"
  ]
 
  const [data,setData] = useState(
    {
       name:""
    }
  )

  const router = useRouter()

  // const saveShop = async () =>{
  //   const response = await axios.post("http://localhost:8080/api/shop/add",{images,features,numbers},{withCredentials:true,params:data})
      
  // } 
  const saveSecteur = async () => {
    try{
        setIsLoading(true)
        if(data.name === ""){  
          Swal.fire({
            title: 'Error!',
            text: "veillez remplir tous les champs",
            icon: 'error',
            confirmButtonText: 'Ok',
            buttonsStyling:"danger"
          }) 
          return
        }
        const response = await axios.post(ADD_SECTEUR,{...data},{withCredentials:true})
         

        if(response.status === 201)
        {
           
          window.location.replace("/dashboard/admin/secteur")
          Swal.fire(
            'Créé',
            'Créé avec success',
            'success'
          )  
        }
      }
    catch(err)
    {
        if(err.response.status == 500)
        {
         Swal.fire({
           title: 'Error!',
           text: 'Une erreur s\'est produite veillez vérifier vos données et ressayer s\'il vous  plait',
           icon: 'error',
           confirmButtonText: 'Ok',
           buttonsStyling:"danger"
         })    
        }
        alert(err)
        
    }
    setIsLoading(false)
  }
    return (
        <div className='dashboarshop' >
                   <div className= {roo+" box9 bg-white"}>
                   <h1 className='text-3xl text-gray-900 mb-5'>Ajouter un secteur d'activité</h1>
       <h3 className='text-xl text-gray-900 mb-5'>Entrez les informations</h3>
       <div className='mt-10 flex flex-col gap-5 '>
           <div className='grid grid-cols-1 gap-11'>
               <TextField value = {data.name}  onChange={(e)=>setData({...data,name:e.target.value})} helperText="Minimum trois lettres!" id="outlined-basic" label= {`Secteur*`} variant="outlined" />
           </div>
         
        
           <button disabled = {isLoading} onClick={saveSecteur}  className='flex cursor-pointer gap-1 outline-none items-center justify-center border w-[300px] py-[13px] hover:shadow-lg px-20 bg-purple-500 text-white rounded-lg shadow-sm'>
               {isLoading? "Enregistrement...":<><HiSaveAs/> Enregistrer</>}
           </button>

       </div>  

        </div>  
       </div>
  )
}
