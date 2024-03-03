import React,{useEffect,useState} from "react"
import ProductCardStyleOne from "./ProductCardStyleOne";
import DataIteration from "./DataIteration";
import Star from "./Star";
import Image from "next/image";

export default function SallerInfo({ products,seller,shop }) {
  const [review,setReview] = useState(0)
  const [average,setAverage] = useState(0)
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
  useEffect(
    ()=>{
    
      const getReviews = () => {
        let last = 0
        for(let i = 0;i<products.length;i++)
        {  
              last += products[i].reviews.length
            setReview(last)
        } 
        setAverage(getAverage(shop.products))
      }    
      getReviews()
    },[review]
  )
  return (
    <div className="saller-info-wrapper w-full">
      <div className="saller-info sm:flex justify-between items-center pb-[30px] border-b border-[#E8E8E8]">
        <div className="sm:flex sm:space-x-5 items-center sm:w-1/4">
          <div className="saller w-[73px] h-[73px] rounded-full overflow-hidden">
            
          {
                                        seller?.url_image ? (<Image src = {seller.url_image} width={40} height={40} className='rounded-full'/>):(<div  className='bg-purple-500 h-full w-full p-0 flex items-center justify-center rounded-full relative'>
                                            <span   className='m-0 p-0 w-40 h-full flex items-center justify-center text-xl text-white'>
                                                {
                                                    seller?.email[0].toUpperCase()
                                                }
                                            </span>
                                        </div>)
                                    }
          </div>
          
          <div>
            <h6 className="text-[18px] font-medium leading-[30px]">
              {seller.fullname}
            </h6>
            <p className="text-[15px] font-normal text-qgray leading-[30px]">
              {seller.quarter}, {seller.city}
            </p>
            <div className="flex items-center mt-1">
              {seller.email}
            </div>
          </div>
        </div>
        <div className="flex-1 w-full sm:flex sm:space-x-5 justify-between sm:ml-[60px] mt-5 sm:mt-0">
          <div className="w-full mb-5 sm:mb-0">
            <ul>
              <li className="text-qgray leading-[30px]">
                <span className="text-[15px] font-normal text-qblack">
                  Produits: 
                </span>
                {products.length}
              </li>
              <li className="text-qgray leading-[30px] flex gap-2">
                <span className="text-[15px] font-normal text-qblack">
                  Catégories :
                </span>
                
                  <ul className="flex gap-0.5 items-center">
                     {
                      shop.features.map(
                        (s)=>{
                          return <li>{s}, </li>
                        }
                      )
                     }
                  </ul>
                
              </li>
              <li className="text-qgray leading-[30px]">
                <span className="text-[15px] font-normal text-qblack">
                  Commandes
                </span>
                : {shop?.orders?.length}
              </li>
            </ul>
          </div>
          <div className="w-full ">
            <ul>
              <li className="text-qgray leading-[30px]">
                <span className="text-[15px] font-normal text-qblack">
                  Avis
                </span>
                : {review}
              </li>
              <li className="text-qgray leading-[30px]">
                <span className="text-[15px] font-normal text-qblack">
                  Localisation
                </span>
                : {shop.quarter}, {shop.city}
              </li>
              <li className="text-qgray leading-[30px]">
                <span className="text-[15px] font-normal text-qblack">
                  Note
                </span>
                : {average}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="saller-product w-full mt-[30px]">
        <h1 className="text-[18px] font-medium mb-5">Produits de la boutique</h1>
        <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1  xl:gap-[30px] gap-5 mb-[40px]">
                  
                    {products?.map( (datas ) => (
                      <div data-aos="fade-up" key={datas.id}>
                        <ProductCardStyleOne datas={datas} />
                      </div>
                    ))}
               
                </div>
      </div>
    </div>
  );
}
