import React, { useState,useEffect } from "react";
import axios from "axios"
import { useRouter } from "next/router";
import Star from "./Star";
import { useStateProvider } from "@/context/StateContext";
import Selectbox from "./Selectbox";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import Swal from 'sweetalert2'
import { FaStar } from "react-icons/fa";
import { ADD_LIKED, IS_LIKED } from "@/utils/Constant";
export default function ProductView({ className, reportHandler,data,average,length,productIsLiked,setProductIsLiked }) {
  const [images,setImages] = useState([])
  const router = useRouter()
  const {productId} = router.query
  const [{showLoginModal,showSignupModal,userInfos,status},dispatch] = useStateProvider()
  const IsLiked = async () => {
    try{
        const data = await axios.get(IS_LIKED+productId,{withCredentials:true}).then(
            (response)=>{
                if(response.status === 200)
                {
                    setProductIsLiked(true)
                }
                else{
                    setProductIsLiked(false)
                }
                       
                
            }
        )
          }
    catch(err)
    {
        
    }
  }
  const productsImg = [
    {
      id: 1,
      src: data.image,
      color: "#FFBC63",
    },
    {
      id: 2,
      src: data.image,
      color: "#649EFF",
    },
    {
      id: 3,
      src: data.image,
      color: "#FFFFFF",
    },
    {
      id: 4,
      src: data.image,
      color: "#FF7173",
    },
    {
      id: 6,
      src: data.image,
      color: "",
    },
  ];

  const addToCart = () => {
    if(!userInfos)
    {
      Swal.fire({
        title: 'Error!',
        text: 'veillez vous connecter pour faire des commandes',
        icon: 'error',
        confirmButtonText: 'Ok',
        buttonsStyling:"danger"
      }) 
      return
    }
    if(data.book)
    {
      router.push("/product/payment")
      return
    }
    if(localStorage.getItem("cart"))
    {
        let cart = JSON.parse(localStorage.getItem("cart"))
        let isFind = false
        for(let i = 0;i<cart.length;i++)
        {
            if(cart[i].id === data.id)
            {
              cart[i] =  {
                id:data.id,
                img:data.images[0],
                title:data.title,
                size:currentSize,
                price:data.price,
                quantite:quantity,
                total:quantity*data.price,
                shopId:data.shopId
              }
              isFind = true
            }  
          
        }
        if(!isFind)
        {
          cart.push( {
            id:data.id,
            img:data.images[0],
            title:data.title,
            size:currentSize,
            price:data.price,
            quantite:quantity,
            total:quantity*data.price,
            shopId:data.shopId
          })
        }
        localStorage.setItem("cart",JSON.stringify(cart))
        
    }
    else{
        let cart = []
        cart.push(
          {
            id:data.id,
            img:data.images[0],
            title:data.title,
            size:currentSize,
            price:data.price,
            quantite:quantity,
            total:quantity*data.price,
            shopId:data.shopId

          }
        )
        localStorage.setItem("cart",JSON.stringify(cart))
        
    }
    Swal.fire(
      'Produit ajouté',
      'le produit a été ajouté au panier',
      'success'
    )
  }

  const addLiked = async () => {
    if(!userInfos)
    {
      Swal.fire({
        title: 'Error!',
        text: 'veillez vous connecter pour ajouter se produit parmis les favoris!',
        icon: 'error',
        confirmButtonText: 'Ok',
        buttonsStyling:"danger"
      }) 
      return
    }  
    try{
            
            const data = await axios.get(ADD_LIKED+productId,{withCredentials:true}).then(
            (response)=>{
              let msg = response.status === 200? "Produit retiré de votre liste de favoris":"Produit ajouté dans votre liste de favoris"
              Swal.fire(
                msg,
                'favoris',
                'success'
              )
              window.location.reload()
               
            }
        )    
    }
    catch(err){
      Swal.fire({
        title: 'Error!',
        text: err,
        icon: 'error',
        confirmButtonText: 'Ok',
        buttonsStyling:"danger"
      })  
    }
  }
  const [src, setSrc] = useState(productsImg[0].src);
  const changeImgHandler = (current) => {
    setSrc(current);
  };
  const [quantity, setQuantity] = useState(1);
  const increment = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const [size,setSize] = useState([])
  const [currentSize,setCurrentSize] = useState("")
  const [currentImage,setCurrentImage] = useState("")
  useEffect(
    ()=>{
        if(data.images  && data.images.length > 0)
        {
            setImages(data.images)
            setCurrentImage(data.images[0])
            if(data.size[0] === "sm,md,lg,xl...")
            {
              setSize(["SM","MD","LG",'XL',"2XL"])
            }
        }
        IsLiked()
    },[data,currentSize,productId,productIsLiked]
  )
  if(!data.images)
  {
    return
  }
  return (
    <div
      className={`product-view w-full lg:flex justify-between ${
        className || ""
      }`}
    >
      <div data-aos="fade-right" className="lg:w-1/2 xl:mr-[70px] lg:mr-[50px]">
        <div className="w-full">
          <div className="w-full h-[600px] mb-3 border border-qgray-border flex justify-center items-center overflow-hidden relative">
            <img
              src={currentImage}
              alt=""
              className="object-cover h-full w-full"
            />

          </div>
          <div className="flex gap-2 flex-wrap">
            {images &&
              images.length > 0 &&
                    images.map((img) => (
                <div
                  onClick={() => setCurrentImage(img)}
                  key={img}
                  className="w-[110px] h-[110px] p-[5px] border border-qgray-border cursor-pointer"
                >
                  <img
                    src={`${img}`}
                    alt=""
                    className={`w-full h-full object-contain ${
                      img !== currentImage ? "opacity-50" : ""
                    } `}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="product-details w-full mt-10 lg:mt-0">
          <span
            data-aos="fade-up"
            className="text-qgray text-xs font-normal uppercase tracking-wider mb-2 inline-block"
          >
            {data.category}
          </span>
          <p
            data-aos="fade-up"
            className="text-xl font-medium text-qblack mb-4"
          >
            {data.title}
          </p>

          <div
            data-aos="fade-up"
            className="flex space-x-[10px] items-center mb-6"
          >
                          <div className='flex gap-1'>
                           {
                                [1,2,3,4,5].map(
                                (item)=>{
                                    return <FaStar  key = {item} className={`cursor-pointer ${average >= item? "text-yellow-400":"text-gray-400"}`}/>
                                 }
                               )
                           } 
                   </div>
            <span className="text-[13px] font-normal text-qblack">
              {length} vues
            </span>
          </div>

          <div data-aos="fade-up" className="flex space-x-2 items-center mb-7">
            <span className="text-2xl font-500 text-qred">{data.price} XAF</span>
          </div>

          <p
            data-aos="fade-up"
            className="text-qgray text-sm text-normal mb-[30px] leading-7"
          >
           {data.description}
          </p>

 

          <div data-aos="fade-up" className="product-size mb-[30px]">
            <span className="text-sm font-normal uppercase text-qgray mb-[14px] inline-block">
              Taille
            </span>
            <div className="w-full">
              <div className=" border border-qgray-border h-[50px] flex justify-between items-center px-6 cursor-pointer">
                <Selectbox
                  onSize={setCurrentSize}
                  className="w-full"
                  datas={[...size]}
                >
                  {({ item }) => (
                    <>
                      <div>
                        <span className="text-[13px] text-qblack">{item}</span>
                      </div>
                      <div className="flex space-x-10 items-center">
                        <span className="text-[13px] text-qblack">
                          {data.size? data.size:"Aucune taille disponible"}
                        </span>
                        <span>
                          <svg
                            width="11"
                            height="7"
                            viewBox="0 0 11 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z"
                              fill="#222222"
                            />
                          </svg>
                        </span>
                      </div>
                    </>
                  )}
                </Selectbox>
              </div>
            </div>
          </div>

          <div
            data-aos="fade-up"
            className="quantity-card-wrapper w-full flex items-center h-[50px] space-x-[10px] mb-[30px]"
          >
            <div className="w-[120px] h-full px-[26px] flex items-center border border-qgray-border">
              <div className="flex justify-between items-center w-full">
                <button
                  onClick={decrement}
                  type="button"
                  className="text-base text-qgray"
                >
                  -
                </button>
                <span className="text-qblack">{quantity}</span>
                <button
                  onClick={increment}
                  type="button"
                  className="text-base text-qgray"
                >
                  +
                </button>
              </div>
            </div>
            <div onClick={()=>addLiked()} className="w-[60px] h-full flex justify-center items-center border border-qgray-border">
              <button type="button" className="outline-none">
                <span >
                  {productIsLiked? <FaHeart className="text-red-500"  size={25}/>:<CiHeart className="text-gray-500" size = {25}/>}
                </span>
              </button>
            </div>
            <button type="button" className={'yellow-btn'} onClick = {()=>addToCart()} >
            <div className="flex items-center  space-x-3">
              <span>
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current"
                >
                  <path d="M12.5664 4.14176C12.4665 3.87701 12.2378 3.85413 11.1135 3.85413H10.1792V3.43576C10.1792 2.78532 10.089 2.33099 9.86993 1.86359C9.47367 1.01704 8.81003 0.425438 7.94986 0.150881C7.53106 0.0201398 6.90607 -0.0354253 6.52592 0.0234083C5.47246 0.193372 4.57364 0.876496 4.11617 1.85052C3.89389 2.32772 3.80368 2.78532 3.80368 3.43576V3.8574H2.8662C1.74187 3.8574 1.51313 3.88028 1.41326 4.15483C1.36172 4.32807 0.878481 8.05093 0.6723 9.65578C0.491891 11.0547 0.324369 12.3752 0.201948 13.3688C-0.0106763 15.0815 -0.00423318 15.1077 0.00220999 15.1371V15.1404C0.0312043 15.2515 0.317925 15.5424 0.404908 15.6274L0.781834 16H13.1785L13.4588 15.7483C13.5844 15.6339 14 15.245 14 15.0521C14 14.9214 12.5922 4.21694 12.5664 4.14176ZM12.982 14.8037C12.9788 14.8266 12.953 14.8952 12.9079 14.9443L12.8435 15.0162H1.13943L0.971907 14.8331L1.63233 9.82901C1.86429 8.04766 2.07047 6.4951 2.19289 5.56684C2.24766 5.16154 2.27343 4.95563 2.28631 4.8543C2.72123 4.85103 4.62196 4.84776 6.98661 4.84776H11.6901L11.6966 4.88372C11.7481 5.1452 12.9594 14.5128 12.982 14.8037ZM4.77338 3.8574V3.48479C4.77338 3.23311 4.80559 2.88664 4.84103 2.72649C5.03111 1.90935 5.67864 1.24584 6.48726 1.03339C6.82553 0.948403 7.37964 0.97782 7.71791 1.10202H7.72113C8.0755 1.22296 8.36545 1.41907 8.63284 1.71978C9.06453 2.19698 9.2095 2.62516 9.2095 3.41615V3.8574H4.77338Z" />
                </svg>
              </span>
              <span >{data.book?"Acheter":"AJouter au panier"}</span>
            </div>
          </button>
          </div>

          <div data-aos="fade-up" className="mb-[20px]">
            <p className="text-[13px] text-qgray leading-7">
              <span className="text-qblack">Catégorie :</span> {data.category}
            </p>
            <p className="text-[13px] text-qgray leading-7">
              <span className="text-qblack">Commandes :</span> 23
            </p>
            <p className="text-[13px] text-qgray leading-7">
              <span className="text-qblack">Likes:</span> 12
            </p>
          </div>

          <div
            data-aos="fade-up"
            className="flex space-x-2 items-center mb-[20px]"
          >
           

          </div>

        </div>
      </div>
    </div>
  );
}
