import { useStateProvider } from "@/context/StateContext";
import Image from "next/image";
import {BsCheckCircle} from "react-icons/bs"
import { useRouter } from "next/router";
import { PROFIL_SELLER } from "@/utils/Constants2";
import { reducerCases } from "@/context/Constant";
function FyverBusiness(){
    const router = useRouter()
    
    const everyThingsDatas = [
        {
            title:"Respect de votre budget",
            subtitle:"Plus besion de dépense un énorme somme d'argent pour des sites e-commerce, créez votre boutique à bas prix"
        },
        {
            title:"Correspondance de la clientelle",
            subtitle:"Find the right service for every price. No hourly rates, just projet based price"
        },
        {
            title:"Une grande communauté de clients",
            subtitle:"Find the right service for every price. No hourly rates, just projet based price"
        },
        {
            title:"Prise en compte des produits numériques",
            subtitle:"Find the right service for every price. No hourly rates, just projet based price"
        },
        {
            title:"Une équipe d'administration à votre service",
            subtitle:"Find the right service for every price. No hourly rates, just projet based price"
        },
    ]
    const [{showLoginModal,showSignupModal,userInfos,status},dispatch] = useStateProvider()
    
    const createShop = () =>{
        if(!userInfos){
            dispatch({type:reducerCases.TOGGLE_SIGNUP_MODAL,showSignupModal:false})   
        
   
       dispatch({type:reducerCases.TOGGLE_LOGIN_MODAL,showLoginModal:true})      
        }
        else{
            if(userInfos.accountType === PROFIL_SELLER){
                router.push("/dashboard/seller/shops")   
            }
            else{
                 router.push("/profil") 
            }
        }
    }
    return <div className="bg-[#0a1833] flex flex-col lg:flex-row px-5 tlg:px-10 xl:px-20 py-10 justify-between">
        <div className="w-full lg:w-2/4">
            <h2 className="mb-5 text-3xl text-white font-bold">
                Ö Heller<span className="text-appPrimaryColor text-[50px]">.</span> Shop
            </h2>
            <p className="mb-5 text-2xl text-white font-bold">
            Une solution conçue pour votre entreprise
            </p>
            <p className="mb-5 text-lg text-white">
            Passez à une expérience organisée pour accéder à des client à travers le territoire en fonction de votre position géographique
            </p>
            <ul className="flex flex-col gap-1 my-10">
                {
                    everyThingsDatas.map(
                        ({title,subtitle})=>{
                            return(
                                <li key = {title}>
                                    <div className="flex items-center gap-5 my-1">
                                        <BsCheckCircle className="text-[#d3b6d344] text-3xl"/>
                                        <h4 className=" text-xl text-white font-semibold">{title}</h4> 

                                    </div>
               
                                </li>
                            )
                        }
                    )
                }
            </ul>
            <div style = {{borderRadius:"10px"}} className="relative h-[100%] rounded-2xl block mb-10 lg:hidden w-full">
            <img className="rounded-[5px] shadow-md" height={"100%"} width={"100%"} src = "/transparent.png"/>
        </div>      
            <button onClick={()=>createShop()} className="bg-appPrimaryColor py-3 border-appPrimaryColor px-3 rounded-lg shadow-sm text-white">
                Créer Sa Boutique
            </button>
        </div>
        <div style = {{borderRadius:"10px"}} className="relative h-[100%] rounded-2xl hidden lg:block lg:w-2/4">
            <img className="rounded-[5px] shadow-md" height={"100%"} width={"100%"} src = "/transparent.png"/>
        </div>
        <div>

        </div>
    </div>       
}

export default FyverBusiness;