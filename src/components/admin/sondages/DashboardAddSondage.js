import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import { MenuItem } from '@mui/material';
import {HiSaveAs} from "react-icons/hi"
import InputRange from "react-input-range";
import {ImFilePicture} from "react-icons/im"
import { useCookies } from 'react-cookie'
import axios from 'axios';
import { ADD_PRODUCT, ADD_SERVICE, ADD_SHOP, GET_ALL_SHOPS_USER, GET_ALL_USERS, GET_USER_INFOS } from '@/utils/Constant';
import { MdDelete } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useStateProvider } from '@/context/StateContext';
export default function DashboardAddSondage() {
  const [images,setImages] = useState([])
  const [features,setFeatures] = useState([])
  const [shops,setShops] = useState([])
  const [users,setUsers] = useState([])
  const [user,setUser] = useState([])
  const [shopFeatures,setShopFeatures] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  const [currentFeature,setCurrentFeature] = useState()
  const [isHover,setIsHover] = useState(false)
  const [cookies] = useCookies()
  const [isHover2,setIsHover2] = useState(false)
  const [sizes,setSizes] = useState(["Aucunes","sm,md,lg,xl..."])
  const regions = [
    "Tout",
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
  const [{showLoginModal,showSignupModal,userInfos},dispatch] = useStateProvider()
  const villes = [
    {
      region:"Région de l'Ouest",
      ville:"Tout"
    },
    {
      region:"Région de l'Ouest",
      ville:"Bafoussam"
    }
  ]
  const roo ="p-[20px] rounded-[10px] border border-[#384256] text-white flex-1 "
  const [data,setData] = useState(
    {
        title:"",
        days:7,
        numQuest:5,
        sexe:"Sans distinction",
        participants:0,
        secteur:"Tout",
        profession:"Tout",
        ageMin:15,
        ageMax:100,
        region:"Tout",
        city:"Tout"
    }
  )
  const getUsers = async () => {
    try{
        const data = await axios.get(GET_ALL_USERS,{withCredentials:true}).then(
            (response)=>{
                setUsers(response.data.users)
            }
        )  
    }
    catch(err)
    {
        alert(err)
    }
  } 
  const goToNext = () =>{
    
    if(!data.region || !data.city || !data.title || data.ageMin <= 0 || data.ageMax <= 0 || data.ageMax<=0 || data.ageMin<=0||data.days<=0||data.numQuest<=0)
    {
        Swal.fire({
            title: 'Error!',
            text: "veillez remplir tous les champs avant l'enregistrement",
            icon: 'error',
            confirmButtonText: 'Ok',
            buttonsStyling:"danger"
          }) 
          return
    } 
    else if(data.ageMax < data.ageMin)
    {
        Swal.fire({
            title: 'Error!',
            text: "veillez vérifier les valeurs au niveau des champs ages",
            icon: 'error',
            confirmButtonText: 'Ok',
            buttonsStyling:"danger"
          }) 
    }
    else if(data.participants>verifySondage().length)
    {
      Swal.fire({
        title: 'Error!',
        text: "Le nombre d'utilisateurs correpondant à vos crictères est de "+verifySondage().length+" dans notre base de données",
        icon: 'error',
        confirmButtonText: 'Ok',
        buttonsStyling:"danger"
      })  
      return 
    }
    else{
        Swal.fire(
            'Opération validée',
            "",
            'success'
          )  
        }
        localStorage.setItem("users-sondage",JSON.stringify(verifySondage()))
        localStorage.setItem("sondage1",JSON.stringify(data))
        localStorage.removeItem("questions")
        router.push("/dashboard/sondages/questions")
    
  }

  const router = useRouter()
  const secteurs = [
    "Tout",
    "Agriculture",
    "Informatique",
    "Industrie",
    "autres"
  ]
  const professions = [
    {
        secteur:"Informatique",
        profession:"Tout"
    },
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

   useEffect(
    ()=>{
      if(cookies.jwt)
      {   
    
          
          const getUserInfos = async () =>{
          
          try{
              
              const {data:{user}} = await axios.post(GET_USER_INFOS,{},{withCredentials:true})
              setUser(user)
              let userDatas = {...user}
              dispatch({type:reducerCases.SET_USER,userInfos:userDatas})
        
                 
          }
          catch(err)
          {
             console.log(err)
          }

         }
         getUserInfos()
         
      }
        if(localStorage.getItem("sondage1"))
        {
             setData({...JSON.parse(localStorage.getItem("sondage1"))})
      
        }
        getUsers()
    },[userInfos,cookies]
   )
   const [activeStep, setActiveStep] = React.useState(0);
   const [skipped, setSkipped] = React.useState(new Set());
 
   const isStepOptional = (step) => {
     return step === 1;
   };
 
   const isStepSkipped = (step) => {
     return skipped.has(step);
   };
   const verifySondage = () => {
    let USERS = users
    let date = new Date()
    let year = date.getFullYear()
    if(data.sexe !== "Sans distinction")
    {
        USERS = USERS.filter(user=>user.sexe === data.sexe)
    }

    if(data.region !== "Tout")
    {
        USERS = USERS.filter(user => user.region === data.region)
        if(data.city !== "Tout")
        {
            USERS = USERS.filter(user => user.city === data.city)
        }
    }


  
    if(data.secteur !== "Tout")
    {
        USERS = USERS.filter(user => user.secteur === data.secteur)
    }

    if(data.profession !== "Tout")
    {
        USERS = USERS.filter(user => user.work === data.profession)
    }

    USERS = USERS.filter(u=> u.id !== user.id)
    
    USERS = USERS.filter(user=>(year - parseInt(user?.birthday.toString().split("-")[0]))>=parseInt(data.ageMin))
    USERS = USERS.filter(user=>(year - parseInt(user?.birthday.toString().split("-")[0]))<=parseInt(data.ageMax))
    
      
     return USERS
     
   }
 
 



    return (
        <div className='dashboarshop' >
                  
                   <div className= {roo+" box9 bg-white pt-10"}>
                   <Stepper activeStep={0}>
        {["Informations","Questions","Paiement","Réponses"].map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption"></Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
       <h3 className='text-2xl text-gray-900 mb-5 text-center mt-10'>Entrez les premières informations pour votre sondage</h3>
       <div className='mt-10 flex flex-col gap-5 '>
           <div className='grid grid-cols-2 gap-11'>
               <TextField value = {data.title}  onChange={(e)=>setData({...data,title:e.target.value})} helperText="Minimum trois lettres!" id="outlined-basic" label= {`Entrez un titre à votre sondage`} variant="outlined" />              
               <TextField
                  id="outlined-select-currency"
                  select
                  label="Nombre de jours"
                  value={data.days}
                  onChange={(e)=>setData({...data,days:e.target.value})}
                  helperText="Veillez choisir une Boutique!"
               >
                    {[1,2,3,4,5,6,7].map((option) => (
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
                  label="Nombre de questions"
                  value={data.numQuest}
                  onChange={(e)=>setData({...data,numQuest:e.target.value})}
                  helperText="Veillez choisir une Boutique!"
               >
                    {[1,2,3,4,5,6,7,8,9,10].map((option) => (
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
                  helperText="Veillez choisir une Boutique!"
               >
                    {["Sans distinction","Masculin","Féminin"].map((option) => (
                    <MenuItem key={option} value={option}>
                    {option}
                    </MenuItem>
                    ))}
                </TextField>   
           </div>
           <div className={`grid ${data.secteur !== "Tout"? "grid-cols-2 gap-11":"grid-cols-1"}`}>
           <TextField
       id="outlined-select-currency"
       select
       label="Secteur d'activité"
       value={data.secteur}
       onChange={(e)=>setData({...data,secteur:e.target.value})}
       helperText="Veillez choisir votre secteur d'activité!"
      >
          {secteurs.map((option) => (
          <MenuItem key={option} value={option}>
         {option}
         </MenuItem>
          ))}
      </TextField> 
{ data.secteur !== "Tout" &&   <TextField
       id="outlined-select-currency"
       select
       label="Profession"
       value={data.profession}
       onChange={(e)=>setData({...data,profession:e.target.value})}
       helperText="Veillez choisir votre secteur d'activité!"
      >
          {professions.filter(p=>p.secteur===data.secteur).map((option) => (
          <MenuItem key={option} value={option.profession}>
         {option.profession}
         </MenuItem>
          ))}
      </TextField>}
           </div>
           
           <div className='grid grid-cols-1'>
               <TextField type = "number" value = {data.participants}  onChange={(e)=>setData({...data,participants : e.target.value})} helperText="maximum 500 caractères!" id="outlined-basic" label= {`Nombre de participants`} variant="outlined" />
           </div>
           <div className='grid grid-cols-2 gap-11'>
               <TextField type = "number" value = {data.ageMin}  onChange={(e)=>setData({...data,ageMin : e.target.value})}  id="outlined-basic" label= {`Age minimun`} variant="outlined" />
               <TextField type = "number" value = {data.ageMax}  onChange={(e)=>setData({...data,ageMax : e.target.value})}  id="outlined-basic" label= {`Age Maximal`} variant="outlined" />
               
           </div>
           <div className='grid grid-cols-2 gap-11'>
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
{   data.region && data.region !== "Tout" &&   <TextField
       id="outlined-select-currency"
       select
       label="Ville"
       value={data.city}
       onChange={(e)=>setData({...data,city:e.target.value})}
       helperText="Veillez choisir la ville!"
      >
          {villes.filter(item=>item.region === data.region).map((option) => (
          <MenuItem key={option} value={option.ville}>
         {option.ville}
         </MenuItem>
          ))}
      </TextField>        } 
           </div>
           
     
    
           
              
    
           <button onClick={()=>goToNext()}   className='flex cursor-pointer gap-1 outline-none items-center justify-center border w-[300px] py-[13px] hover:shadow-lg px-20 bg-purple-500 text-white rounded-lg shadow-sm'>
                Continuer
           </button>

       </div>  

        </div>  
       </div>
  )
}
