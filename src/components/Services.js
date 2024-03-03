import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"
function Services(){
    const categories = [
        {
            name:"Conception des sites web et applications",
            logo:"/services/service-2.png"
        },
        {
            name:"Community manager",
            logo:"/services/service-1.png"
        },
        {
            name:"Rédaction, Correction et traduction",
            logo:"/services/service-3.png"
        },
        {
            name:"Consultant en marketing numérique",
            logo:"/services/service-4.png"
        },
        {
            name:"Concepteur graphique",
            logo:"/services/service-5.png"
        },

        {
            name:"Analyse de données",
            logo:"/services/service-6.png"
        },
        {
            name:"Formations en ligne",
            logo:"/services/service-7.png"
        },
        {
            name:"Architecture",
            logo:"/services/service-8.png"
        },
        {
            name:"Analyste des médias sociaux",
            logo:"/services/service-9.png"
        },
        {
            name:"Montage vidéo",
            logo:"/services/service-10.png"
        },
        
    ]
    const router = useRouter()
    return <div className="mx-5 lg:mx-10 xl:mx-20 my-16">
        <h2 className="text-2xl lg:text-3xl xl:text-4xl text-center mb-10 text-[#404145] font-bold">
            Services Les&nbsp;Plus <span className="text-appPrimaryColor">recommendés</span>
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
            {
                categories.map(
                    ({name,logo})=>{
                        return (
                            <li onClick = {()=>router.push(`/search?category=${name}`)} key = {name} className=" relative flex flex-col justify-center items-center cursor-pointer hover:shadow-2xl hover:border-purple-200 border-2 border-transparent p-5 transition-all duration-500 ">
                                <Image src = {logo}  height={50} width={50}  /> 
                                <span className="text-center">{name}</span>
                            </li>    
                        )
                    }
                )
            }
        </ul>
    </div>       
}

export default Services;