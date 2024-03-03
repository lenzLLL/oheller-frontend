import { useRouter } from "next/router";
import React,{useEffect, useState,usesEffect} from "react"
import Image from "next/image";

function HeroBanner(){
    const router = useRouter()
    const [images,setImages] = useState(1)
    const [searchData,setSearchData] = useState("")
    useEffect(
        ()=>{
            const interval = setInterval(
                ()=>{
            <Image alt ="hero" src ="/bg-hero1.webp" fill className= {`${images === 1?"opacity-100":"opacity-0"} transition-all duration-1000`}/>
                    setImages(images>=4?1:images+1)
                },10000
            )
            return ()=>clearInterval(interval)
        },[images]
    )
    return <div className = {"h-[600px] relative p-0"}>
        <div className="absolute top-0 right-0 w-[100vw] h-full transition-opacity 2-0 z-0">
            <Image alt ="hero1" src ="/banner/banner97.jpg" fill className= {`${images === 3?"opacity-200":"opacity-0"} transition-all duration-1000`}/>
            <Image alt ="hero2" src ="/banner/banner96.jpg" fill className= {`${images === 2?"opacity-200":"opacity-0"} transition-all duration-1000`}/>
            <Image alt ="hero3" src ="/banner/banner2.jpg" fill className= {`${images === 4?"opacity-200":"opacity-0"} transition-all duration-1000`}/>
            <Image alt ="hero4" src ="/banner/banner95.jpg" fill className= {`${images === 1?"opacity-200":"opacity-0"} transition-all duration-1000`}/>
        </div>
        <div className="absolute bg-black opacity-[0.7] top-0 right-0 w-[100vw] h-full transition-opacity 2-0 z-1">

        </div>
        <div className=" pt-5 lg:pt-0 flex items-start  flex-col justify-center h-full gap-5 ml-5 lg:ml-10 xl:ml-20 relative z-1 w-[90vw] lg:w-[70vw] xl:w-[50vw]">
            <div  className="text-white leading-[50px] lg:leading-[75px] text-4xl lg:text-5xl">
                Tous les meilleurs &nbsp; <i>services</i><br/>à votre disposition
            </div>
            <div className="flex align-middle">
                <div className="relative">
                    <input value = {searchData} onChange={(e)=>setSearchData(e.target.value)} type ="text" className="h-14 w-[60vw] xl:w-[450px] outline-none px-5 rounded-md rounded-r-none" placeholder="Essayez: dévéloppeur web"/>
                </div>
                <button onClick = {()=>{router.push(`/search-service?q=${searchData}`) }} className="rounded-md rounded-l-none bg-appPrimaryColor text-white px-3 lg:px-8 xl:px-12 sm:text-sm xl:text-lg">
                  Rechercher
                </button>
            </div>
            <div className="text-white item-center flex align-middle gap-4 mt-2">
                <h2 className="mt-0.5 font-bold tracking-widest">Populaires:{" "}</h2>
                <ul className="text-white items-center gap-4 flex flex-wrap">
                   
                    <li className="text-sm py-1 px-3 border rounded-full border-[white] hover:bg-white hover:text-black cursor-pointer transition-all duration-300 cursor-pointer">
                        Marketting digital
                    </li>
                    <li className=" text-sm py-1 px-1 border rounded-full border-[white] hover:bg-white hover:text-black cursor-pointer transition-all duration-300 cursor-pointer">
                        Géni civil
                    </li>
                    <li className="text-sm py-1 px-3 border rounded-full border-[white] hover:bg-white hover:text-black cursor-pointer transition-all duration-300 cursor-pointer">
                        Infographie
                    </li>
                    <li className="text-sm py-1 px-3 border rounded-full border-[white] hover:bg-white hover:text-black cursor-pointer transition-all duration-300 cursor-pointer">
                        Photographie
                    </li>

                </ul>
            </div>
        </div>
    </div>        
}

export default HeroBanner;