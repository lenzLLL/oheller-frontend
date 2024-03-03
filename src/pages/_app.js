import AuthWrapper from '@/components/AuthWrapper'
import Footer from '@/components/Footer'
import reducer, { initialeState } from '@/context/StateReducer'
import { StateProvider } from '@/context/StateContext'
import '@/styles/globals.css'
import Navabar from '@/components/Navabar'
import { usePathname } from 'next/navigation'
import Head from 'next/head'
export default function App({ Component, pageProps }) {
  const pathname = usePathname() 
  const setShow = () => {
   if(!pathname)
   {
      return
   }
   let e = "";
   let value = pathname
   let length = value.length>10?10:value.length 
   for(let i = 0;i<10;i++)
   {
       e += value[i]
   }
   if(e === "/dashboard")
   {
      return false
   }
   return true
  }
  return (
   <StateProvider initialeState={initialeState} reducer = {reducer}>
           <Head>
               <link rel ="icon" href ="/logo/logo-1.png"  sizes="56x56"/>
               <title>O heller</title> 
           </Head>
           <div className='relative flex flex-col h-screen justify-between'>
              {setShow() && <Navabar/>}
               <div className={`mb-auto w-full nx-auto`}>
                  <Component {...pageProps} /> 
               </div>
              {setShow()  && <Footer/>}
           </div> 
       
   </StateProvider> 
  )
}
