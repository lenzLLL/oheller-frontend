import React,{useState,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button"
import Swal from 'sweetalert2';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { MenuItem } from '@mui/material';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { useRouter } from 'next/router';

import { FaBackspace, FaSave } from 'react-icons/fa';
import {BiRightArrowAlt,BiLeftArrowAlt} from "react-icons/bi"
import { ADD_ANSWER_SONDAGE, ADD_SONDAGE, GET_SONDAGE } from '@/utils/Constant';
export default function DashboardAdminQuestion() {
  const [questionType,setQuestionType] = useState("Question à reponse ouverte")
  const [label,setLabel] = useState("")
  const router = useRouter()
  const [currentAnswer,setCurrentAnswer] = useState("")
  const [isLoading,setIsLoading] = useState(false)
  const [isHover,setIsHover] = useState(false)
  const [tags,setTags] = useState([])
  const [answer,setAnswer] = useState("")
  const [currentQuestion,setCurrentQuestion] = useState(0)
  const roo ="p-[20px] rounded-[10px] text-white flex-1 "
  const [questions,setQuestions] =useState([])
  const goToBack = () => {
    router.push("/dashboard/sondages/sondage-infos")
  }
const verifySondageAnswer = () =>{
  for(let i = 0;i<questions.length;i++)
  {
      if(!questions[i].answer)
      {
        return false
      }  
  }
  return true
}
const goToNext = async () => {
  try{
    setIsLoading(true)
    if(!verifySondageAnswer()){  
      Swal.fire({
        title: 'Error!',
        text: "veillez repondre à toutes les quetions",
        icon: 'error',
        confirmButtonText: 'Ok',
        buttonsStyling:"danger"
      }) 
      return
    }
    const response = await axios.post(ADD_ANSWER_SONDAGE,{data:questions,sondageId},{withCredentials:true})
    if(response.status === 201)
    {
       
      window.location.replace("/")
      Swal.fire(
        'Votre formulaire a été enregistré',
        'Votre produit a été Créé avec success',
        'success'
      )  
    }
  }
catch(err)
{
    // if(err.response.status == 500)
    // {
    //  Swal.fire({
    //    title: 'Error!',
    //    text: 'Une erreur s\'est produite veillez vérifier vos données et ressayer s\'il vous  plait',
    //    icon: 'error',
    //    confirmButtonText: 'Ok',
    //    buttonsStyling:"danger"
    //  })    
    // }
    alert(err)
}
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
                    q.push({answer:"",id:response.data.questions[i].id,num:i+1,type:response.data.questions[i].type,label:response.data.questions[i].label,tags:response.data.questions[i].tags})
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
      setAnswer(questions[value-1].answer)
  }
  const save = () => {
    if(questionType === "Question à choix multiple"){
      if(!currentAnswer)
      {
        Swal.fire({
          title: 'Error!',
          text: "Veillez choisir une réponse!",
          icon: 'error',
          confirmButtonText: 'Ok',
          buttonsStyling:"danger"
        })   
      }
      questions[question-1].answer = currentAnswer

      
      return
    }
    if(!answer)
    {
      Swal.fire({
        title: 'Error!',
        text: "Veillez entrer une réponse!",
        icon: 'error',
        confirmButtonText: 'Ok',
        buttonsStyling:"danger"
      }) 
      return
    }
    questions[question-1].answer =answer


  }
  const setCheckable = (checked,value) => {
      if(checked)
      {
          questions[question-1].answer = value
          setCurrentAnswer(value)
      }
      else{
        questions[question-1].answer = ""
      }
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
    },[sondageId]
   )
    return (
        <div >
                  
                   <div className= {roo+" box9 bg-white pt-10 px-20"}>

       <h3 className='text-2xl text-gray-900 mb-5 text-center mt-10'>Titre du sondage: </h3>
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
               <TextField disabled ={true} multiline minRows={5} value = {label} onChange = {(e)=>setLabel(e.target.value)} placeholder='Entrez votre question'/> 
           </div>
    
            {questionType === "Question à choix multiple" ? <div className='flex flex-col items-start gap-5 mt-5'>
                          {
                              questions[question-1].tags.map(
                                (value)=> <div className='flex gap-5 items-center cursor-pointer'> <input type ="checkbox" onChange={(e)=>setCheckable(e.target.checked,value)} checked ={currentAnswer === value? true:false} label={value}  className='text-black outline-none' id = {value}/> <label htmlFor={value} className='text-black'>{value}</label></div>
                              ) 
                          }

               </div>:       <div className='grid grid-cols-1'>
               <TextField  multiline minRows={5} value = {answer} onChange = {(e)=>setAnswer(e.target.value)} placeholder='Entrez votre réponse'/> 
           </div>}

           
  
           
      
    
           
              
    <div className='flex items-center justify-between'>
        
    <button onClick={()=>save()}   className='flex cursor-pointer gap-1 outline-none items-center justify-center border  py-3 hover:shadow-lg px-5 bg-purple-500 text-white rounded-lg shadow-sm'>
            Enregistrer ma réponse
           </button>

    </div>
    <div className='flex items-center justify-end mt-15'>
        
        <button onClick={()=>goToNext()}   className='flex cursor-pointer gap-1 outline-none items-center justify-center border  py-3 hover:shadow-lg px-5 bg-purple-500 text-white rounded-lg shadow-sm'>
                 Sousmettre le formulaire
               </button>
    
        </div>

       </div>  

        </div>  
       </div>
  )
}
