import { FiHome } from "react-icons/fi";
import {HiOutlineUsers} from "react-icons/hi"
import {BiSolidLogOut, BiUserCircle} from "react-icons/bi"
import {LiaBusinessTimeSolid} from "react-icons/lia"
import {CiShoppingTag} from "react-icons/ci"
import {FaChartLine} from "react-icons/fa"
import {TbMessage2Dollar} from "react-icons/tb"
import {BsCartCheck} from "react-icons/bs"
import {AiOutlineMessage} from "react-icons/ai"
import {CgShoppingBag} from "react-icons/cg"
import {MdOutlineCurrencyExchange} from "react-icons/md"
import {RiLogoutBoxFill, RiLogoutCircleLine, RiNotification3Line} from 'react-icons/ri'
export const adminUrl = [
    {
        id:1,
        title:"Accueil",
        listItems:[
            {
                id:1,
                label:"Accueil",
                link:"/dashboard",
                icon:<FiHome/>
            },
            {
                id:2,
                label:"Communauté",
                link:"/dashboard/admin/community",
                icon:<HiOutlineUsers/>
            },
            {
                id:3,
                label:"Services",
                link:"/dashboard/admin/services",
                icon:<LiaBusinessTimeSolid/>
            },
            {
                id:4,
                label:"Boutiques",
                link:"/dashboard/admin/shops",
                icon:<CiShoppingTag/>
            },
            {
                id:5,
                label:"Sondages",
                link:"/dashboard/sondages",
                icon:<FaChartLine/>
            },

        ]
    },
    {
        id:1,
        title:"Extensions",
        listItems:[
            {
                id:1,
                label:"Villes",
                link:"/dashboard/admin/ville",
                icon:<FiHome/>
            },
            {
                id:2,
                label:"Secteurs",
                link:"/dashboard/admin/secteur",
                icon:<HiOutlineUsers/>
            },
            {
                id:3,
                label:"Professions",
                link:"/dashboard/admin/profession",
                icon:<LiaBusinessTimeSolid/>
            },


        ]
    },
    {
        id:1,
        title:"Comptes",
        listItems:[

            {
                id:2,
                label:"Profil",
                link:"/profil",
                icon:<BiUserCircle/>
            },
            {
                id:3,
                label:"Notifications",
                link:"/dashboard/notifications",
                icon:<RiNotification3Line/>

            }
            ,
            {
                id:4,
                label:"Quitter",
                link:"/",
                icon:<RiLogoutCircleLine/>
            }

        ]
    },
   
  
]
export const sellerUrl = [
    {
        id:1,
        title:"Accueil",
        listItems:[
            {
                id:1,
                label:"Accueil",
                link:"/dashboard",
                icon:<FiHome/>
            },
            {
                id:2,
                label:"Boutiques",
                link:"/dashboard/seller/shops",
                icon:<CiShoppingTag/>
            },
            {
                id:3,
                label:"Produits",
                link:"/dashboard/seller/products",
                icon:<CgShoppingBag/>
            },
            {
                id:4,
                label:"Commandes",
                link:"/dashboard/seller/orders",
                icon:<BsCartCheck/>
            },
            {
                id:5,
                label:"Messages",
                link:"/dashboard/seller/messages",
                icon:<TbMessage2Dollar/>
            },
            {
                id:6,
                label:"Sondages",
                link:"/dashboard/sondages",
                icon:<FaChartLine/>
            },

        ]
    },
    {
        id:1,
        title:"Comptes",
        listItems:[
            {
                id:1,
                label:"transactions",
                link:"/",
                icon:<MdOutlineCurrencyExchange/>
            },
            {
                id:2,
                label:"Profil",
                link:"/profil",
                icon:<BiUserCircle/>
            },
            {
                id:3,
                label:"Notifications",
                link:"/dashboard/notifications",
                icon:<RiNotification3Line/>

            }
            ,
            {
                id:4,
                label:"Quitter",
                link:"/",
                icon:<RiLogoutCircleLine/>
            }

        ]
    },
]
export const freelancerUrl = [
    {
        id:1,
        title:"Accueil",
        listItems:[
            {
                id:1,
                label:"Accueil",
                link:"/dashboard",
                icon:<FiHome/>
            },
            {
                id:2,
                label:"Services",
                link:"/dashboard/freelancer/services",
                icon:<CiShoppingTag/>
            },
            {
                id:3,
                label:"Commandes",
                link:"/dashboard/freelancer/orders",
                icon:<CgShoppingBag/>
            },
            {
                id:5,
                label:"Messages",
                link:"/dashboard/freelancer/messages",
                icon:<TbMessage2Dollar/>
            },
            {
                id:6,
                label:"Sondages",
                link:"/dashboard/sondage",
                icon:<FaChartLine/>
            }

        ]
    },
    {
        id:1,
        title:"Comptes",
        listItems:[
            {
                id:1,
                label:"transactions",
                link:"/",
                icon:<MdOutlineCurrencyExchange/>
            },
            {
                id:2,
                label:"Profil",
                link:"/profil",
                icon:<BiUserCircle/>
            },
            {
                id:3,
                label:"Quitter",
                link:"/",
                icon:<RiLogoutCircleLine/>
            }

        ]
    },
]