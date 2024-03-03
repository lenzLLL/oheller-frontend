import { useState } from "react";
import "react-input-range/lib/css/index.css";
import ProductCardStyleOne from "../../components/product/ProductCardStyleOne";
import Star from "../../components/icons/Star";
import ProductsFilter from "../../components/product/ProductsFilter";
import { useRouter } from "next/router";
import { GET_ALL_SHOPS, SEARCH_ALL_SERVICES } from "@/utils/Constant";
import { useEffect } from "react";
import axios from "axios";
import { TbTruckDelivery } from "react-icons/tb";
import ShopsFilter from "@/components/shops/ShopFIlter";
import ServiceFilter from "@/components/service/ServiceFIlter";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
export default function SallerPage() {
  const [filters, setFilter] = useState({
    mobileLaptop: false,
    gaming: false,
    imageVideo: false,
    vehicles: false,
    furnitures: false,
    sport: false,
    foodDrinks: false,
    fashion: false,
    toilet: false,
    makeupCorner: false,
    babyItem: false,
    apple: false,
    samsung: false,
    walton: false,
    oneplus: false,
    vivo: false,
    oppo: false,
    xiomi: false,
    others: false,
    sizeS: false,
    sizeM: false,
    sizeL: false,
    sizeXL: false,
    sizeXXL: false,
    sizeFit: false,
  });
  const getData = async () =>{
    try{
       const {data} = await axios.get(`${SEARCH_ALL_SERVICES}`,{withCredentials:true})  
       setServices(data.services)
       setOldServices(data.services)
      }
    catch(err)
    {
      alert(err)
    }
}
const [services,setServices] = useState([])
const [oldServices,setOldServices] = useState([])
const checkboxHandler = (e) => {
    const { name } = e.target;
    setFilter((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  const getAverage = (reviews) => {
    if(reviews){
      let A = 0
      reviews.forEach(({rating})=>A+=rating)
      A /= reviews.length
      return (A.toFixed(1))
    }
    return 0     
}
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
  useEffect(
    ()=>{
        getData()
    },[]
  )
  return (
    <>
  
        <div className="products-page-wrapper w-full bg-gray-100 px-[20px] lg:px-[60px] pt-[50px] mt-[110px]">
          <div className="container-x mx-auto ">
            <div className="w-full lg:flex lg:space-x-[30px]">
              <div className="lg:w-[270px]">
                <ServiceFilter
                  filterToggle={filterToggle}
                  onCheckboxHandler={setToggle}
                  onServices = {setServices}
                  oldData = {oldServices}
                  filterToggleHandler={() => setToggle(!filterToggle)}
                  filters={filters}
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
                      <span className="text-qgray"> Resulta</span>  {services?.length>0?services.length:0}
                    
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3    xl:gap-[30px] gap-5 mb-[40px]">
                  
                    {services.map( (service,index ) =>{
                        
                        let r = service.reviews.length > 0? getAverage(service.reviews):0
                        return(
                                                         <div className='flex flex-col gap-1 p-1 cursor-pointer mb-8' onClick={()=>router.push(`/service/${service.id}`)}>
                                                         <div className='relative h-52 sm:h-40 w-[100%'>
                                                             <Image src = {service.images[0]} fill alt ="service" className='rounded-xl'/>  
                                                         </div>
                                                         <div className='flex item-center gap-2'>
                                                             {
                                                               service.createdBy.url_image?
                                                                   <Image src = {service?.createdBy?.url_image} width={30} height={30} alt = "profile" className='rounded-full'/> 
                                                               :
                                                                   <div className='bg-purple-500 h-7 w-7 p-0 flex items-center justify-center rounded-full relative'>
                                                                       <span className='text-lg text-white'>
                                                                           {service.createdBy.email[0].toUpperCase()}  
                                                                       </span>
                                                                   </div>   
                                                       
                                                             }
                                                             <span className='text-md'>
                                                                 <strong className='font-medium'>{service.createdBy.fullname}</strong>
                                                             </span>
                                                         </div>
                                                         <div>
                                                             <p className='cursor-pointer line-clamp-2 text-[#404145] h-12'>{service.title.length>50?service?.title.substring(0,45)+"...":service.title}</p>
                                                         </div>
                                                         <div className='flex items-center gap-1 text-yellow-400'>
                                                             <FaStar/>
                                                             <span className='font-medium'>{r}</span>
                                                             <span className='text-[#74767e]'>({service.reviews.length})</span>
                                                         </div>
                                                         <p className='font-semibold'>A partir de {service.price} XAF</p>
                                                     </div> )}  
                    )}
               
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
