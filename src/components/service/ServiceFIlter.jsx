import React,{useEffect,useState} from "react"
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import Checkbox from "../product/Checkbox";
import { useStateProvider } from "@/context/StateContext";
import { GET_ALL_SECTEUR, GET_ALL_SERVICES } from "@/utils/Constant";
import { TextField,MenuItem } from "@mui/material";
import axios from "axios"

export default function ServiceFilter({
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
  filterToggleHandler,
}) {
  
  const [services,setServices] = useState([])
  const getData = async () =>{
    try{
       const {data} = await axios.get(`${GET_ALL_SERVICES}`,{withCredentials:true})  
       setServices(data.services)
      }
    catch(err)
    {
      alert(err)
    }
}
  const [{showLoginModal,showSignupModal,userInfos,status},dispatch] = useStateProvider()
  const [dataFilter,setDataFilter] = useState({
    cat:"Tout",
    location:"Dans tout le territoire"
  })
  const [categories,setCategories] = useState([
    
  ])
  const getSecteurs = async () =>{
    try{
       const {data} = await axios.get(`${GET_ALL_SECTEUR}`,{withCredentials:true})  
       let d = ["Tout"]
       for(let i =0;i<data.secteurs.length;i++){
           d.push(data.secteurs[i].name)
       }
       setCategories(d)
       
      }
    catch(err)
    {
      alert(err)
    }
  }
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
 useEffect(
  ()=>{
       getSecteurs()
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
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">
              Catégories
            </h1>
          </div>
          <div className="filter-items">
          <TextField
     id="outlined-select-currency"
     select
     className="w-full"
     label="Catégorie"
     value={dataFilter.cat}
     onChange={(e)=>fixCategory(e.target.value)}
     helperText=""
    >
        {categories.map((option) => (
        <MenuItem key={option} value={option}>
       {option}
       </MenuItem>
        ))}
    </TextField>  
          </div>
     
        </div>

        <div className="filter-subject-item pb-10 ">
          <div className="subject-title mt-5 mb-[30px]">
            <h1 className="text-black text-base font-500">
              Localisation
            </h1>
          </div>
          <div className="filter-items">
            <ul>
              {
                localisation.map(
                  (sectuer)=>{
                    return (
                      <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div onClick={()=>fixLocation(sectuer)}>
                    <Checkbox
                      id="mobileLaptop"
                      name="mobileLaptop"
                      checked={dataFilter.location === sectuer? true:false}
                      
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="mobileLaptop"
                      className="text-xs font-black font-400 capitalize"
                    >
                      {sectuer}
                    </label>
                  </div>
                </div>
                <div>
                
                </div>
              </li>
                    )
                  }
                )
              }
           
            </ul>
          </div>
        </div>
          <button onClick={()=>onCheckboxHandler(false)} className="w-[100%] bg-blue-400 shadow-lg text-white rounded-md py-2 mb-5 lg:hidden">Appliquer</button>
      </div>
    </>
  );
}
