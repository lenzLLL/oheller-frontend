import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { useStateProvider } from '@/context/StateContext'
import {HiOutlinePhotograph} from "react-icons/hi"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import {ImUpload} from "react-icons/im"
import {HiSaveAs} from "react-icons/hi"
import Swal from 'sweetalert2'
import axios from "axios"
import { GET_ALL_CITIES, GET_ALL_PROFESSION, GET_ALL_SECTEUR, GET_USER_INFOS, HOST, SET_USER_CV, SET_USER_IMAGE, SET_USER_PROFIL } from '@/utils/Constant'
import { reducerCases } from '@/context/Constant'
import { PROFILE_CUSTOMER, PROFIL_FREELANCER, PROFIL_SELLER, PROFIL_WORKER } from '@/utils/Constants2'

export default function Profil() {
  const router = useRouter()
  const [isLoading,setIsLoading] = useState(true)
  const [isLoading2,setIsLoading2] = useState(false)
  const [imageHover,setImageHover] = useState(false)
  const [image,setImage] = useState(null)
  const [currentImage,setCurrentImage] = useState(null)
  const [isHover,setIsHover] = useState(false)
  const [isRoundedCv,setIsRoundedCv] = useState(false)
  const [isRoundedProfil,setIsRoundedProfil] = useState(false)
  const [isRoundedSave,setIsRoundedSave] = useState(false)
  const [contacts,setContacts] = useState([])
  const [currentContact,setCurrentContact] = useState("")
  const [cv,setCv] = useState(null)
  const [{userInfos},dispatch] = useStateProvider()
  const [cities,setCities] = useState([])
  const [secteurs,setSecteurs] = useState([])
  const [works,setWorks] = useState([])
  const [errorMessage,setErrorMessage] = useState("")
  const [data,setData] = useState(
    {
        accountType:"Client (Rencontrez des freelancers et des entreprises pour realiser vos projets)",
        region:"",
        city:"",
        quarter:"",
        fullname:"",
        secteur:"",
        workerType:"",
        work:"",
        sexe:"",
        birthday:null,
        diplome:"",
        langue:"",
        experience:0,
        cv:"",
        contact:"",
        profileImage:""
    }
  )
  const getCities = async () =>{
    try{
       const {data} = await axios.get(`${GET_ALL_CITIES}`,{withCredentials:true})  
       setCities(data.cities)
      }
    catch(err)
    {
      
    }
  }

  const getSecteurs = async () =>{
    try{
       const {data} = await axios.get(`${GET_ALL_SECTEUR}`,{withCredentials:true})  
       setSecteurs(data.secteurs)
      }
    catch(err)
    {
      
    }
  }

  const getWorks = async () =>{
    try{
       const {data} = await axios.get(`${GET_ALL_PROFESSION}`,{withCredentials:true})  
       setWorks(data.professions)
      }
    catch(err)
    {

    }
  }
  const accountType = [
    "Client (Rencontrez des freelancers et des entreprises pour realiser vos projets)",
    "Freelancer (Faites vous embaucher et gagnez des marchés)",
    "Commerçant (Créez vos Boutiques et vendez vos produits)",
    "Chercheur d'emploie (Faites vous recruter par des Entreprises dans tout le territoire du pays)"
  ]
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
  // const villes = [
  //   {
  //     region:"Région de l'Ouest",
  //     ville:"Bafoussam"
  //   }
  // ]
  // const secteurs = [
  //   "Agriculture",
  //   "Informatique",
  //   "Industrie",
  //   "autres"
  // ]
  const workerType = [
    "Prestataire indépendant",
    "Chercheur d'emploi"
  ]
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
  const diplomes = [
    "GCE",
    "BAC",
    "BTS",
    "LICENSE",
    "MASTER 1",
    "MASTER 2",
    "Autre"
  ]
 
const addContact = (value) => {
    setContacts([...contacts,value])
}
const deleteContact = (value) => {
    setContacts([...contacts.filter(c=>c!=value)])
}
const uploadImages = (e) =>{
  setIsRoundedProfil(true)
  const reader = new FileReader();
    reader.onload = ()=>{
        if(reader.readyState === 2)
        {
            setImage(reader.result)
        }
    }
    reader.readAsDataURL(e.target.files[0])
    setIsRoundedProfil(false)
}
const uploadCv = (e) =>{
  setIsRoundedCv(true)
  const reader = new FileReader();
    reader.onload = ()=>{
        if(reader.readyState === 2)
        {
            setCv(reader.result)
            alert("votre cv a été enregsitré!")

        }
    }
    reader.readAsDataURL(e.target.files[0])
    setIsRoundedCv(false)
}

  const setProfile = async (e) => {
    e.preventDefault()
    let isEmpty = false
    if(!data.birthday||!data.accountType||!data.contact||!data.fullname)
    {
      
      isEmpty =true 
    }
    if(data.accountType !== PROFILE_CUSTOMER && (!data.work)){
       isEmpty = true    
    }
    if(data.accountType === PROFIL_FREELANCER && (!data.sexe || !data.langue || !data.diplome || !data.experience||!data.contact)){
      isEmpty = true
    }
    if(data.accountType === PROFIL_WORKER && (!data.workerType || !cv)){
      isEmpty = true
    }
    if(data.accountType === PROFIL_SELLER && (!data.city || !data.contact || !data.secteur || !data.work)){
      isEmpty = true
    }
    if(isEmpty)
    {
      Swal.fire({
        title: 'Error!',
        text: 'Veillez remplir tous les champs s\'il vous plait',
        icon: 'error',
        confirmButtonText: 'Ok',
        buttonsStyling:"danger"
      })  
      return
    }
    setIsLoading2(true)
    try{
    const response = await axios.post(SET_USER_PROFIL,data,{withCredentials:true})
    let imageName =""  
    if(image)
    {
      const formData = new FormData()
      formData.append("images",image)
      const {data:{img}} = await axios.post(SET_USER_IMAGE,{image:image},{
        withCredentials:true,
      })
    }
    if(cv)
    {
      const formData = new FormData()
      formData.append("cv",cv)
      const {data:{img}} = await axios.post(SET_USER_CV,{cv:cv},{
        withCredentials:true,
      })
    }
    dispatch({type:reducerCases.SET_USER,userInfos:{...userInfos,image:imageName.length?HOST+"/"+imageName:false}})
    Swal.fire(
      'Profil Modifié',
      'Votre profil a été modifié avec success',
      'success'
    )
    router.push("/")
  }
    catch(err)
    {
       alert(err)
       if(err.response.status == 500)
       {
        Swal.fire({
          title: 'Error!',
          text: 'Une erreur s\'est produite veillez ressayer s\'il vous  plait',
          icon: 'error',
          confirmButtonText: 'Ok',
          buttonsStyling:"danger"
        })    
       }
      
    }
    setIsLoading2(false)
  }
  const inputClassName = "block p-4 w-full text-sm text-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
  const labelClassName = "mb-2 text-lg font-medium text-gray-900 dark:text-white"
  const [cookies] = useCookies()
  
  useEffect(
    ()=>{
        if(cookies.jwt)
        {    const getUserInfos = async () =>{
            
            try{
                const {data:{user}} = await axios.post(GET_USER_INFOS,{},{withCredentials:true})
                setData(user)
                if(user.url_image){
                    setCurrentImage(user.url_image)              
                }
                if(!data.accountType)
                {
                  setData({...data,accountType:"Client (Rencontrez des freelancers et des entreprises pour realiser vos projets)",
                })
                }


            }
            catch(err)
            {
               console.log(err)
            }

           }
           getUserInfos()
           
        }
        getCities()
        getSecteurs()
        getWorks()
    },[userInfos,cookies]
  )
  return (
   isLoading && <div className='flex flex-col items-center justify-center min-h-[80vh] gap-3 mt-[120px] mb-5'>
       {
           errorMessage && <div>
               <span  className='text-red-600 font-bold'>
                   {errorMessage}                
               </span>     
           </div>
       }
       <h2 className='text-3xl font-semibold'>Bienvenue sur Ö Heller</h2>
       <h4 className='text-xl'>S'il vous plait veillez completer votre profil avant de commencer</h4>
       <div className='flex flex-col item-center w-full gap-5'>
           <div className='flex flex-col items-center'>
               <label className={labelClassName+" flex flex-col items-center justify-center"} htmlFor = "profil">
                   <span className='mb-3'>Selectionner une photo de profile ou un logo</span>
            
               <div onMouseEnter={()=>setImageHover(true)} onMouseLeave={()=>setImageHover(false)} className='bg-purple-500 h-36 w-36 p-0 flex items-center justify-center rounded-full relative cursor-pointer'>
               {
                                        (image||currentImage) ? (<Image src = {(image?image:currentImage)} fill alt = {"profile"} className='rounded-full'/>):
(                                         <span className='m-0 p-0 w-40 h-40 flex items-center justify-center text-[80px] text-white'>
                                                {
                                                    userInfos?.email[0].toUpperCase()
                                                }
                                            </span>)

                                        
                }
                   <div className={`cursr-pointer absolute bg-slate-400 h-36 w-36 flex items-center justify-center rounded-full ${imageHover? "opacity-100":"opacity-0"} transition-all duration-300`}>
                       <HiOutlinePhotograph className='text-white text-3xl'/>
                       <span className= {`flex items-center justify-center relative cursor-pointer`}>
                           <input id ="profil" type = "file" className='opacity-0 cursor-pointer' multiple = {true} name = "profil" onChange={uploadImages}/>
                       </span>     
                   </div>
                   
                   <div className='absolute'>
                   <HiOutlinePhotograph style = {{opacity:`${imageHover?"1":"0"}`,color:"white",fontSize:"60px"}}/>
                       
                    </div>  
               </div>
               </label>
               {/* <div className='flex flex-col gap-4 mt-4 w-[500px]'>
                   <div>
                       <input type = "text" placeholder='username' className={inputClassName}/> 
                   </div> 
                    <div>
                       <input type = "text" placeholder='username' className={inputClassName}/> 
                   </div>
           
               </div> */}
                   <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '50ch',display:"flex" },
      }}
      noValidate
      autoComplete="off"
    >         <TextField
                   id="outlined-select-currency"
                   select
                   label="Type de compte"
                   value={data.accountType}
                   onChange={(e)=>setData({...data,accountType:e.target.value})}
                   helperText="Veillez choisir le type de compte!"
               >
    {accountType.map((option) => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ))}
  </TextField>
  <TextField value = {data.fullname}  onChange={(e)=>setData({...data,fullname:e.target.value})} helperText="Minimum trois lettres!" id="outlined-basic" label= "Entrez votre nom complet" variant="outlined" />
  {
     data.accountType === "Chercheur d'emploie (Faites vous recruter par des Entreprises dans tout le territoire du pays)" && 
     <TextField
     id="outlined-select-currency"
     select
     label="Profil"
     value={data.workerType}
     onChange={(e)=>setData({...data,workerType:e.target.value})}
     helperText="Veillez choisir le type de profil!"
    >
        {workerType.map((option) => (
        <MenuItem key={option} value={option}>
       {option}
       </MenuItem>
        ))}
    </TextField>  
  }
  <TextField
       id="outlined-select-currency"
       select
       label="Région"
       value={data.region}
       onChange={(e)=>setData({...data,region:e.target.value})}
       helperText="Veillez choisir la région!"
      >
          {regions.map((option) => (
          <MenuItem key={option} value={option}>
         {option}
         </MenuItem>
          ))}
      </TextField>  
{   data.region &&   <TextField
       id="outlined-select-currency"
       select
       label="Ville"
       value={data.city}
       onChange={(e)=>setData({...data,city:e.target.value})}
       helperText="Veillez choisir la ville!"
      >
          {cities.filter(item=>item.region === data.region).map((option) => (
          <MenuItem key={option} value={option.city}>
         {option.city}
         </MenuItem>
          ))}
      </TextField>        }

      {   data.city &&  <TextField value = {data.quarter} onChange={(e)=>setData({...data,quarter:e.target.value})}TextField helperText="Minimum trois lettres!" id="outlined-basic" label= {`Quartier`} variant="outlined" />       }
 
  <TextField value = {data.contact}  onChange={(e)=>setData({...data,contact:e.target.value})} helperText="Minimum trois lettres!" id="outlined-basic" label= "Entrez votre numéro téléphonique" variant="outlined" />
  <div className='flex flex-col'>
         <input  onChange={(e)=>setData({...data,birthday:e.target.value})} value = {data.birthday} className='h-[55px] border px-3 rounded-[4px] w-full' placeholder='date de naissance' type = "date"/>
         <span className='text-[#7e7e7e] text-[13px] relative left-5'>date de naissance</span>
  </div>   
     {data.accountType !== "Client (Rencontrez des freelancers et des entreprises pour realiser vos projets)" && <>
     <>     
     <TextField
       id="outlined-select-currency"
       select
       label="Secteur d'activité"
       value={data.secteur}
       onChange={(e)=>setData({...data,secteur:e.target.value})}
       helperText="Veillez choisir votre secteur d'activité!"
      >
          {secteurs.map((option) => (
          <MenuItem key={option} value={option.name}>
         {option.name}
         </MenuItem>
          ))}
      </TextField> 
   <TextField
       id="outlined-select-currency"
       select
       label="Profession"
       value={data.work}
       onChange={(e)=>setData({...data,work:e.target.value})}
       helperText="Veillez choisir votre secteur d'activité!"
      >
          {works.filter(w=>w.secteur === data.secteur).map((option) => (
          <MenuItem key={option} value={option.profession}>
         {option.profession}
         </MenuItem>
          ))}
      </TextField></> 

         {   data.accountType ==="Commerçant (Créez vos Boutiques et vendez vos produits)"|| "Freelancer (Faites vous embaucher et gagnez des marchés)" && 
      <>
            <TextField type ="number" onChange={(e)=>setData({...data,experience:e.target.value})} value = {data.experience} helperText="Combien d'années d'expériences avez-vous?" id="outlined-basic" label= {`Années d'expériences`} variant="outlined" /> 

            <TextField
       id="outlined-select-currency"
       select
       label="Niveau d'étude"
       value={data.diplome}
       onChange={(e)=>setData({...data,diplome:e.target.value})}
       helperText="Quel niveau d'étude avez-vous?!"
      >
          {diplomes.map((option) => (
          <MenuItem key={option} value={option}>
         {option}
         </MenuItem>
          ))}
      </TextField>
      <TextField
       id="outlined-select-currency"
       select
       label="Statut linguistique"
       value={data.langue}
       onChange={(e)=>setData({...data,langue:e.target.value})}
       helperText="Combien de langues parlez vous?!"
      >
          {["Français","Anglais","Bilingue"].map((option) => (
          <MenuItem key={option} value={option}>
         {option}
         </MenuItem>
          ))}
      </TextField>
      <TextField
       id="outlined-select-currency"
       select
       label="Sexe"
       value={data.sexe}
       onChange={(e)=>setData({...data,sexe:e.target.value})}
       helperText="Veillez choisir le sexe!"
      >
          {["Masculin","Féminin"].map((option) => (
          <MenuItem key={option} value={option}>
         {option}
         </MenuItem>
          ))}
      </TextField>
{     data.accountType === "Chercheur d'emploie (Faites vous recruter par des Entreprises dans tout le territoire du pays)" && <> 
      <div className='w-full'>
      <label htmlFor='cv' className='cursor-pointer shadow-sm hover:shadow-lg flex flex-row justify-center border w-full py-[10px] items-center gap-2 px-20 bg-[#414141] text-white rounded-lg shadow-sm'>
         <ImUpload/> Importer votre cv {"(pdf)"}
        <input type = "file" id = "cv" onChange = {uploadCv} style = {{display:"none"}}/>
      </label>
      </div></>}
      

      </>        }
        
</> 

}
<div className='flex w-full justify-start'>
<button onClick = {setProfile} className='flex gap-2 items-center justify-center border w-full py-[10px] hover:shadow-lg px-20 bg-appPrimaryColor text-white rounded-lg shadow-sm'>
{isLoading2? "Enregistrement...":<><HiSaveAs/> Enregistrer</>}
</button>
</div>
    </Box>
           </div> 
       </div>
       

   </div>
  )
}











