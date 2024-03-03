import React,{useEffect,useState,useCallback} from "react"
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import Checkbox from "../product/Checkbox";
import { useStateProvider } from "@/context/StateContext";
import { TextField,MenuItem } from "@mui/material";
import { GET_ALL_CITIES, GET_ALL_SECTEUR } from "@/utils/Constant";
import axios from "axios"
export default function ExpertFilter({
  filters,
  checkboxHandler,
  onCheckboxHandler,
  volume,
  volumeHandler,
  storage,
  onServices,
  oldData,
  filterstorage,
  className,
  filterToggle,
  onUsers,
  filterToggleHandler,
}) {
  const [{showLoginModal,showSignupModal,userInfos,status},dispatch] = useStateProvider()
  const [dataFilter,setDataFilter] = useState({
    typeWorker:"Tout",
    region:"Dans tout le territoire",
    sexe:"Hommes et Femmes",
    ville:"Toutes les villes",
    diplome:"Aucun",
    secteur:"Tout",

  })
  const [secteurs,setSecteurs] = useState([])
  const diplomes = [
    "Aucun",
    "CEP",
    "GCE",
    "BAC",
    "BTS",
    "LICENSE",
    "MASTER 1",
    "MASTER 2",
    "Autre"
  ]
  const [categories,setCategories] = useState([
    "Tout","Développement web","appareils","vetements","montres"
  ])
  const [cities,setCities] = useState([])
  const regions = [
    "Dans tout le territoire",
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
  const reloadFilter = () =>{
      let currentData = oldData
      if(dataFilter.diplome !== "Aucun"){
          currentData = currentData?.filter(c=>c.diplome === dataFilter.diplome)
      }
      if(dataFilter.typeWorker !== "Tout"){
        currentData = currentData?.filter(c=>c.workerType === dataFilter.typeWorker)
      }
      if(dataFilter.region !== "Dans tout le territoire"){
        currentData = currentData?.filter(c=>c.region === dataFilter.region)
      }

      if(dataFilter.sexe !== "Hommes et Femmes"){
        currentData = currentData?.filter(c=>c.sexe === dataFilter.sexe)
    }
    if(dataFilter.ville !== "Toutes les villes"){
      currentData = currentData?.filter(c=>c.city === dataFilter.ville)
    }
    if(dataFilter.secteur !== "Tout"){
      currentData = currentData?.filter(c=>c.secteur === dataFilter.secteur)
    }
      onUsers(currentData)
            
               
  }
  const getSecteurs = async () =>{
    try{
       const {data} = await axios.get(`${GET_ALL_SECTEUR}`,{withCredentials:true})  
       let d = ["Tout"]
       for(let i =0;i<data.secteurs.length;i++){
           d.push(data.secteurs[i].name)
       }
       setSecteurs(d)
       
      }
    catch(err)
    {
      alert(err)
    }
  }
  const villes = [
    "Toutes les villes",
    "Bafoussam",
    "Bertoua"
  ]
 const sexe = [
  "Hommes et Femmes",
  "Hommes",
  "Femmes"
 ]
  
  const typeWorker = [
    "Tout",
    "Prestataire indépendant",
    "Chercheur d'emploi"
  ]
  const [localisations,setLocalisations] = useState([
    "Dans ma ville","Dans ma région","Dans tout le territoire"
  ])
  const localisation = [
    "Dans ma ville",
    "Dans ma région",
    "Dans tout le territoire"
  ]
  const fixCategory = (value) => {
      setDataFilter({...dataFilter,cat:value})
      let a = []
      if(value !== "Tout")
      {
          a = oldData?.filter(d=>d.category === value)   
          if(dataFilter.location !== "Dans tout le territoire")
          {
            if(dataFilter.location === "Dans ma ville")
            {
                a = a.filter(d=>d.createdBy.city === userInfos.city)
            }
            else{
              a = a.filter(d=>d.createdBy.region === userInfos.region)
              
            }  
          }
      }
      else{
        a = oldData
        if(dataFilter.location !== "Dans tout le territoire")
        {
          if(dataFilter.location === "Dans ma ville")
          {
              a = a.filter(d=>d.createdBy.city === userInfos.city)
              
          }
          else{
            a = a.filter(d=>d.createdBy.region === userInfos.region)
            
          }  
        }
      }
     
      

      onServices(a)
      
  }
  const fixLocation = (value) => {
    setDataFilter({...dataFilter,location:value}) 
    let a = oldData
    if(value !== "Dans tout le territoire")
    {
          
          if(value === "Dans ma ville")
          {
              a = a.filter(d=>d.createdBy.city === userInfos.city)
          
          }
          else{
            a = a.filter(d=>d.createdBy.region === userInfos.region)
            
          }  
          if(dataFilter.cat !== "Tout")
          {
              a = a?.filter(d=>d.category === dataFilter.cat) 
           }
        
    }
    else{
      a = oldData
      if(dataFilter.cat !== "Tout")
      {
          a = a?.filter(d=>d.category === dataFilter.cat) 
       }
      }
    onServices(a)
  }
 const changeSecteur = (value) =>{
     setDataFilter({...dataFilter,secteur:value})
 }
 const changeVille = (value) => {
  setDataFilter({...dataFilter,ville:value})
 }
 const changeRegion = (value) => {
    setDataFilter({...dataFilter,region:value})
 }
 const changeSexe = (value) => {
  setDataFilter({...dataFilter,sexe:value})
 }
 const changeProfil = (value) =>{
 setDataFilter({...dataFilter,typeWorker:value}) 
}
const changeDiplome = (value) => {
  setDataFilter({...dataFilter,diplome:value})
}

const getCities = async () =>{
  try{
     const {data} = await axios.get(`${GET_ALL_CITIES}`,{withCredentials:true})  
     let d = ["Toutes les villes"]
     for(let i =0;i<data.cities.length;i++){
         d.push(data.cities[i].city) 
     }
     setCities(d)
    }
  catch(err)
  {
    alert(err)
  }
}
 useEffect(
  ()=>{
    getSecteurs()
    getCities()
    reloadFilter()
  },[dataFilter]
 )
  return (
    <>
      <div
        className={`filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] ${
          className || ""
        }  ${filterToggle ? "block" : "hidden lg:block"}`}
      >
        <div className="filter-subject-item pb-10 border-b border-qgray-border mt-[100px] lg:mt-0">
          {/* <div className="subject-title mb-[5px]">
            <h1 className="text-black text-base font-500">
              Type de profil
            </h1>
          </div> */}
          <div className="filter-items">
          <TextField
     id="outlined-select-currency"
     select
     className="w-full"
     label="Profil"
     value={dataFilter.typeWorker}
     onChange={(e)=>changeProfil(e.target.value)}
     helperText=""
    >
        {typeWorker.map((option) => (
        <MenuItem key={option} value={option}>
       {option}
       </MenuItem>
        ))}
    </TextField>  
          </div>
        </div>
        <div className="filter-subject-item pb-10 border-b border-qgray-border mt-[20px] lg:mt-0">
          {/* <div className="subject-title mb-[5px]">
            <h1 className="text-black text-base font-500 mt-5">
              Secteur d'activité
            </h1>
          </div> */}
          <div className="filter-items">
          <TextField
     id="outlined-select-currency"
     select
     className="w-full"
     label="Secteur d'activité"
     value={dataFilter.secteur}
     onChange={(e)=>changeSecteur(e.target.value)}
     helperText=""
    >
        {secteurs.map((option) => (
        <MenuItem key={option} value={option}>
       {option}
       </MenuItem>
        ))}
    </TextField>  
          </div>
        </div>
        <div className="filter-subject-item pb-10 border-b border-qgray-border mt-[20px] lg:mt-0">
          {/* <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500 mt-5">
              Niveau d'étude
            </h1>
          </div> */}
           <div className="filter-items">
          <TextField
     id="outlined-select-currency"
     select
     className="w-full"
     label="Niveau d'étude"
     value={dataFilter.diplome}
     onChange={(e)=>changeDiplome(e.target.value)}
     helperText=""
    >
        {diplomes.map((option) => (
        <MenuItem key={option} value={option}>
       {option}
       </MenuItem>
        ))}
    </TextField>  
          </div>
        </div>
        <div className="filter-subject-item pb-10 border-b border-qgray-border mt-[20px] lg:mt-0">
          {/* <div className="subject-title mt-5 mb-[30px]">
            <h1 className="text-black text-base font-500">
              Sexe
            </h1>
          </div> */}
           <div className="filter-items">
          <TextField
     id="outlined-select-currency"
     select
     className="w-full"
     label="Sexe"
     value={dataFilter.sexe}
     onChange={(e)=>changeSexe(e.target.value)}
     helperText=""
    >
        {sexe.map((option) => (
        <MenuItem key={option} value={option}>
       {option}
       </MenuItem>
        ))}
    </TextField>  
          </div>
        </div>
        <div className="filter-subject-item mt-[20px] pb-10 ">
          {/* <div className="subject-title mt-5 mb-[30px]">
            <h1 className="text-black text-base font-500">
              Régions
            </h1>
          </div> */}
           <div className="filter-items">
          <TextField
     id="outlined-select-currency"
     select
     className="w-full"
     label="Région"
     value={dataFilter.region}
     onChange={(e)=>changeRegion(e.target.value)}
     helperText=""
    >
        {regions.map((option) => (
        <MenuItem key={option} value={option}>
       {option}
       </MenuItem>
        ))}
    </TextField>  
          </div>
        </div>
        <div className="mt-[20px] filter-subject-item pb-10 ">
          {/* <div className="subject-title mt-5">
            <h1 className="text-black text-base font-500">
              Villes
            </h1>
          </div> */}
         <div className="filter-items">
          <TextField
     id="outlined-select-currency"
     select
     className="w-full"
     label="Ville"
     value={dataFilter.ville}
     onChange={(e)=>changeVille(e.target.value)}
     helperText=""
    >
        <MenuItem value = "Toutes les villes">
         Toutes les villes
        </MenuItem>
        {cities.filter(c=>c===dataFilter.region).map((option) => (
        <MenuItem key={option} value={option}>
       {option}
       </MenuItem>
        ))}
       
    </TextField>  
          </div>
        </div>
          <button onClick={()=>onCheckboxHandler(false)} className="w-[100%] bg-blue-400 shadow-lg text-white rounded-md py-2 mb-5 lg:hidden">Appliquer</button>
      </div>
    </>
  );
}
