import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import { MenuItem } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FaSave } from 'react-icons/fa';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { GET_SONDAGE_ANSWERS } from '@/utils/Constant';
import { DataGrid, GridColDef,GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';


export default function DashboarSondageAnswers() {
  const router = useRouter()
  const [answers,setAnswers] = useState([])
  const [question,setQuestion] = useState(1)
  const [currentAnswers,setCurrentAnswer] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  const [isHover,setIsHover] = useState(false)
  const [questions,setQuestions] = useState([])
  const [sondage,setSondage] = useState({})
  const {sondageId} = router.query
  const roo ="p-[20px] rounded-[10px] border border-[#384256] text-white flex-1 "
  const getSondage = async () => {
    
    
    try{
        const data = await axios.get(GET_SONDAGE+sondageId,{withCredentials:true}).then(
            (response)=>{
                setSondage(response.data.sondage)
            }
        )  
    }
    catch(err)
    {
        
    }
  } 
  const getSondageAnswer = async () => {
    try{
        const data = await axios.get(GET_SONDAGE_ANSWERS+sondageId,{withCredentials:true}).then(
            (response)=>{
                setAnswers(response.data.answers)
                setQuestions(response.data.questions)
                setCurrentAnswer(response.data.answers.filter(a=>a.questionId===response.data.questions[0].id))

            }
        )  
    }
    catch(err)
    {  
        
    }
  } 
  const setDataAndQuestion = (value) =>{
    setQuestion(value)
  }
  const getCurrentAnswer = (value)=>{
    setCurrentAnswer(answers.filter(a=>a.questionId===value))
  }
  const columns = [

    { field: 'id', headerName: 'ID', width: 70 ,align:"left",headerAlign:"left"},
    {
        field: 'Utilisateur',
        headerName: 'Candidat',
        // type: 'number',
        width: 250,
        align :"left",
        renderCell:(params)=>{
          return(
            <p>{params.row.user.fullname}</p>
          )
      }
    },
    {
      field: 'question',
      headerName: 'question',
      // type: 'number',
      width: 300,
      align :"left",
      renderCell:(params)=>{
        return(
          <p>{questions[question-1].label}</p>
        )
    }
  },
  {
    field: 'reponse',
    headerName: 'Reponse',
    // type: 'number',
    width: 250,
    align :"left",
    renderCell:(params)=>{
      return(
        <p>{params.row.answer}</p>
      )
  }
},
  ];
   useEffect(
    ()=>{
        getSondage()
        getSondageAnswer()
    },[sondageId]
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
        <Stepper activeStep={3}>
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
<h3 className='text-2xl text-gray-900 mb-5 text-center mt-10'>Réponses au sondage</h3>
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
         {questions.map((option,index) => (
         <MenuItem onClick={()=>getCurrentAnswer(option.id)} key={index+1} value={index+1}>
         
         {option.label}
         </MenuItem>
         ))}
     </TextField>  
</div>

<div className='flex flex-col'>
    {
      <DataGrid
      className="dataGrid"
      rows={currentAnswers}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      slots={{ toolbar: GridToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
      }}
      pageSizeOptions={[5]}
      checkboxSelection
      disableRowSelectionOnClick
      disableColumnFilter
      disableDensitySelector
      disableColumnSelector
    />
    }
    {/* {
   questions.length>0 &&    questions[question-1]?.type === "Question à choix multiple"? <h1>Multiple</h1>:     
    }      */}
</div>


<button onClick={()=>save()}   className='flex w-[150px] mb-32 cursor-pointer gap-1 outline-none items-center justify-center border  py-1 hover:shadow-lg px-5 bg-purple-500 text-white rounded-lg shadow-sm'>
   <FaSave/> Enregistrer 
</button>        


</div>  

</div>  
</div>
  )
}
