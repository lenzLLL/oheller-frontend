import React, {useEffect, useRef, useState } from "react";
import BreadcrumbCom from "../../components/product/BreadcrumbCom";
import ProductCardStyleOne from "../../components/product/ProductCardStyleOne";
import DataIteration from "../../components/product/DataIteration";
import InputCom from "../../components/product/InputCom";
import ProductView from "../../components/product/ProductView";
import Reviews from "../../components/product/Reviews";
import SallerInfo from "../../components/product/SallerInfo";
import { GET_PRODUCT, GET_SHOP_BY_ID, IS_LIKED } from "@/utils/Constant";
import axios from "axios";
import { useRouter } from "next/router";


export default function SingleProductPage() {
  const [tab, setTab] = useState("des");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [statutLiked,setStatutLiked] = useState(false)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [products,setProducts] = useState([])
  const [message, setMessage] = useState("");
  const [seller,setSeller] = useState({})
  const [shop,setShop] = useState([])
  const router = useRouter()
  const {productId} = router.query
  const [reviewLoading, setLoading] = useState(false);
  const [product,setProduct] = useState({})
  const reviewElement = useRef(null);
  const [report, setReport] = useState(false);
  const [commnets, setComments] = useState([
    {
      id: Math.random(),
      author: "Rafiqul Islam",
      comments: `Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the redi 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries but also the on leap into
                electronic typesetting, remaining`,
      review: 4,
      replys: [
        {
          id: Math.random(),
          name: "Willium Kingson",
          comments: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
        },
      ],
    },
    {
      id: Math.random(),
      author: "Abdullah Mamun",
      comments: `Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the redi 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries but also the on leap into
                electronic typesetting, remaining`,
      review: 5,
    },
  ]);
  const reviewAction = () => {
    setLoading(true);
    setTimeout(() => {
      if ((name, message, rating)) {
        setComments((prev) => [
          {
            id: Math.random(),
            author: name,
            comments: message,
            review: rating,
          },
          ...prev,
        ]);
        setLoading(false);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setRating(0);
        setHover(0);
        window.scrollTo({
          top: -reviewElement.current.getBoundingClientRect().top,
          left: 0,
          behavior: "smooth",
        });
      }
      setLoading(false);
      return false;
    }, 2000);
  };
  const getAverage = (reviews) => {

    if(reviews?.length > 0){
      let A = 0
      reviews.forEach(({rating})=>A+=rating)
      A /= reviews.length
      return (A.toFixed(1))
    }
    return 0     
}
  const getProductById = async () => {
    try{
       
        const d = await axios.get(GET_PRODUCT+productId,{withCredentials:true})
        setProduct(d.data.product)
        
      
        
      
    }
    catch(error)
    {
     
    } 
}

const getShopById = async () => {
  try{
    
      const data = await axios.get(GET_SHOP_BY_ID+"/"+JSON.parse(localStorage.getItem("currentShop")),{withCredentials:true}).then(
          (response)=>{
              setShop(response.data.shop)
              setProducts(response.data.shop.products)
              setSeller(response.data.shop.createdBy)
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
      getProductById()
      getShopById()
    
  },[productId]
 )
  return (
    <>
   
        <div className="single-product-wrapper w-full mt-[100px] px-20">
          <div className="product-view-main-wrapper bg-white pt-[30px] w-full">
            <div className="breadcrumb-wrapper w-full ">
              <div className="container-x mx-auto">
                <BreadcrumbCom
                  paths={[
                    { name: "Accueil", path: "/" },
                    { name: "Produit", path: "" },
                  ]}
                />
              </div>
            </div>
            <div className="w-full bg-white pb-[60px]">
              <div className="container-x mx-auto">
                <ProductView setProductIsLiked={setStatutLiked} productIsLiked = {statutLiked} average={getAverage(product?.reviews)} length = {product?.reviews?.length} data = {product} reportHandler={() => setReport(!report)} />
              </div>
            </div>
          </div>

          <div
            className="product-des-wrapper w-full relative pb-[60px]"
            ref={reviewElement}
          >
            <div className="tab-buttons w-full mb-10 mt-5 sm:mt-0">
              <div className="container-x mx-auto">
                <ul className="flex space-x-12 ">
                  <li>
                    <span
                      onClick={() => setTab("des")}
                      className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${
                        tab === "des"
                          ? "border-qyellow text-qblack "
                          : "border-transparent text-qgray"
                      }`}
                    >
                      Description
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => setTab("review")}
                      className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${
                        tab === "review"
                          ? "border-qyellow text-qblack "
                          : "border-transparent text-qgray"
                      }`}
                    >
                        Notes
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => setTab("info")}
                      className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${
                        tab === "info"
                          ? "border-qyellow text-qblack "
                          : "border-transparent text-qgray"
                      }`}
                    >
                      Informations
                    </span>
                  </li>
                </ul>
              </div>
              <div className="w-full h-[1px] bg-[#E8E8E8] absolute left-0 sm:top-[50px] top-[36px] -z-10"></div>
            </div>
            <div className="tab-contents w-full min-h-[400px] ">
              <div className="container-x mx-auto">
                {tab === "des" && (
                  <div data-aos="fade-up" className="w-full tab-content-item">
                    <h6 className="text-[18px] font-medium text-qblack mb-2">
                      Introduction
                    </h6>
                    <p className="text-[15px] text-qgray text-normal mb-10">
                   {product.description}
                    </p>
                    <div>
                      <h6 className="text-[18px] text-medium mb-4">
                        Fonctionnalités :
                      </h6>
                      <ul className="list-disc ml-[15px]">
                        {
                          product.features?.map(
                            (feature)=>{
                              return (
                                <li className="font-normal text-qgray leading-9">
                                  {feature}
                        </li>
                              )
                            }
                          )
                        }
                       
                      </ul>
                    </div>
                  </div>
                )}
                {tab === "review" && (
                  <div data-aos="fade-up" className="w-full tab-content-item">
                    <h6 className="text-[18px] font-medium text-qblack mb-2">
                      Commentaires
                    </h6>
                    {/* review-comments */}
                    <div className="w-full">
                      <Reviews
                        reviewLoading={reviewLoading}
                        reviewAction={reviewAction}
                        shopId={shop.id}
                        comments={commnets.slice(0, 2)}
                        name={name}
                        nameHandler={(e) => setName(e.target.value)}
                        email={email}
                        emailHandler={(e) => setEmail(e.target.value)}
                        phone={phone}
                        phoneHandler={(e) => setPhone(e.target.value)}
                        message={message}
                        messageHandler={(e) => setMessage(e.target.value)}
                        rating={rating}
                        ratingHandler={setRating}
                        hoverRating={hover}
                        hoverHandler={setHover}
                        seller = {seller}
                      />
                      
                    </div>
                  </div>
                )}
                {tab === "info" && (
                  <div data-aos="fade-up" className="w-full tab-content-item">
                    <SallerInfo products={products} seller = {seller} shop = {shop} />
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
    

    </>
  );
}
