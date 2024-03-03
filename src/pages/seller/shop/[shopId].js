import React, { useState,useEffect } from "react";
import "react-input-range/lib/css/index.css";
import ProductCardStyleOne from "../../../components/product/ProductCardStyleOne";
import DataIteration from "../../../components/product/DataIteration";
import Star from "../../../components/icons/Star";
import ProductsFilter from "../../../components/product/ProductsFilter";
import { GET_SHOP_BY_ID } from "@/utils/Constant";
import { useRouter } from "next/router";
import axios from "axios"
import { TbTruckDelivery } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
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
  const [shop,setShop] = useState({})
  const [products,setProducts] = useState([])
  const [oldshop,setOldShop] = useState({})

  const [interval,setInterval] = useState({
    min:0,
    max:0
  }) 
  const productDatas = [
    {
      id: "62aefe9ad8b80d5234af625a",
      image: "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      brand: "xioami",
      review: 3,
      title: "Xoggle aute et pariatur adipisicing nostrud et excepteur",
      offer_price: "$18.73",
      price: "$27.27",
      campaingn_product: false,
      cam_product_available: null,
      cam_product_sale: null,
      product_type: null
    },
    {
      id: "62aefe9ad8b80d5234af625a",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      brand: "xioami",
      review: 3,
      title: "Xoggle aute et pariatur adipisicing nostrud et excepteur",
      offer_price: "$18.73",
      price: "$27.27",
      campaingn_product: false,
      cam_product_available: null,
      cam_product_sale: null,
      product_type: null
    },
    {
      id: "62aefe9ad8b80d5234af625a",
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      brand: "xioami",
      review: 3,
      title: "Xoggle aute et pariatur adipisicing nostrud et excepteur",
      offer_price: "$18.73",
      price: "$27.27",
      campaingn_product: false,
      cam_product_available: null,
      cam_product_sale: null,
      product_type: null
    },
    {
      id: "62aefe9ad8b80d5234af625a",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      brand: "xioami",
      review: 3,
      title: "Xoggle aute et pariatur adipisicing nostrud et excepteur",
      offer_price: "$18.73",
      price: "$27.27",
      campaingn_product: false,
      cam_product_available: null,
      cam_product_sale: null,
      product_type: null
    },
    {
      id: "62aefe9ad8b80d5234af625a",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      brand: "xioami",
      review: 3,
      title: "Xoggle aute et pariatur adipisicing nostrud et excepteur",
      offer_price: "$18.73",
      price: "$27.27",
      campaingn_product: false,
      cam_product_available: null,
      cam_product_sale: null,
      product_type: null
    },
    {
      id: "62aefe9ad8b80d5234af625a",
      image: "https://images.unsplash.com/photo-1575024357670-2b5164f470c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      brand: "xioami",
      review: 3,
      title: "Xoggle aute et pariatur adipisicing nostrud et excepteur",
      offer_price: "$18.73",
      price: "$27.27",
      campaingn_product: false,
      cam_product_available: null,
      cam_product_sale: null,
      product_type: null
    },
    {
      id: "62aefe9ad8b80d5234af625a",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHByb2R1Y3QlMjB0ZWNofGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      brand: "xioami",
      review: 3,
      title: "Xoggle aute et pariatur adipisicing nostrud et excepteur",
      offer_price: "$18.73",
      price: "$27.27",
      campaingn_product: false,
      cam_product_available: null,
      cam_product_sale: null,
      product_type: null
    },
    {
      id: "62aefe9ad8b80d5234af625a",
      image: "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      brand: "xioami",
      review: 3,
      title: "Xoggle aute et pariatur adipisicing nostrud et excepteur",
      offer_price: "$18.73",
      price: "$27.27",
      campaingn_product: false,
      cam_product_available: null,
      cam_product_sale: null,
      product_type: null
    },
    {
      id: "62aefe9ad8b80d5234af625a",
      image: "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      brand: "xioami",
      review: 3,
      title: "Xoggle aute et pariatur adipisicing nostrud et excepteur",
      offer_price: "$18.73",
      price: "$27.27",
      campaingn_product: false,
      cam_product_available: null,
      cam_product_sale: null,
      product_type: null
    },
    {
      id: "62aefe9ad8b80d5234af625a",
      image: "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      brand: "xioami",
      review: 3,
      title: "Xoggle aute et pariatur adipisicing nostrud et excepteur",
      offer_price: "$18.73",
      price: "$27.27",
      campaingn_product: false,
      cam_product_available: null,
      cam_product_sale: null,
      product_type: null
    },
    {
      id: "62aefe9ad8b80d5234af625a",
      image: "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      brand: "xioami",
      review: 3,
      title: "Xoggle aute et pariatur adipisicing nostrud et excepteur",
      offer_price: "$18.73",
      price: "$27.27",
      campaingn_product: false,
      cam_product_available: null,
      cam_product_sale: null,
      product_type: null
    },
    {
      id: "62aefe9ad8b80d5234af625a",
      image: "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      brand: "xioami",
      review: 3,
      title: "Xoggle aute et pariatur adipisicing nostrud et excepteur",
      offer_price: "$18.73",
      price: "$27.27",
      campaingn_product: false,
      cam_product_available: null,
      cam_product_sale: null,
      product_type: null
    }
  ]
  const router = useRouter()
  const {shopId} = router.query
  const getShopById = async () => {
    try{
        const data = await axios.get(GET_SHOP_BY_ID+"/"+shopId,{withCredentials:true}).then(
            (response)=>{
                setShop(response.data.shop)
                setOldShop(response.data.shop)
                setProducts(response.data.shop.products)
                for(let i = 0;i<response.data.shop.products.length;i++)
                {
                  if(interval.max<parseInt(response.data.shop.products[i].price)){
                    setInterval({min:0,max:parseInt(response.data.shop.products[i].price)})
                      
                  }
                  setVolume({min:0,max:interval?.max})
                }
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
  const getAverage = (products) => {
      
    let reviews = []
    for(let i = 0;i<products.length;i++)
    {
       for(let j=0;j<products[i].reviews.length;j++)
       {
          reviews.push(products[i].reviews[j])
       }
    }
   
    let A = 0
    reviews.forEach(({rating})=>A+=rating)
    A /= reviews.length
    return (A.toFixed(1))
  
  return 0     
}
const getProductAverage = (reviews) => {

  if(reviews?.length > 0){
    let A = 0
    reviews.forEach(({rating})=>A+=rating)
    A /= reviews.length
    return (A.toFixed(1))
  }
  return 0     
}

  const [volume, setVolume] = useState({ min: 0, max: interval.max });
  const [currentCategory,setCurrentCategory] = useState("")

  const [storage, setStorage] = useState(null);
  const filterStorage = (value) => {
    setStorage(value);
  };
  const [filterToggle, setToggle] = useState(false);

  const ChangeProduct = (value) => {
    setVolume(value)
    let newData  = shop.products.filter(p=>parseInt(p.price)>=value.min)
    newData  = newData.filter(p=>parseInt(p.price)<=value.max)
    if(currentCategory !== "Tout")
    {
        newData = newData.filter(p=>p.category === currentCategory)
    

    }
    setProducts(newData)
  }
 useEffect(
  ()=>{
  getShopById()

  },[interval,shopId]
 )

  return (
    <>
  
        <div className="products-page-wrapper w-full bg-gray-100 px-[20px] lg:px-[60px] pt-[50px] mt-[95px] lg:mt-[110px]">
          <div className="container-x mx-auto ">
            <div
              data-aos="fade-right"
              className="saller-info mx-auto w-full mb-[40px] sm:h-[328px]  sm:flex justify-between items-center px-11 overflow-hidden relative py-10 sm:py-0"
              style={{
                background: `url(/cover/saller-cover.png) no-repeat`,
                backgroundSize: "cover",
              }}
            >
              <div className="store-status w-[230px] h-[60px] bg-qyellow flex justify-end items-center rounded-full absolute top-[30px] -left-[30px]">
                <span className="text-[26px] font-600 mr-[30px]">
                  Store Open 
                </span>
              </div>

              <div className="saller-text-details sm:mt-[55px] mt-[100px]">
                <ul>

                  <li className="text-black flex space-x-5 items-center leading-9 text-base font-normal">
                    <span>
                      <svg
                        width="15"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.5085 14.0001C10.5529 13.9553 9.6013 13.6377 8.6926 13.1988C6.27351 12.0295 4.30056 10.3639 2.60467 8.39981C1.65664 7.30216 0.854189 6.11977 0.351704 4.78105C0.0963526 4.09939 -0.084448 3.40133 0.0405862 2.66719C0.106332 2.27908 0.266587 1.9347 0.568313 1.65372C1.00388 1.24812 1.43592 0.838683 1.87618 0.437996C2.50077 -0.129964 3.37366 -0.152376 4.00587 0.410664C4.71205 1.03985 5.40649 1.68215 6.07862 2.34304C6.80124 3.05367 6.54589 4.09666 5.5826 4.47384C4.70383 4.81768 4.37452 5.42773 4.72966 6.25151C5.4106 7.8324 6.63746 8.94153 8.32865 9.57454C9.12171 9.87137 9.85842 9.52698 10.1918 8.7923C10.6145 7.86082 11.7292 7.63069 12.5129 8.33093C13.2114 8.9552 13.8936 9.59477 14.5669 10.2425C15.1533 10.8067 15.1416 11.6299 14.5475 12.2077C14.1014 12.6417 13.64 13.0627 13.1792 13.483C12.7383 13.8864 12.1842 13.999 11.5085 14.0001Z"
                          fill="black"
                        />
                      </svg>
                    </span>
                    <span>{shop.numbers? shop.numbers[0]:0}</span>
                  </li>
                  <li className="text-black flex space-x-5 items-center leading-9 text-base font-normal">
                    <span>
                    <TbTruckDelivery/> 

                    </span>
                    <span>Disponibilité: {shop.disponibilite}</span>
                  </li>
                  <li className="text-black flex space-x-5 items-center leading-9 text-base font-normal">
                    <span>
                      <svg
                        width="14"
                        height="19"
                        viewBox="0 0 14 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.97116 2.68819e-05C2.96055 0.0118815 -0.248362 3.57049 0.0150623 7.72998C0.107867 9.19477 0.60259 10.5136 1.45069 11.6909C3.13831 14.0337 4.82379 16.3787 6.5107 18.7214C6.77412 19.0875 7.21745 19.0934 7.47659 18.734C9.17135 16.3816 10.8761 14.0359 12.5566 11.6724C15.2879 7.83075 14.0101 2.65546 9.84454 0.632026C9.03428 0.239342 7.93562 -0.00293677 6.97116 2.68819e-05ZM6.99257 9.29479C5.81395 9.29035 4.85877 8.29975 4.85734 7.08094C4.85592 5.8614 5.80752 4.86931 6.98686 4.86116C8.17762 4.85301 9.14708 5.85769 9.13994 7.09428C9.13351 8.3116 8.16977 9.29924 6.99257 9.29479Z"
                          fill="black"
                        />
                      </svg>
                    </span>
                    <span>{shop.city}, {shop.quarter}</span>

                  </li>
                </ul>
              </div>

              <div className="saller-name lg:block hidden">
                <h1 className="text-[60px] font-bold">{shop.name}</h1>
                <div className="flex justify-center">
                <div className="flex space-x-2 items-center mb-[20px]">
                                            <div className='flex gap-1'>
                           {
                                [1,2,3,4,5].map(
                                (item)=>{
                                    return <FaStar  key = {item} className={`cursor-pointer ${getAverage(products) >= item? "text-yellow-400":"text-gray-400"}`}/>
                                 }
                               )
                           } 
                   </div>
                                              <span className="text-[15px] font-bold text-qblack ">
                                                {getAverage(products)}
                                              </span>
                                            </div>
                </div>
              </div>

              <div className="saller-logo mt-5 sm:mt-5">
                <div className="flex sm:justify-center justify-start">
                  <div className="w-[170px] h-[170px] flex justify-center items-center rounded-full bg-white mb-1">
                    <img
                      src={`${shop.cover}`}
                      alt="logo"
                      className="object-contain rounded-full"

                    />
                  </div>
                </div>
                <div className="flex sm:justify-center justify-start">
                  <span className="text-[30px] font-medium text-center">
                    {shop.secteur}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full lg:flex lg:space-x-[30px]">
              <div className="lg:w-[270px]">
                <ProductsFilter
                  filterToggle={filterToggle}
                  filterToggleHandler={() => setToggle(!filterToggle)}
                  filters={filters}
                  olData={oldshop}
                  onCurrentCategory = {setCurrentCategory}
                  onProducts={setProducts}
                  interval = {interval}
                  onCheckboxHandler={setToggle}
                  categories = {shop.features}
                  checkboxHandler={checkboxHandler}
                  volume={volume}
                  volumeHandler={(value) => ChangeProduct(value)}
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
                      <span className="text-qgray"> Resulta</span> {products.length}
                      
                    </p>
                  </div>
                  {/* <div className="flex space-x-3 items-center">
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
                  </div> */}
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
                <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1  xl:gap-[30px] gap-5 mb-[40px]">
                  
                    {products?.map( (datas ) => (
                      <div data-aos="fade-up" key={datas.id}>
                        <ProductCardStyleOne rating = {getProductAverage(datas.reviews)} datas={datas} />
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
