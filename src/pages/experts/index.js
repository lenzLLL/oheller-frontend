import { useState } from "react";
import Swal from "sweetalert2"
import { useCookies } from 'react-cookie'
import "react-input-range/lib/css/index.css";
import ProductCardStyleOne from "../../components/product/ProductCardStyleOne";
import Star from "../../components/icons/Star";
import ProductsFilter from "../../components/product/ProductsFilter";
import { useRouter } from "next/router";
import { GET_ALL_EXPERTS, GET_ALL_SHOPS, GET_ALL_USERS, GET_USER_INFOS, SEND_REQUEST_WORK } from "@/utils/Constant";
import { useEffect } from "react";
import axios from "axios";
import { TbTruckDelivery } from "react-icons/tb";
import ShopsFilter from "@/components/shops/ShopFIlter";
import ExpertFilter from "@/components/expert/ExpertFIlter";
import { useStateProvider } from "@/context/StateContext";
import { PROFIL_WORKER } from "@/utils/Constants2";

export default function SallerPage() {

  const [users,setUsers] = useState([])
  const [oldUsers,setOldUsers] = useState([])
  const [{showLoginModal,showSignupModal,userInfos,status},dispatch] = useStateProvider()
  const [user,setUser] = useState()
  const [cookies] = useCookies()
  
  const getUsers = async () => {
    try{
        const data = await axios.get(GET_ALL_USERS,{withCredentials:true}).then(
            (response)=>{
                let datas = response.data.users.filter(user=>user.accountType === PROFIL_WORKER&&user.id !== userInfos?.id)
                setUsers(datas)
                setOldUsers(datas)
                
            }
        )
   
        
        
    }
    catch(err)
    {
    
    }
  }

  const checkboxHandler = (e) => {
    const { name } = e.target;
    setFilter((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  const [volume, setVolume] = useState({ min: 200, max: 500 });
  const [storage, setStorage] = useState(null);
  const filterStorage = (value) => {
    setStorage(value);
  };
  const [filterToggle, setToggle] = useState(false);
  const router = useRouter()
  const sendToProduct = (id) => {
    localStorage.setItem("currentShop", JSON.stringify(id))
    router.push("/seller/shop/"+id)
  }

  const goToPayment = (id,email,name) =>{
    router.push("/experts/payment")
    localStorage.setItem("cvdata",JSON.stringify({id,email,name}))
  }
  useEffect(
    ()=>{

        getUsers()
    },[]
  )
  return (
    <>
  
        <div className="products-page-wrapper w-full bg-gray-100 px-[20px] lg:px-[60px] pt-[50px] mt-[110px]">
          <div className="container-x mx-auto ">
            <div className="w-full lg:flex lg:space-x-[30px]">
              <div className="lg:w-[270px]">
                <ExpertFilter
                  filterToggle={filterToggle}
                  onCheckboxHandler={setToggle}
                  onUsers = {setUsers}
                  oldData = {oldUsers}
                  filterToggleHandler={() => setToggle(!filterToggle)}
                  filters={[]}
                  checkboxHandler={checkboxHandler}
                  volume={volume}
                  volumeHandler={(value) => setVolume(value)}
                  storage={storage}
                  filterstorage={filterStorage}
                  className="mb-[30px]"
                />
                {/* ads */}

              </div>

              <div className="flex-1">
                <div className="products-sorting w-full bg-white md:h-[70px] flex md:flex-row flex-col md:space-y-0 space-y-5 md:justify-between md:items-center p-[30px] mb-[40px]">
                  <div>
                    <p className="font-400 text-[13px]">
                      <span className="text-qgray"> Resultat</span>  {users?.length>0?users.length:0}
                    
                    </p>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <span className="font-400 text-[13px]">Sort by:</span>
                    <div className="flex space-x-3 items-center border-b border-b-qgray">
                      <span className="font-400 text-[13px] text-qgray">
                        Default
                      </span>
                      <span>
                        <svg
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1 1L5 5L9 1" stroke="#9A9A9A" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setToggle(!filterToggle)}
                    type="button"
                    className="w-10 lg:hidden h-10 rounded flex justify-center items-center border border-qyellow text-qyellow"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="grid xl:grid-cols-3 sm:grid-cols-2 md:grid-cols-2 grid-cols-1  xl:gap-[30px] gap-5 mb-[40px]">
                  
                    {users?.map( (user,index ) => (
                                   <div class="parent">
                                   <div class="card">
                                       <div class="logo">
                                       
                                           
                                           
                                           <span class="circle circle2 relative flex items-center justify-center">
                                               <img style = {{borderRadius:"50%",width:"100px",height:"100px"}} src ={user.url_image? user.url_image:"https://t4.ftcdn.net/jpg/05/86/91/55/360_F_586915596_gPqgxPdgdJ4OXjv6GCcDWNxTjKDWZ3JD.webp"}/>
                                           </span>
                           
                                       </div>
                                       <div class="glass"></div>
                                       <div class="content">
                                           <span class="title mt-1">ID: #{user.id}</span>
                                           <span class="text">Métier: {user?.work}</span>
                                           <span class="text">Années d'expériences: {user?.experience}</span>
                                           <span class="text">Langues parlées: {user.langue}</span>
                                           <span class="text">Diplome: {user.diplome}</span>
                                           <span class="text">Localisation: {user.city}</span>
                                           <span class="text">Sexe: {user.sexe} </span>
                                        
                                        

                                       </div>
                                       <div class="bottom text-center mx-auto ">
                                           
                                           <div class="social-buttons-container">
                                               <button onClick={()=>goToPayment(user.id,user.email,user.fullname)} class="text-sm px-3 profil-button .social-button1">
                                                Obtenir le cv</button>
                                                                                       
                                           </div>
                                       
                                       </div>
                                   </div>
                               </div>
                    ))}
               
                </div>
              


                {/* <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]">
                  <DataIteration
                    datas={productDatas}
                    startLength={6}
                    endLength={15}
                  >
                    {({ datas }) => (
                      <div data-aos="fade-up" key={datas.id}>
                        <ProductCardStyleOne datas={datas} />
                      </div>
                    )}
                  </DataIteration>
                </div> */}
              </div>
            </div>
          </div>
        </div>
  
    </>
  );
}
