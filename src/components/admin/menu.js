import React,{useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import {FiHome} from "react-icons/fi"
import { adminUrl, freelancerUrl, sellerUrl } from '@/utils/Data'
export default function Menu({current,data}) {
    const router = useRouter()
    const [urls,setUrls] = useState([])
    useEffect(
        ()=>{
    
            if(data?.accountType === "Commerçant (Créez vos Boutiques et vendez vos produits)")
            {
                setUrls(sellerUrl)
            }
            else if(data?.accountType === "Freelancer (Faites vous embaucher et gagnez des marchés)")
            {
                setUrls(freelancerUrl)
            }
            else{
                setUrls(adminUrl)
            }
        },[data]
    )
    return (
    <div className='menu'>
{      urls.map((list)=>  <div className='item flex text-white flex-col gap-[10px] mb-[20px] '>
            <span className='title text-[12px] font-[200] text-[#f3f3f3]'>{list.title}</span>

{           list.listItems.map((l)=> <div onClick = {()=>router.push(l.link)} className={current !== l.link?'flex items-center gap-3 cursor-pointer p-[10px] text-[15px] hover:bg-appPrimaryColor rounded-md hover:text-[white] ease-in duration-100':'flex items-center gap-3 cursor-pointer p-[10px] text-[15px] bg-appPrimaryColor rounded-md text-white ease-in duration-100'}>
                {l.icon}
                <span className='listItemTitle'>{l.label}</span>
            </div>) }     
        </div>)}
    </div>
  )
}
