import Link from "next/link"
import Image from "next/image"
import { IoMailOutline } from "react-icons/io5";
import { MdOutlinePhoneEnabled } from "react-icons/md";
import {
    FiGithub,
    FiInstagram,
    FiYoutube,
    FiLinkedin,
    FiTwitter
} from "react-icons/fi"
const categories = [
    {
        name:"Graphic Design",
        logo:"/service-1.svg"
    },
    {
        name:"Digital Marketing",
        logo:"/service-2.svg"
    },
    {
        name:"Rédaction, Correction et translation",
        logo:"/service-3.svg"
    },
    {
        name:"Vidéo & Animation",
        logo:"/service-4.svg"
    },
    {
        name:"Musci & Audio",
        logo:"/service-5.svg"
    },
    {
        name:"Programmation & Tech",
        logo:"/service-6.svg"
    },
    {
        name:"Business",
        logo:"/service-7.svg"
    },
    {
        name:"Architecture",
        logo:"/service-8.svg"
    },
    {
        name:"Analyse de données",
        logo:"/service-9.svg"
    },
    {
        name:"Infographie",
        logo:"/service-10.svg"
    }
]
export default function Footer() {
  const socialLink = [
    {
        name:"Github",
        icon:<FiGithub/>,
        link:"/"
    },
    {
        name:"Youtube",
        icon:<FiYoutube/>,
        link:"/"
    },
    {
        name:"FiLinkedin",
        icon:<FiLinkedin/>,
        link:"/"
    }
    ,
    {
        name:"Instagramme",
        icon:<FiInstagram/>,
        link:"/"
    },
    {
        name:"Twitter",
        icon:<FiTwitter/>,
        link:"/"
    }
  ]
  const data = [
    
    {
        headerName:"Raccourcis",
        links:[
            {
                name:"Services",
                link:"/services",
                icon:null

            },
            {
                name:"Experts",
                link:"/experts",
                icon:null

            },
            {
                name:"Boutiques",
                link:"/shops",
                icon:null

            }
            ,
            {
                name:"Politique de confidentialité",
                link:"/policy",
                icon:null

            },
            {
                name:"Conditions d'utilisation",
                link:"/terms",
                icon:null
            }
        ]
    },
    {
        headerName:"Catégories",
        links:[
            ...categories.map((cat)=>({iocn:null,name:cat.name,link:cat.logo}))
        ]
    },
    {
        headerName:"Contacts",
        links:[
    
            {
                name:"691930712",
                Icon:MdOutlinePhoneEnabled,
                link:"#"
            },
            {
                name:"671434007",
                link:"#",
                Icon:MdOutlinePhoneEnabled
            }
            ,
            {
                name:"oheller@gmail.com",
                link:"#",
                Icon:IoMailOutline
            },
        ]
    }
  ]
  return (
    <div className="w-full mx-auto px-5 lg:px-15 xl:px-32 py-16 h-auto border-t border-gray-200 bg-gray-100">
        <ul className="flex gap-5 flex-wrap justify-between">
            {
                data.map(
                    ({headerName,links})=>{
                        return (
                            <li className="flex flex-col gap-2">
                                <span className="font-bold uppercase">{headerName}</span>
                                <ul>
                                    {
                                        links.map(
                                            ({name,link,Icon})=>{
                                                return <li key = {name} className="flex items-center gap-1">
                                                       {
                                                        headerName.toLowerCase() === "Contacts".toLocaleLowerCase() && <Icon/>
                                                    } 
                                                    <Link href ={link}>
                                                        {name}
                                                    </Link>
                                                 
                                                </li> 
                                            }
                                        )
                                    }
                                </ul>  
                            </li>
                        )
                    }
                )
            }
        </ul>
        <div className="flex items-center xl:mt-10 justify-between mt-5">
            <div className="cursor-pointer">
            <Image className="" src ="/logo/logo-2.png" height={200} width={200}/>
            </div>
            <ul className="flex justify-center gap-5">
                {
                    socialLink.map(
                        ({name,link,icon})=>{
                            return (
                                <li className="text-3xl cursor-pointer hover:text-[#56f356]" key = {link}>
                                    {icon}
                                </li>
                            )
                        }
                    )
                }
            </ul>     
        </div>
    </div>
  )
}
