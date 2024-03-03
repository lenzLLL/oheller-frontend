import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import {HiSaveAs} from "react-icons/hi"
import {ImFilePicture} from "react-icons/im"
import axios from 'axios';
import { ADD_SERVICE, ADD_SHOP } from '@/utils/Constant';
import { MdDelete } from 'react-icons/md';
import { useRouter } from 'next/router';
export default function Create() {
  const [images,setImages] = useState([])
  const [features,setFeatures] = useState([])
  const [currentFeature,setCurrentFeature] = useState()
  const [isHover,setIsHover] = useState(false)
  const [isHover2,setIsHover2] = useState(false)
  const [numbers,setNumbers] = useState([])
  const [currentNumber,setCurrentNumber] = useState("")
  
  const regions = [
    "Région de l'Adamaoua",
    "Région du Centre",
    "Région de l'Est",
    "Région de l'Extrême-Nord",
    "Région du Littoral",
    "Région du Nord",
    "Région du Nord-Ouest",
    "Région de l'Ouest"
  ]
  const villes = [
    {
      region:"Région de l'Ouest",
      ville:"Bafoussam"
    }
  ]
  const types = [
      "Physique",
      "Numérique",
      "Physique & Numérique"
  ]
  const secteurs = [
    "Agriculture",
    "Informatique",
    "Industrie",
    "autres"
  ]
  const disponibilite = [
      "Dans le quartier",
      "Dans la ville",
      "Dans tout le territoire"
  ] 
  const [data,setData] = useState(
    {
        name:"",
        type:"",
        region:regions[7],
        city:"",
        quarter:"",
        description:"",
        secteur:"",
        disponibilite:"",
        cover:""
    }
  )
  const uploadCover = (e) =>{

    const reader = new FileReader();
      reader.onload = ()=>{
          if(reader.readyState === 2)
          {
            
              setData({...data,cover:reader.result})
              
  
          }
      }
      reader.readAsDataURL(e.target.files[0])
  }
  const router = useRouter()
  const uploadImages = (e) =>{
    const files = Array.from(e.target.files)
    if(files.length > 5)
    {
      alert("vous pouvez poster au maximum 5 images")
      return
    }
    setImages([])
    files.forEach(
      (file) => {
        const reader = new FileReader()
        reader.onload = () => {
          if(reader.readyState === 2)
          {
              setImages((old)=>[...old,reader.result])  
          }
        }
        reader.readAsDataURL(file)
      }
    ) 
    JSON.stringify(images)
  }
  const addFeatures = async () => {
    setFeatures([...features,currentFeature])
    setCurrentFeature("")
  }
  const addNumber = async () => {
    setNumbers([...numbers,currentNumber])
    setCurrentNumber("")
  }
  const deleteFeatures = async (value) => {
      const newFeatures = features.filter(feature=>feature!=value)
      setFeatures(newFeatures)
  }
  const deleteNumber = async (value) => {
    const newNumbers = numbers.filter(feature=>feature!=value)
    setNumbers(newNumbers)
  }
  // const saveShop = async () =>{
  //   const response = await axios.post("http://localhost:8080/api/shop/add",{images,features,numbers},{withCredentials:true,params:data})
      
  // } 
  const saveShop = async () => {
    try{
        if(data.description === ""||data.secteur === ""||data.disponibilite === ""||data.cover === ""||data.name === "" || data.type === "" || data.region === "" || data.city === 0 || data.quarter === ""||images.length === 0 || features.length === 0||numbers.length === 0){
          alert("veillez remplir tous les champs et insérer une ou plusieurs images avant l'enregistrement")  
          return
        }
        const response = await axios.post(ADD_SHOP,{numbers,images,features,...data},{withCredentials:true})
         

        if(response.status === 201)
        {
          router.push("/seller/shop")
        }
      }
    catch(err)
    {
        alert(err)
    }
  }
  const labelClassName = "mb-2 text-lg font-medium text-gray-900 dark:text-white"
  return (
    <div className='min-h-[80vh] mb-20 mt-[120px] px-32'>
       <h1 className='text-6xl text-gray-900 mb-5'>Créer une boutique</h1>
       <h3 className='text-3xl text-gray-900 mb-5'>Entrez les informations de votre boutique</h3>
       <div className='mt-10 flex flex-col gap-5 '>
           <div className='grid grid-cols-2 gap-11'>
               <TextField value = {data.name}  onChange={(e)=>setData({...data,name:e.target.value})} helperText="Minimum trois lettres!" id="outlined-basic" label= {`Entrez le nom de votre boutique`} variant="outlined" />
               <TextField
                  id="outlined-select-currency"
                  select
                  label="Type de produit"
                  value={data.type}
                  onChange={(e)=>setData({...data,type:e.target.value})}
                  helperText="Veillez choisir le type de produit de votre boutique!"
               >
                    {types.map((option) => (
                    <MenuItem key={option} value={option}>
                    {option}
                    </MenuItem>
                    ))}
                </TextField>  
           </div>
           <div className='grid grid-cols-2 gap-11'>
           <TextField
                  id="outlined-select-currency"
                  select
                  label="veillez choisir une région (localisation de la boutique)"
                  defaultValue={regions[7]}
                  value={data.region}
                  onChange={(e)=>setData({...data,region:e.target.value})}
                  helperText="Veillez choisir la région dans laquelle se trouve votre boutique"
               >
                    {regions.map((option) => (
                    <MenuItem key={option} value={option}>
                    {option}
                    </MenuItem>
                    ))}
                </TextField> 
                <TextField
                  id="outlined-select-currency"
                  select
                  label="veillez choisir une ville (localisation de la boutique)"
                  value={data.city}
                  onChange={(e)=>setData({...data,city:e.target.value})}
                  helperText="Veillez choisir la ville dans laquelle se trouve votre boutique"
               >
         {villes.filter(item=>item.region === data.region).map((option) => (
          <MenuItem key={option} value={option.ville}>
         {option.ville}
         </MenuItem>
          ))}
                </TextField> 
           </div>
           {         data.city &&  <div className='grid grid-cols-1 gap-11'>
               <TextField  value = {data.quarter}  onChange={(e)=>setData({...data,quarter: e.target.value})} helperText="minimum 3 caractères!" id="outlined-basic" label= {`Veillez entrer le quartier`} variant="outlined" />
           </div>}
           <div className='grid grid-cols-2 gap-11'>
           <TextField
                  id="outlined-select-currency"
                  select
                  label="secteur d'activité"
                  value={data.secteur}
                  onChange={(e)=>setData({...data,secteur:e.target.value})}
                  helperText="Veillez choisir le secteur d'activité de votre boutique"
               >
                    {secteurs.map((option) => (
                    <MenuItem key={option} value={option}>
                    {option}
                    </MenuItem>
                    ))}
                </TextField> 
                <TextField
                  id="outlined-select-currency"
                  select
                  label="disponibilité des produits"
                  value={data.disponibilite}
                  onChange={(e)=>setData({...data,disponibilite:e.target.value})}
                  helperText="Veillez choisir la ville dans laquelle se trouve votre boutique"
               >
       { disponibilite.map((option) => (
          <MenuItem key={option} value={option}>
         {option}
         </MenuItem>
          ))}
                </TextField> 
           </div>
           <div className='flex items-center justify-center gap-1'>
               <TextField value={currentNumber} onChange={(e)=>setCurrentNumber(e.target.value)} className='flex-1' helperText="Minimum 5 caractères!" id="outlined-basic" label= {`Ajoutez un numéro de téléphone à votre boutique`} variant="outlined" />
               <button onClick = {()=>addNumber()}  className='flex items-start mb-5 justify-center border w-[100px] py-[15px] hover:shadow-lg px-20 outline-none bg-purple-500 text-white rounded-lg shadow-sm'>
                   Ajouter
               </button>
           </div>
           <div className='flex gap-5 flex-wrap'>
               {
                   numbers.length > 0 && numbers.map(
                    (item)=>{
                      return <span onMouseEnter={()=>setIsHover2(true)} onMouseLeave={()=>setIsHover2(false)} style = {{boxShadow:"inset 0 0 1.5px rgba(0,0,0,0.5)"}} className='px-5 rounded-md py-3 cursor-pointer relative'>
                        {item}
                     {isHover2 && <span onClick = {()=>deleteNumber(item)} className='absolute top-[2px] right-1'><MdDelete style = {{color:"gray",fontSize:"15px"}}/></span>  }                      </span>
                    }
                   ) 
               } 
           </div>
           <div className='grid grid-cols-1 gap-11'>
               <TextField multiline minRows={5} value = {data.description}  onChange={(e)=>setData({...data,description : e.target.value})} helperText="maximum 500 caractères!" id="outlined-basic" label= {`Veillez entrer une description de votre boutique`} variant="outlined" />
           </div>
           <div className='flex items-center justify-center gap-1'>
               <TextField value={currentFeature} onChange={(e)=>setCurrentFeature(e.target.value)} className='flex-1' helperText="Minimum 5 caractères!" id="outlined-basic" label= {`Ajoutez un rayon à votre boutique`} variant="outlined" />
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

            
              <div className='flex'>
               <label htmlFor='cover'>
                   <div className='cursor-pointer flex flex-col m-1 ml-0 bg-gray-50 p-2 w-[250px] rounded-md'>
                       <div style = {{borderStyle:"dashed"}} className='h-52 border flex items-center justify-center'>
                           <div className='flex flex-col items-center justify-center p-4 gap-2'>
                               <ImFilePicture style = {{color:"grey",fontSize:"65px"}}/>
                               <span className='text-center text-sm text-gray-300'>Importer l'image de couverture de la boutique</span>
                           </div>
                   </div> 
                   </div>
                   <input  onChange={uploadCover} style = {{display:"none"}} type = "file" id ="cover"/>
               </label>
               { data.cover &&              <div className='cursor-pointer flex flex-col m-1 ml-0 bg-gray-50 p-2 w-auto  rounded-md'>
                       <div style = {{borderStyle:"dashed"}} className=' border flex-wrap flex items-center justify-start p-2'>

                                  <img src= {data.cover} className='rounded-md h-[180px] w-[200px] m-1'/>

                       </div> 
              </div>}
           </div>
              
              <div className='flex'>
               <label htmlFor='images'>
                   <div className='cursor-pointer flex flex-col m-1 ml-0 bg-gray-50 p-2 w-[250px] rounded-md'>
                       <div style = {{borderStyle:"dashed"}} className='h-52 border flex items-center justify-center'>
                           <div className='flex flex-col items-center justify-center p-4 gap-2'>
                               <ImFilePicture style = {{color:"grey",fontSize:"65px"}}/>
                               <span className='text-center text-sm text-gray-300'>Importer les photos de votre pièce d'identité</span>
                           </div>
                   </div> 
                   </div>
                   <input multiple = {true} onChange={uploadImages} style = {{display:"none"}} type = "file" id ="images"/>
               </label>
               { images.length>0 &&              <div className='cursor-pointer flex flex-col m-1 ml-0 bg-gray-50 p-2 w-auto  rounded-md'>
                       <div style = {{borderStyle:"dashed"}} className=' border flex-wrap flex items-center justify-start p-2'>
                           {
                            images.map(
                              (item)=>{
                                return (
                                  <img src= {item} className='rounded-md h-[180px] w-[200px] m-1'/>
                                )
                              }
                            )
                           }
                       </div> 
              </div>}
           </div>
           <button onClick={saveShop}  className='flex gap-1 outline-none items-center justify-center border w-[300px] py-[13px] hover:shadow-lg px-20 bg-purple-500 text-white rounded-lg shadow-sm'>
               <HiSaveAs/> Enregistrer
           </button>

       </div>  
    </div>
  )
}
