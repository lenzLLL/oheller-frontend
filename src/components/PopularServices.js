import React from "react"
import Image from "next/image";
import { useRouter } from "next/router";
function PopularServices(){
    const popularServices = [

        {
            name:"Infographie",
            label:"montez votre branding",
            image:"https://images.pexels.com/photos/7948039/pexels-photo-7948039.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            name:"Génie civil",
            label:"Obtenez votre plan maintenant",
            image:"https://images.pexels.com/photos/342008/pexels-photo-342008.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            name:"Programmation web",
            label:"augmentez vorte lisibilité avec un site web",
            image:"https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            name:"Community manager",
            label:"une grande communauté vous attend",
            image:"https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tbXVuaXR5JTIwbWFuYWdlcnxlbnwwfHwwfHx8MA%3D%3D"
        },
        {
            name:"Traduction",
            label:"faites traduire vos textes",
            image:"https://images.unsplash.com/photo-1611259381122-ecd04e83f14b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhbnNsYXRpb258ZW58MHx8MHx8fDA%3D"
        },
        {
            name:"Illustration",
            label:"Color your dream",
            image:"/service7.jpeg"
        },
        {
            name:"Translation",
            label:"Go global",
            image:"/service8.jpeg"
        }
    ]
    const router = useRouter()
    return <div className="mx-2 my-5 lg:mx-15 lg:my-11 xl:mx-20 xl:my-16">
        <h2 className="text-3xl  lg:text-4xl p-10 mb-10 text-[#404145] text-center font-bold">
            Secteurs les plus <span className="text-appPrimaryColor">populaires</span>
        </h2> 
        <ul className="flex flex-wrap justify-center gap-9  lg:gap-16">
            {
                popularServices.map(
                    ({name,label,image})=>{
                        return (
                            <li onClick={()=>router.push(`/search?q-`+name.toLowerCase())} key = {name} className="relative cursor-pointer">
                                <div style = {{textShadow:"1px 1px 5px black"}} className="absolute z-10  text-white left-5 top-4">
                                  <span>{label}</span>
                                  <h2 className="font-semibold text-md lg:text-xl xl:text-2xl ">{name}</h2>
                                </div>
                                <div className="relative shadow-2xl h-[150px] w-[150px] lg:h-[200px] lg:w-[200px]">
                                    <Image  src = {image}  fill alt = "service"/>
                                    <div className=" absolute top-0 left-0 right-0 opacity-25 bottom-0 bg-black z-2">

                                    </div>
                                </div>    
                            </li>
                        )
                    }
                )
            }
        </ul>       
    </div>        
}

export default PopularServices;