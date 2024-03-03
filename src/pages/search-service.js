import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { SEARCH_SERVICE } from '@/utils/Constant'
import axios from "axios"
import SearchGrid from '@/components/search/SearchGrid'
export default function search() {
    const router = useRouter()
    const {category,q} = router.query
    const getData = async () =>{
        try{
           const {data} = await axios.get(`${SEARCH_SERVICE}?searchTerm=${q}&category=${category}`,{withCredentials:true})  
           setServices(data.services)

          }
        catch(err)
        {
          alert(err)
        }
    }
    useEffect(
      ()=>{
          getData()
      },[q,category]
    )
    const [services,setServices] = useState([])
    return (
        <div className='mx-10 mb-24 mt-28'>
            {
              q && (
                <h3 className='text-4xl mb-10'>
                  Resultat pour <strong>{q}</strong>
                </h3>
              )
            } 
          
            <div>
                <div className='my-4'>
                    <h2 className='font-medium text-[#555]'>{services.length} Service(s) disponibles</h2>  
                </div>
                <div className='grid grid-cols-4'>
                    {
                      services.length > 0 && services.map(
                        (service)=> <SearchGrid service={service}/>
                        
                      )
                    }  
                </div>
            </div>
        </div>
    )
}
