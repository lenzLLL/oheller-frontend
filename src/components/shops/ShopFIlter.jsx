import React,{useEffect,useState} from "react"
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import Checkbox from "../product/Checkbox";
import { useStateProvider } from "@/context/StateContext";
import axios from "axios"
import { MenuItem,TextField } from "@mui/material";
import { GET_ALL_SECTEUR } from "@/utils/Constant";

export default function ShopsFilter({
  filters,
  checkboxHandler,
  onCheckboxHandler,
  volume,
  volumeHandler,
  storage,
  onShops,
  oldData,
  filterstorage,
  className,
  filterToggle,
  filterToggleHandler,
}) {
  const [{showLoginModal,showSignupModal,userInfos,status},dispatch] = useStateProvider()
  const [dataFilter,setDataFilter] = useState({
    secteur:"Tout",
    location:"Dans tout le territoire"
  })
  const [secteurs,setSecteurs] = useState([

  ])

  const [localisations,setLocalisations] = useState([
    "Dans ma ville","Dans ma région","Dans tout le territoire"
  ])
  const localisation = [
    "Dans ma ville",
    "Dans ma région",
    "Dans tout le territoire"
  ]
  const fixSecteur = (value) => {
      setDataFilter({...dataFilter,secteur:value})
      let a = []
      if(value !== "Tout")
      {
          a = oldData?.filter(d=>d.secteur === value)   
          if(dataFilter.location !== "Dans tout le territoire")
          {
            if(dataFilter.location === "Dans ma ville")
            {
                a = a.filter(d=>d.city === userInfos.city)
            }
            else{
              a = a.filter(d=>d.region === userInfos.region)
              
            }  
          }
      }
      else{
        a = oldData
        if(dataFilter.location !== "Dans tout le territoire")
        {
          if(dataFilter.location === "Dans ma ville")
          {
              a = a.filter(d=>d.city === userInfos.city)
              
          }
          else{
            a = a.filter(d=>d.region === userInfos.region)
            
          }  
        }
      }
     
      

      onShops(a)
      
  }
  const fixLocation = (value) => {
    setDataFilter({...dataFilter,location:value}) 
    let a = oldData
    if(value !== "Dans tout le territoire")
    {
          
          if(value === "Dans ma ville")
          {
              a = a.filter(d=>d.city === userInfos.city)
          
          }
          else{
            a = a.filter(d=>d.region === userInfos.region)
            
          }  
          if(dataFilter.secteur !== "Tout")
          {
              a = a?.filter(d=>d.secteur === dataFilter.secteur) 
           }
        
    }
    else{
      a = oldData
      if(dataFilter.secteur !== "Tout")
      {
          a = a?.filter(d=>d.secteur === dataFilter.secteur) 
       }
      }
   
    onShops(a)
    

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
              Secteur
            </h1>
          </div>
          <div className="filter-items">
          <TextField
     id="outlined-select-currency"
     select
     className="w-full"
     label="Catégorie"
     value={dataFilter.cat}
     onChange={(e)=>fixSecteur(e.target.value)}
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
