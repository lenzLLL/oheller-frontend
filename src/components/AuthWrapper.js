import React,{useState} from 'react'
import {MdFacebook} from "react-icons/md"
import {FcGoogle} from "react-icons/fc"
import {useCookies} from "react-cookie"
import { useStateProvider } from '@/context/StateContext'
import { reducerCases } from '@/context/Constant'
import Swal from "sweetalert2"
import axios from "axios"
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/Constant'

export default function AuthWrapper({type}) {
    const [{showLoginModal,showSignupModal,userInfos},dispatch] = useStateProvider()  
    const [cookies,setCookies] = useCookies()
    const [values,setValues] = useState({email:"",password:""})
    const handleChange = (e) => {
        setValues({...values,[e.target.name]:e.target.value})   
    }
    const handkeClick = async (e) => {
        try{
            const {email,password} = values
            if(email && password )
            {
                
                const {data:{user,jwt}} = await axios.post(type === "login"? LOGIN_ROUTE:SIGNUP_ROUTE,{email,password},{withCredentials:true})
                dispatch({type:reducerCases.CLOSE_AUTH_MODAL})
                setCookies("jwt",{jwt})
                if(user)
                {
                    dispatch({type:reducerCases.SET_USER,userInfos:user})
                    Swal.fire(
                        'Bienvenue sur O Heller',
                        '',
                        'success'
                      )
                    window.location.reload()
                }
            }
            else{
                Swal.fire({
                    title: 'Error!',
                    text: "Veillez entrer l'email et le mot de passe!",
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    buttonsStyling:"danger"
                  })  
            } 
            
        }
        catch(error)
        {
            Swal.fire({
                title: 'Error!',
                text: "Une erreur s'est produite, veillez vérifier vos informations d'authentification et ressayer",
                icon: 'error',
                confirmButtonText: 'Ok',
                buttonsStyling:"danger"
              })  
        }

    }
    return (
    <div  className='fixed left-0 w-[100vw] h-[100vh] top-0 z-[100] shadow-sm'>
        <div className='h-[100vh] w-[100-vw]  top-0  fixed backdrop-blur-md' id='blur-div'>
        </div>
        <div className='h-[100vh] w-[100-vw] backdrop-blur-md   flex justify-center items-center' id='blur-div'>
            <div className='relative p-8 flex flex-col shadow-lg gap-7 justify-center items-center bg-white'>
           <span onClick={()=>  dispatch({type:reducerCases.CLOSE_AUTH_MODAL})} className='absolute right-4 top-4 text-lg'>X</span>
                
                <h3 className='text-2xl font-semibold text-[#555]'>{type === "login"?"Se Connecter":"S'enregistrer"}</h3>
                <div className='flex flex-col gap-5'>
                    <button className='flex items-center w-80 rounded-sm font-semibold bg-blue-500 text-white p-3 justify-center relative'>
                        <MdFacebook className='absolute left-4 text-2xl'/>
                        Continuer avec facebook
                    </button> 
                    <button className='flex items-center w-80 rounded-sm border text-black border-slate-300 p-3 justify-center relative'>
                        <FcGoogle className='absolute left-4 text-2xl'/>
                        Continue avec google
                    </button> 
                </div>
                <div className='relative w-full text-center'>
                    <span className=' before:content-[""] before:h-[0.5px] before:w-80 before:absolute before:top-[50%] before:left-0 before:bg-slate-300'>
                        <span className='z-10 relative px-2 bg-white font-600'>
                            OU
                        </span>
                    </span>
               </div>
               <div className='flex flex-col gap-4'>
                   <input onChange={handleChange} value={values.email} type ="text" placeholder='Email' name = "email" className='outline-none w-80 px-5 py-2 border border-slate-300 rounded-sm'/> 
                   <input onChange={handleChange} value={values.password} type ="text" placeholder='Mot De Passe' name ="password" className='outline-none w-80 px-5 py-2 border border-slate-300 rounded-sm'/> 
                   <button className="bg-appPrimaryColor py-2 border-appPrimaryColor px-3 rounded-sm shadow-sm text-white" onClick={handkeClick}>
                       Connexion
                   </button>
               </div>
               <div className='flex item-center justify-center'>
                    { type === "login"?<p className='text-[#555]'>
                        Etes-vous enregistré? &nbsp; <span className='text-appPrimaryColor cursor-pointer' onClick = {()=>{
                            dispatch({type:reducerCases.TOGGLE_SIGNUP_MODAL,showSignupModal:true})    
                            dispatch({type:reducerCases.TOGGLE_LOGIN_MODAL,showLoginModal:false})    

                        }}>Nous Rejoindre</span>
                    </p>:<p onClick = {()=>{
                            dispatch({type:reducerCases.TOGGLE_SIGNUP_MODAL,showSignupModal:false})    
                            dispatch({type:reducerCases.TOGGLE_LOGIN_MODAL,showLoginModal:true})    

                        }}  className='text-[#555]'>
                        Avez vous un compte? &nbsp; <span className='text-appPrimaryColor cursor-pointer'>Se Connecter</span>
                    </p>}
                </div>
            </div>
 
            
        </div>
    </div>
  )
}
