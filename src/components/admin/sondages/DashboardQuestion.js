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
import {BiRightArrowAlt,BiLeftArrowAlt} from "react-icons/bi"
import { ADD_SONDAGE } from '@/utils/Constant';
export default function DashboardQuestion() {
  const [images,setImages] = useState([])
  const [features,setFeatures] = useState([])
  
  const [shops,setShops] = useState([])
  const [questionType,setQuestionType] = useState("Question à choix multiple")
  const [shopFeatures,setShopFeatures] = useState([])
  const [label,setLabel] = useState("")
  const [isLoading,setIsLoading] = useState(false)
  const [currentFeature,setCurrentFeature] = useState()
  const [isHover,setIsHover] = useState(false)
  const [tags,setTags] = useState([])
  const [sizes,setSizes] = useState(["Aucunes","sm,md,lg,xl..."])
  const roo ="p-[20px] rounded-[10px] border border-[#384256] text-white flex-1 "
  const [data,setData] = useState(
    {
        title:"",
        days:7,
        numQuest:5,
        sexe:"Sans distinction",
        participants:0,
        secteur:"Tout",
        profession:"Tout",
        ageMin:15,
        ageMax:100
    }
  )
  const [questions,setQuestions] =useState([])
  const goToBack = () => {
    router.push("/dashboard/sondages/sondage-infos")
  }
  const saveSondage = async () => {
    
    try{
        setIsLoading(true)
        if(goToNext()){  
          Swal.fire({
            title: 'Error!',
            text: "veillez ajouter toutes les questions avant de continuer",
            icon: 'error',
            confirmButtonText: 'Ok',
            buttonsStyling:"danger"
          }) 
          return
        }
        const response = await axios.post(ADD_SONDAGE,{users:JSON.parse(localStorage.getItem("users-sondage")) ,sondage:JSON.parse(localStorage.getItem("sondage1")),questions},{withCredentials:true})
         

        if(response.status === 201)
        {
           
          window.location.replace("/dashboard/sondages")
          Swal.fire(
            'Votre sondage a été envoyé avec success !',
            'Nous vous ferons un retour dans les plus brefs délais en ce qui concerne le  budget du sondage',
            'success'
          )  
        }
      }
    catch(err)
    {
     
         Swal.fire({
           title: 'Error!',
           text: 'Une erreur s\'est produite veillez vérifier vos données et ressayer s\'il vous  plait',
           icon: 'error',
           confirmButtonText: 'Ok',
           buttonsStyling:"danger"
         })    
        
      
    }
    setIsLoading(false)
  }
  const goToNext = () =>{
    let reject = false
    for(let i = 0;i<questions.length;i++)
    {
        if(!questions[i].label) 
        {
          reject = true
          break
        } 
    }
    return reject
  }
  const addTag = () =>{
    if(!tags)
    {
      return
    }
    setTags([...tags,currentTag])
    setCurrentTag("")
  }

  const save = () => {
    if(!label || !questionType || (questionType === "Question à choix multiple" && tags.length<=0))
    {
      Swal.fire({
        title: 'Error!',
        text: "Veillez remplir tous les champs de texte",
        icon: 'error',
        confirmButtonText: 'Ok',
        buttonsStyling:"danger"
      }) 
      return
    }
    for(let i = 0;i<questions.length;i++)
    {
      if(questions[i].num === question)
      {
        let newQuestions = questions
        newQuestions[i] = {...newQuestions[i],label:label,tags:tags,type:questionType}
        setQuestions(newQuestions)
        localStorage.setItem("questions",JSON.stringify(newQuestions))
        break
      }
    }
    setLabel("")
    setTags([])
    setQuestionType("Question à reponse ouverte")
    if(question!==questions?.length)
    {
      setQuestion(question+1)
      setLabel(questions[question].label)
      setQuestionType(questions[question].type)
      setTags(questions[question].tags)
    }
    else{
      setQuestion(1)
      setLabel(questions[0].label)
      setQuestionType(questions[0].type)
      setTags(questions[0].tags)
    }
  

  }
  const setDataAndQuestion = (value) =>{
      setQuestion(value)
      setLabel(questions[value-1].label)
      setQuestionType(questions[value-1].type)
      setTags(questions[value-1].tags)
  }
  const router = useRouter()
  const secteurs = [
    "Tout",
    "Agriculture",
    "Informatique",
    "Industrie",
    "autres"
  ]
  const professions = [
    {
        secteur:"Tout",
        profession:"Tout"
    },
    {
      secteur:"Informatique",
      profession:"Développement web",
    },
    {
      secteur:"Informatique",
      profession:"Designer",
    },
    {
      secteur:"Informatique",
      profession:"Analyste informatique",
    },

  ]
  const [currentTag,setCurrentTag] = useState("") 
  const [question,setQuestion] = useState(1)
  const [skipped, setSkipped] = React.useState(new Set());
  const isStepOptional = (step) => {
    return step === 1;
  };
  const deleteTags = async (value) => {
    const newtags = tags.filter(tag=>tag!=value)
    setTags(newtags)
}

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

   useEffect(
    ()=>{
        if(!localStorage.getItem("questions"))
        {
             let numQuest = JSON.parse(localStorage.getItem("sondage1")).numQuest
             let q = []
             for(let i = 0;i<numQuest;i++)
             {
                  q.push({num:i+1,type:"",label:"",tags:[]})
             }
             setQuestions(q)
             
        }
        else{
            setQuestions(JSON.parse(localStorage.getItem("questions")))
            setLabel(JSON.parse(localStorage.getItem("questions"))[0].label)
        }
    },[]
   )
    return (
        <div className='dashboarshop' >
                  
                   <div className= {roo+" box9 bg-white pt-10"}>
                   <Stepper activeStep={1}>
        {["Informations","Questions","paiement","Réponses"].map((label, index) => {
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
       <h3 className='text-2xl text-gray-900 mb-5 text-center mt-10'>Entrez les questions pour votre sondage</h3>
       <div className='mt-10 flex flex-col gap-5 '>
           <div className='grid grid-cols-1'>
               <TextField
                  id="outlined-select-currency"
                  select
                  label="Choisir la question"
                  value = {question}
                  onChange={(e)=>setDataAndQuestion(e.target.value)}
                  helperText="Veillez choisir une Boutique!"
               >
                    {questions.map((option) => (
                    <MenuItem key={option.num} value={option.num}>
                    Question {option.num}
                    </MenuItem>
                    ))}
                </TextField>  
           </div>
           <div className='grid grid-cols-1'>
               <TextField
                  select
                  label="Type de question"
                  value = {questionType}
                  onChange={(e)=>setQuestionType(e.target.value)}
                  helperText="Veillez choisir le type de question!"
               >
                    {["Question à reponse ouverte","Question à choix multiple"].map((option) => (
                    <MenuItem key={option} value={option} onClick={()=>{}}>
                          {option}
                    </MenuItem>
                    ))}
                </TextField>  
           </div>
           <div className='grid grid-cols-1'>
               <TextField multiline minRows={5} value = {label} onChange = {(e)=>setLabel(e.target.value)} placeholder='Entrez votre question'/> 
           </div>
          {questionType === "Question à choix multiple" && <div className='flex items-center justify-center gap-1'>
               <TextField value={currentTag} onChange={(e)=>setCurrentTag(e.target.value)} className='flex-1' helperText="Minimum 5 caractères!" id="outlined-basic" label= {`Ajoutez une reponse`} variant="outlined" />
               <button onClick = {()=>addTag()}  className='flex items-start mb-5 justify-center border w-[100px] py-[15px] hover:shadow-lg px-20 outline-none bg-purple-500 text-white rounded-lg shadow-sm'>
                   Ajouter
               </button>
           </div>}
{  questionType === "Question à choix multiple" &&         <div className='flex gap-5 flex-wrap'>
               {
                   tags.length > 0 && tags.map(
                    (item)=>{
                      return <span onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)} style = {{boxShadow:"inset 0 0 1.5px rgba(0,0,0,0.5)"}} className='px-5 rounded-md py-3 cursor-pointer relative text-[#555]'>
                        {item}
                     {isHover && <span onClick = {()=>deleteTags(item)} className='absolute top-[2px] right-1'><MdDelete style = {{color:"gray",fontSize:"15px"}}/></span>  }                      </span>
                    }
                   ) 
               } 
           </div>}
           <button onClick={()=>save()}   className='flex w-[150px] mb-32 cursor-pointer gap-1 outline-none items-center justify-center border  py-1 hover:shadow-lg px-5 bg-purple-500 text-white rounded-lg shadow-sm'>
              <FaSave/> Enregistrer 
           </button>        
  
           
      
    
           
              
    <div className='flex items-center justify-between'>
        
    <button onClick={()=>goToBack()}   className='flex cursor-pointer gap-1 outline-none items-center justify-center border  py-1 hover:shadow-lg px-5 bg-purple-500 text-white rounded-lg shadow-sm'>
              <BiLeftArrowAlt className='text-[35px]'/>  Retour
           </button>
           <button disabled = {isLoading} onClick={()=>saveSondage()}   className='flex cursor-pointer gap-1 outline-none items-center justify-center border py-1  hover:shadow-lg px-5 bg-purple-500 text-white rounded-lg shadow-sm'>
                Valider <BiRightArrowAlt className='text-[35px]'/>
           </button>
    </div>

       </div>  

        </div>  
       </div>
  )
}
