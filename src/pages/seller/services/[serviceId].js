import React,{useState,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import {HiSaveAs} from "react-icons/hi"
import {ImFilePicture} from "react-icons/im"
import axios from 'axios';
import { ADD_SERVICE, GET_USER_SERVICE, UPDATE_USER_SERVICE } from '@/utils/Constant';
import { MdDelete } from 'react-icons/md';
import { useRouter } from 'next/router';
export default function Create() {
  const [images,setImages] = useState([])
  const [newImages,setNewImages] = useState([])
  const [features,setFeatures] = useState([])
  const [currentFeature,setCurrentFeature] = useState()
  const [isHover,setIsHover] = useState(false)
  const [data,setData] = useState(
    {
        title:"",
        category:"",
        description:"",
        time:0,
        price:0,
    }
  )
  const professions = [
    {
      secteur:"Informatique",
      profession:"Développement web",
    },
    {
      secteur:"Informatique",
      profession:"Designer",
    },
    {
      secteur:"Informatique",
      profession:"Analyste informatique",
    },

  ] 
  const router = useRouter()
  const {serviceId} = router.query
  const uploadImages = (e) =>{
    const files = Array.from(e.target.files)
    if(files.length > 5)
    {
      alert("vous pouvez poster au maximum 5 images")
      return
    }
    setNewImages([])
    files.forEach(
      (file) => {
        const reader = new FileReader()
        reader.onload = () => {
          if(reader.readyState === 2)
          {
               setNewImages((old)=>[...old,reader.result])  
          }
        }
        reader.readAsDataURL(file)
      }
    ) 
  }
  const editService = async () => {
    try{
        if(data.title === "" || data.category === "" || data.description === "" || data.time === 0 || data.price === 0|| features.length === 0){
          alert("veillez remplir tous les champs!")  
          return
        }
        const response = await axios.put(UPDATE_USER_SERVICE+"/"+serviceId,{newImages,newFeatures:features,...data},{withCredentials:true})
        if(response.status === 201)
        {
          router.push("/seller/services")
        }
      }
    catch(err)
    {
        alert(err)
    }
  }
  const addFeatures = async () => {
    setFeatures([...features,currentFeature])
    setCurrentFeature("")
  }
  const deleteFeatures = async (value) => {
      const newFeatures = features.filter(feature=>feature!=value)
      setFeatures(newFeatures)
  }
  const labelClassName = "mb-2 text-lg font-medium text-gray-900 dark:text-white"
  useEffect(
    ()=>{
        if(serviceId)
        {
            
           const getServiceById = async () => {
               try{
                   const d = await axios.get(GET_USER_SERVICE+"/"+serviceId,{withCredentials:true})
                   setData(d.data.service)
                   setFeatures(d.data.service.features)
                   setImages(d.data.service.images)
            
            
                   
               }
               catch(error)
               {

               } 
           }
           getServiceById()
        }
    },[serviceId]
  )

  return (
    <div className='min-h-[80vh] mb-20 mt-[120px] px-32'>
       <h1 className='text-6xl text-gray-900 mb-5'>Modifiez votre service</h1>
       <h3 className='text-3xl text-gray-900 mb-5'>Entrez les détails de votre service</h3>
       <div className='mt-10 flex flex-col gap-5 '>
           <div className='grid grid-cols-2 gap-11'>
               <TextField value = {data?.title}  onChange={(e)=>setData({...data,title:e.target.value})} helperText="Minimum trois lettres!" id="outlined-basic" label= {`Entrez le nom de votre service ex: création des contenus 3d`} variant="outlined" />
               <TextField
                  id="outlined-select-currency"
                  select
                  label="Profession"
                  value={data.category}
                  onChange={(e)=>setData({...data,category:e.target.value})}
                  helperText="Veillez choisir le type de service!"
               >
                    {professions.map((option) => (
                    <MenuItem key={option} value={option.profession}>
                    {option.profession}
                    </MenuItem>
                    ))}
                </TextField>  
           </div>
           <div className='grid grid-cols-2 gap-11'>
               <TextField type = "number" value = {data.price}  onChange={(e)=>setData({...data,price:e.target.value})} helperText="Entrez un prix de base pour votre service!" id="outlined-basic" label= {`Entrez le prix de base pour votre service (FCFA)`} variant="outlined" />
               <TextField type = "number" value = {data.time}  onChange={(e)=>setData({...data,time:e.target.value})} helperText="veillez entrer un délai de livraison en terme de jours!" id="outlined-basic" label= {`Délai de livraison (Jours)`} variant="outlined" />
           </div>
           <div className='grid grid-cols-1 gap-11'>
               <TextField multiline minRows={5} value = {data.description}  onChange={(e)=>setData({...data,description : e.target.value})} helperText="maximum 500 caractères!" id="outlined-basic" label= {`Veillez entrer une bref description de votre service`} variant="outlined" />
           </div>
           <div className='flex items-center justify-center gap-1'>
               <TextField value={currentFeature} onChange={(e)=>setCurrentFeature(e.target.value)} className='flex-1' helperText="Minimum 5 caractères!" id="outlined-basic" label= {`veillez ajouter une fonctionnalité à votre service`} variant="outlined" />
               <button onClick = {()=>addFeatures()}  className='flex items-start mb-5 justify-center border w-[100px] py-[15px] hover:shadow-lg px-20 outline-none bg-purple-500 text-white rounded-lg shadow-sm'>
                   Ajouter
               </button>
           </div>
           <div className='flex gap-5 flex-wrap'>
               {
                   features.length > 0 && features.map(
                    (item)=>{
                      return <span onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)} style = {{boxShadow:"inset 0 0 1.5px rgba(0,0,0,0.5)"}} className='px-5 rounded-md py-3 cursor-pointer relative'>
                        {item}
                     {isHover && <span onClick = {()=>deleteFeatures(item)} className='absolute top-[2px] right-1'><MdDelete style = {{color:"gray",fontSize:"15px"}}/></span>  }                      </span>
                    }
                   ) 
               } 
           </div>
           {            
          
           <div className='cursor-pointer flex flex-col m-1 ml-0 bg-gray-50 p-2 w-auto  rounded-md'>
                       <div style = {{borderStyle:"dashed"}} className=' border flex-wrap flex items-center justify-start p-2'>
                           {
                           newImages.length > 0?   newImages.map(
                              (item)=>{
                                return (
                                  <img src= {item} className='rounded-md h-[180px] w-[200px] m-1'/>
                                )
                              }
                            ):images.map(
                              (item)=>{
                                return (
                                  <img src= {item} className='rounded-md h-[180px] w-[200px] m-1'/>
                                )
                              }
                            )
                           }
                       </div> 
              </div>}
           <div className='flex'>
               <label htmlFor='images'>
                   <div className='cursor-pointer flex flex-col m-1 ml-0 bg-gray-50 p-2 w-[250px] rounded-md'>
                       <div style = {{borderStyle:"dashed"}} className='h-52 border flex items-center justify-center'>
                           <div className='flex flex-col items-center justify-center p-4 gap-2'>
                               <ImFilePicture style = {{color:"grey",fontSize:"65px"}}/>
                               <span className='text-center text-sm text-gray-300'>Selectionner jusqu'à 5 images</span>
                           </div>
                   </div> 
                   </div>
                   <input multiple = {true} onChange={uploadImages} style = {{display:"none"}} type = "file" id ="images"/>
               </label>
           </div>
           <button onClick={editService}  className='flex gap-1 outline-none items-center justify-center border w-[300px] py-[13px] hover:shadow-lg px-20 bg-purple-500 text-white rounded-lg shadow-sm'>
               <HiSaveAs/> Modifier
           </button>

       </div>  
    </div>
  )
}
