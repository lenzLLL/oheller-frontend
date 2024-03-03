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
import { ADD_SONDAGE, GET_SONDAGE } from '@/utils/Constant';
export default function DashboardAdminQuestion() {
  const [images,setImages] = useState([])
  const [features,setFeatures] = useState([])
  const [shops,setShops] = useState([])
  const [questionType,setQuestionType] = useState("Question à reponse ouverte")
  const [shopFeatures,setShopFeatures] = useState([])
  const [label,setLabel] = useState("")
  const router = useRouter()
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
const goToNext = () => {
    router.push("/dashboard/sondages/payment/"+sondageId)
}
  const addTag = () =>{
    setTags([...tags,currentTag])
    setCurrentTag("")
  }
  const {sondageId} = router.query
  const getSondage = async () => {
    try{
       
        const data = await axios.get(GET_SONDAGE+sondageId,{withCredentials:true}).then(
            (response)=>{
                let q = []
                for(let i = 0; i < response.data.questions.length;i++)
                {
                    if(i === 0)
                    {
                    setLabel(response.data.questions[i].label)
                    setQuestionType(response.data.questions[i].type)
                    }
                    q.push({num:i+1,type:response.data.questions[i].type,label:response.data.questions[i].label,tags:response.data.questions[i].tags})
                }  
                setQuestions(q)
            }
        )  
    }
    catch(err)
    {  
        
    }
  } 
  const setDataAndQuestion = (value) =>{
      setQuestion(value)
      setLabel(questions[value-1].label)
      setQuestionType(questions[value-1].type)
      setTags(questions[value-1].tags)
  }
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
        getSondage() 
    },[]
   )
    return (
        <div className='dashboarshop' >
                  
                   <div className= {roo+" box9 bg-white pt-10"}>
                   <Stepper activeStep={1}>
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
       <h3 className='text-2xl text-gray-900 mb-5 text-center mt-10'>Questions</h3>
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
                  disabled ={true}
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
               <TextField disabled ={true} multiline minRows={5} value = {label} onChange = {(e)=>setLabel(e.target.value)} placeholder='Entrez votre question'/> 
           </div>
          {questionType === "Question à reponse multiple" && <div className='flex items-center justify-center gap-1'>
               <TextField disabled ={true} value={currentTag} onChange={(e)=>setCurrentTag(e.target.value)} className='flex-1' helperText="Minimum 5 caractères!" id="outlined-basic" label= {`Ajoutez une reponse`} variant="outlined" />
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
           
  
           
      
    
           
              
    <div className='flex items-center justify-between'>
        
    <button onClick={()=>goToBack()}   className='flex cursor-pointer gap-1 outline-none items-center justify-center border  py-1 hover:shadow-lg px-5 bg-purple-500 text-white rounded-lg shadow-sm'>
              <BiLeftArrowAlt className='text-[35px]'/>  Retour
           </button>
           <button disabled = {isLoading} onClick={()=>goToNext()}   className='flex cursor-pointer gap-1 outline-none items-center justify-center border py-1  hover:shadow-lg px-5 bg-purple-500 text-white rounded-lg shadow-sm'>
                Continuer <BiRightArrowAlt className='text-[35px]'/>
           </button>
    </div>

       </div>  

        </div>  
       </div>
  )
}
