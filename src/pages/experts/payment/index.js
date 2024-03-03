import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import axios from 'axios';
import { ADD_PRODUCT, ADD_SERVICE, ADD_SHOP, GET_ALL_SHOPS_USER, PAY_SONDAGE } from '@/utils/Constant';
import { MdDelete } from 'react-icons/md';
import { useRouter } from 'next/router';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
export default function DashboardSondagePayment() {
  const [isLoading,setIsLoading] = useState(false)
  const [data,setData] = useState({})
  const [currentFeature,setCurrentFeature] = useState()
  const [paiementMethod,setPaiementMethod] = useState("")
  const [sizes,setSizes] = useState(["Aucunes","sm,md,lg,xl..."])
  const roo ="p-[20px] rounded-[10px]  text-white flex-1 "
  const router = useRouter()
  const {sondageId} = router.query
   useEffect(
    ()=>{

    },[]
   )
   const [activeStep, setActiveStep] = React.useState(0);
   const [skipped, setSkipped] = React.useState(new Set());
   const isStepOptional = (step) => {
     return step === 1;
   };
   const isStepSkipped = (step) => {
     return skipped.has(step);
   };
   const getCv = async() =>{
    if(!userInfos)
    {
      Swal.fire({
        title: 'Error!',
        text: "Veillez vous connecter!",
        icon: 'error',
        confirmButtonText: 'Ok',
        buttonsStyling:"danger"
      })       
    }

    try{
        const response = await axios.post(SEND_REQUEST_WORK,{workerId:data.id,workerEmail:data.email},{withCredentials:true}).then(
          (response)=>{
            Swal.fire(
              'Opération termnée',
              'Veillez attendre un retour de '+name,
              'success',
              "Ok"
            )
          }
        ).catch(
          (error)=>{
            if(error.response.status === 400)
            {
              Swal.fire(
                'Votre requête est en cours d\'attente',
                'veillez vous rendre dans la section offres d\'emploi',
                'infos',
                "Ok"
              )
            }
          }
        )

      
  
      }
    catch(error)
    {
      Swal.fire({
        title: 'Error!',
        text: "Une erreur s'est produite, veillez ressayer!",
        icon: 'error',
        confirmButtonText: 'Ok',
        buttonsStyling:"danger"
      })  
    }
}
   const paymentMethods = [
    {
      id:1,
      name:"Master Card",
      disponible:true,
      img:"/cards/logo_mastercard.svg"
    },
    {
      id:2,
      name:"Visa Card",
      disponible:true,
      img:"/cards/logo_visa.svg"
    },
    {
      id:3,
      name:"Mobile money",
      disponible:false,
      img:"/flags/p2.jpg"
    },
    {
      id:4,
      name:"Orange Money",
      disponible:false,
      img:"/flags/p3.png"
    },
   ]
   useEffect(
    ()=>{
    if(localStorage.getItem('cvdata')){
        setData(JSON.parse(localStorage.getItem("cvdata")))
    }
    },[]
   )
    return (
        
                  
                   <div className= {roo+" box9 bg-white pt-10"}>
                   <Stepper activeStep={2}>
        {["Informations","Questions","Paiement","Réponses"].map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption"></Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
        <div className='mx-auto mt-16 max-w-[900px] px-8 pt-10'>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-700 mb-8'>Choisir la méthode de paiement</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
               {
                   paymentMethods.map(
                    (payment)=>{
                      return                 <label onClick={()=>setPaiementMethod(payment.name)} htmlFor={payment.name} className='relative mb-10 w-full cursor-pointer'>
                      <input className='peer hidden' type = "radio" id = {payment.name} name ="payment"/>
                      <div className='payment-content'>
                      <img className='payment-image' src = {payment.img}  alt = {"paymen-image"}/>                        
                      <p className='payment-text'>{payment.name}</p>
                      </div>
                      <div className='payment-checked'>
                          <img src = {"/cards/icon_check.svg"}/>  
                      </div>
                  </label>
                    }
                   ) 
               }
            </div>
        </div>
        
        <div className='flex items-center mt-16 justify-between mx-auto max-w-[900px] px-8'>
        
        <button onClick={()=>router.push("/experts")}  className='flex cursor-pointer gap-1 outline-none items-center justify-center border  py-1 hover:shadow-lg px-5 bg-purple-500 text-white rounded-lg shadow-sm'>
                  <BiLeftArrowAlt className='text-[35px]'/>  Retour
               </button>
               <button onClick={()=>getCv()}    className='flex cursor-pointer gap-1 outline-none items-center justify-center border py-1  hover:shadow-lg px-5 bg-purple-500 text-white rounded-lg shadow-sm'>
                    Paiement <BiRightArrowAlt className='text-[35px]'/>
               </button>
        </div>

        </div>  
       
  )
}
