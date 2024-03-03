import React,{useState,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button"
import Swal from 'sweetalert2';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { MenuItem } from '@mui/material';
import {HiSaveAs} from "react-icons/hi"
import InputRange from "react-input-range";
import {ImFilePicture} from "react-icons/im"
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { useRouter } from 'next/router';

import { FaBackspace, FaSave } from 'react-icons/fa';
import {BiRightArrowAlt,BiLeftArrowAlt, BiSave} from "react-icons/bi"
import { ADD_SONDAGE, UPDATE_SONDAGE_BY_ADMIN } from '@/utils/Constant';
export default function DashboardAdminSondagePayment() {

  const roo ="p-[20px] rounded-[10px] border border-[#384256] text-white flex-1 "
  const router = useRouter()
  const [questions,setQuestions] =useState([])
  const [montant,setMontant] = useState(0)
  const [isLoading,setIsLoading] = useState(false)
  const [participation,setParticipation] = useState(0)
  const {sondageId} = router.query
  const goToBack = () => {
    router.push("/dashboard/sondages/questions")
  }
  const updateSondage = async () => {
    try{
        
        setIsLoading(true)
        if(!participation || !montant || participation === 0 || montant === 0){  
          Swal.fire({
            title: 'Error!',
            text: "veillez Remplir tous les champs",
            icon: 'error',
            confirmButtonText: 'Ok',
            buttonsStyling:"danger"
          }) 
          return
        }
        const response = await axios.put(UPDATE_SONDAGE_BY_ADMIN+sondageId,{montant,participation},{withCredentials:true})
        if(response.status === 201)
        {
           
         window.location.replace("/dashboard/sondages")
          Swal.fire(
            'Opération terminée !',
            "Sauvegarde terminée ",
            'success'
          )  
        }
      }
    catch(err)
    {
        alert(err)
     
         Swal.fire({
           title: 'Error!',
           text: 'Une erreur s\'est produite veillez vérifier vos données et ressayer s\'il vous  plait',
           icon: 'error',
           confirmButtonText: 'Ok',
           buttonsStyling:"danger"
         })  
         setIsLoading(false)  
        
      
    }
    setIsLoading(false)
  }
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
 

 

   
    return (
        <div className='dashboarshop' >
                  
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
       <h3 className='text-2xl text-gray-900 mb-5 text-center mt-10'>Paiement</h3>
       <div className='mt-10 flex flex-col gap-5 '>
           <div className='grid grid-cols-1'>
               <TextField type = "number" value = {montant}    onChange = {(e)=>setMontant(e.target.value)} placeholder='Entrez le montant du sondage'/> 
           </div>
           <div className='grid grid-cols-1'>
               <TextField  type ="number" value = {participation}   onChange = {(e)=>setParticipation(e.target.value)} placeholder='le montant de la participation'/> 
           </div>

           
  
           
      
    
           
              
    <div className='flex mt-10 items-center justify-between'>
        
    <button onClick={()=>goToBack()}   className='flex cursor-pointer gap-1 outline-none items-center justify-center border  py-1 hover:shadow-lg px-5 bg-purple-500 text-white rounded-lg shadow-sm'>
              <BiLeftArrowAlt className='text-[35px]'/>  Retour
           </button>
           <button  onClick={()=>updateSondage()}   className='flex cursor-pointer gap-1 outline-none items-center justify-center border py-1  hover:shadow-lg px-5 bg-purple-500 text-white rounded-lg shadow-sm'>
              <BiSave className='text-[35px]'/>  Enregistrer 
           </button>
    </div>

       </div>  

        </div>  
       </div>
  )
}
