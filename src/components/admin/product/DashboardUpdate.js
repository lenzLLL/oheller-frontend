import React,{useState,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import {HiSaveAs} from "react-icons/hi"
import Swal from 'sweetalert2'

import {ImFilePicture} from "react-icons/im"
import axios from 'axios';
import { ADD_PRODUCT, ADD_SERVICE, ADD_SHOP, GET_ALL_SHOPS_USER } from '@/utils/Constant';
import { MdDelete } from 'react-icons/md';
import { useRouter } from 'next/router';
export default function DashboardAddProduct() {
  const [images,setImages] = useState([])
  const [features,setFeatures] = useState([])
  const [shops,setShops] = useState([])
  const [shopFeatures,setShopFeatures] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  const [currentFeature,setCurrentFeature] = useState()
  const [isHover,setIsHover] = useState(false)
  const [isHover2,setIsHover2] = useState(false)
  const roo ="p-[20px] rounded-[10px] border border-[#384256] text-white flex-1 "
  const [data,setData] = useState(
    {
        title:"",
        category:"",
        price:0,
        description:"",
        sizes:"",
        shopId:0,
        shopLabel:""
    }
  )
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
  const deleteFeatures = async (value) => {
      const newFeatures = features.filter(feature=>feature!=value)
      setFeatures(newFeatures)
  }

  // const saveShop = async () =>{
  //   const response = await axios.post("http://localhost:8080/api/shop/add",{images,features,numbers},{withCredentials:true,params:data})
      
  // } 
  const saveProduct = async () => {
    try{
        setIsLoading(true)
        if(data.description === ""||data.title === ""||data.category === ""||data.price === ""||data.sizes === "" || data.type === "" || data.region === "" || data.shopId === "" || features.length<=0 ||images.length === 0){  
          Swal.fire({
            title: 'Error!',
            text: "veillez remplir tous les champs et insérer une ou plusieurs images avant l'enregistrement",
            icon: 'error',
            confirmButtonText: 'Ok',
            buttonsStyling:"danger"
          }) 
          return
        }
        const response = await axios.post(ADD_PRODUCT,{images,features,...data},{withCredentials:true})
         

        if(response.status === 201)
        {
           
          window.location.replace("/dashboard/seller/shops")
          Swal.fire(
            'Produit Créé',
            'Votre produit a été Créé avec success',
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
  const setShopId = async (option) => {
    setData({...data,shopId:option.id,shopLabel:option.name})
    let tampon = shops.filter(shop=>shop.id===option.id)
    setShopFeatures(tampon[0].features)
  } 
  const getUserShops = async () => {
    try{
        const data = await axios.get(GET_ALL_SHOPS_USER,{withCredentials:true}).then(
            (response)=>{
                setShops(response.data.shops)
                
            
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
      getUserShops()
    },[]
   )
    return (
        <div className='dashboarshop' >
                   <div className= {roo+" box9 bg-white"}>
                   <h1 className='text-3xl text-gray-900 mb-5'>Enregistrer un produit</h1>
       <h3 className='text-xl text-gray-900 mb-5'>Entrez les informations de votre produit</h3>
       <div className='mt-10 flex flex-col gap-5 '>
           <div className='grid grid-cols-2 gap-11'>
               <TextField value = {data.title}  onChange={(e)=>setData({...data,title:e.target.value})} helperText="Minimum trois lettres!" id="outlined-basic" label= {`Entrez le nom de votre produit`} variant="outlined" />              
               <TextField
                  id="outlined-select-currency"
                  select
                  label="Boutique"
                  value={data.shopLabel}
                  
                  helperText="Veillez choisir une Boutique!"
               >
                    {shops.map((option) => (
                    <MenuItem key={option} value={option.name} onClick={()=>setShopId(option)}>
                    {option.name}
                    </MenuItem>
                    ))}
                </TextField>  
           </div>
           <div className='grid grid-cols-2 gap-11'>
           {/* <TextField
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
                </TextField>  */}
                             <TextField value = {data.price} placeholder='prix (FCFA)'  onChange={(e)=>setData({...data,price:e.target.value})} helperText="Prix du produit(FCFA)" id="outlined"  variant="outlined" />
                             <TextField
                  id="outlined-select-currency"
                  select
                  label="Tailles"
                  value={data.sizes}
                  onChange={(e)=>setData({...data,sizes:e.target.value})}
                  helperText="Veillez choisir la catégorie de taille pour votre produit!"
               >
                    {["cool"].map((option) => (
                    <MenuItem key={option} value={option}>
                    {option}
                    </MenuItem>
                    ))}
                </TextField>  
           </div>
           <div className='grid grid-cols-1'>
               <TextField multiline minRows={5} value = {data.description}  onChange={(e)=>setData({...data,description : e.target.value})} helperText="maximum 500 caractères!" id="outlined-basic" label= {`Veillez entrer une description pour votre`} variant="outlined" />
           </div>
           
      { shopFeatures.length>0 &&     <div className='grid grid-cols-1 gap-11'>
                             <TextField
                  id="outlined-select-currency"
                  select
                  label="Categorie"
                  value={data.category}
                  onChange={(e)=>setData({...data,category:e.target.value})}
                  helperText="Veillez choisir la catégorie du produit!"
               >
                    {shopFeatures.map((option) => (
                    <MenuItem key={option} value={option}>
                    {option}
                    </MenuItem>
                    ))}
                    {
                      
                    }
                </TextField>  
           </div>}
           <div className='flex items-center justify-center gap-1'>
               <TextField value={currentFeature} onChange={(e)=>setCurrentFeature(e.target.value)} className='flex-1'  id="outlined-basic" label= {`Ajoutez une caractéristique à votre produit`} variant="outlined" />
               <button onClick = {()=>addFeatures()}  className='flex items-start justify-center border w-[100px] py-[15px] hover:shadow-lg px-20 outline-none bg-purple-500 text-white rounded-lg shadow-sm'>
                   Ajouter
               </button>
           </div>
           <div className='flex gap-5 flex-wrap'>
               {
                   features.length > 0 && features.map(
                    (item)=>{
                      return <span onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)} style = {{boxShadow:"inset 0 0 1.5px rgba(0,0,0,0.5)"}} className='px-5 text-[#555] rounded-md py-3 cursor-pointer relative'>
                        {item}
                     {isHover && <span onClick = {()=>deleteFeatures(item)} className='absolute top-[2px] right-1'><MdDelete style = {{color:"gray",fontSize:"15px"}}/></span>  }                      </span>
                    }
                   ) 
               } 
           </div>
           
           <div className='w-[500px]'>
{shopType.toLowerCase() !== "Numérique" &&      <label htmlFor='cv' className='cursor-pointer shadow-sm hover:shadow-lg flex flex-row justify-center border w-full py-[10px] items-center gap-2 px-20 bg-[#414141] text-white rounded-lg shadow-sm'>
         <ImUpload/> Importer votre fichier(pdf,mp3,mp4) {"(pdf)"}
        <input type = "file" id = "cv"  style = {{display:"none"}} onChange={uploadBook}/>
      </label>}
      </div>   
              <div className='flex'>
               <label htmlFor='images'>
                   <div className='cursor-pointer flex flex-col m-1 ml-0 bg-gray-50 p-2 w-[250px] rounded-md'>
                       <div style = {{borderStyle:"dashed"}} className='h-52 border flex items-center justify-center'>
                           <div className='flex flex-col items-center justify-center p-4 gap-2'>
                               <ImFilePicture style = {{color:"grey",fontSize:"65px"}}/>
                               <span className='text-center text-sm text-gray-300'>Importez votre logo</span>
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
           <button disabled = {isLoading} onClick={saveProduct}  className='flex cursor-pointer gap-1 outline-none items-center justify-center border w-[300px] py-[13px] hover:shadow-lg px-20 bg-purple-500 text-white rounded-lg shadow-sm'>
               {isLoading? "Enregistrement...":<><HiSaveAs/> Enregistrer</>}
           </button>

       </div>  

        </div>  
       </div>
  )
}
