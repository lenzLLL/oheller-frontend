import React,{useState,useEffect} from "react"
import Star from "./Star";
import InputCom from "./InputCom";
import LoaderStyleOne from "./Loaders/LoaderStyleOne";
import StarRating from "./StarRating";
import { TextField,Button } from "@mui/material";
import { useCookies } from 'react-cookie'
import { ADD_PRODUCT_REVIEW, GET_ALL_PRODUCTS_REVIEW, GET_USER_INFOS } from "@/utils/Constant";
import Swal from 'sweetalert2'
import axios from "axios"
import { useRouter } from "next/router";
export default function Reviews({
  comments,
  rating,
  ratingHandler,
  seller,
  name,
  nameHandler,
  email,
  emailHandler,
  phone,
  phoneHandler,
  message,
  messageHandler,
  reviewAction,
  hoverRating,
  hoverHandler,
  reviewLoading,
  shopId
}) {
  const [user,setUser] = useState()
  const [review,setReview] = useState("")
  const [isLoading,setIsLoading] = useState(false)
  const [reviews,setReviews] = useState([])
  const [isAlreadySubmit,setIsAlreadySubmit] = useState(false)

  const [cookies] = useCookies()
  const router = useRouter()
  const {productId} = router.query
  const getAllProductsReviews = async () => {
    try{
        const data = await axios.get(GET_ALL_PRODUCTS_REVIEW+"/"+productId,{withCredentials:true}).then(
            (response)=>{
                setReviews(response.data.reviews)
              
                for(let i = 0;i<response.data.reviews?.length;i++)
                {
                    if(seller.id == response.data.reviews[i].buyerId )
                    {
                      setIsAlreadySubmit(true)
                      break
                    }  
                } 
                
            }
        )     
    }
    catch(err)
    {
        alert(err)
    }
  }

  const submitReview = async () => {
    try{
        setIsLoading(true)
        if(!review || !rating || rating <0){  
          Swal.fire({
            title: 'Error!',
            text: "veillez remplir tous les champs avant l'enregistrement",
            icon: 'error',
            confirmButtonText: 'Ok',
            buttonsStyling:"danger"
          }) 
          setIsLoading(false)
          return
        }
        alert(productId)
        const response = await axios.post(ADD_PRODUCT_REVIEW+productId,{text:review,rating,shopId},{withCredentials:true})
         

        if(response.status === 201)
        {
          window.location.replace("/dashboard/seller/products")
          Swal.fire(
            'Opération terminée',
            '',
            'success'
          )     
          getAllProductsReviews() 
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
     
        alert(err)
    }
    setIsLoading(false)
  }

  useEffect(
    ()=>{
       getAllProductsReviews()
    },[]
  )

  return (
    <div className="review-wrapper w-full">
      <div className="w-full reviews mb-[60px]">
        {/* comments */}
        <div style = {{height:'500px',overflow:"scroll"}} className="w-full comments mb-[60px]">
          {reviews &&
            reviews.length > 0 &&
            reviews.map((comment) => (
              <div
                key={comment.id}
                className="comment-item bg-white px-10 py-[32px] mb-2.5"
              >
                <div className="comment-author flex justify-between items-center mb-3">
                  <div className="flex space-x-3 items-center">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                      <img
                        src={comment.buyer?.url_image? comment.buyer.url_image:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIQAhAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUCAwYHAf/EADQQAAICAQICBwYGAgMAAAAAAAABAgMEBREhMQYSEyJBUYEyYXGRodEUQlJiscE04SNygv/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A9xAAAAAAAAAAAAAAAAAAAAAAAAAAAAADGdkYR3m0l7yNlZiq7kNnP6IrZzlZLrTk5P3lkFhZqEIvuRcve+BolqFr5RgiIC4mpX4+79vyNkNRl+etejIIGC3pyqrOCe0vKRv3KEk42ZOnhJucPJ818CYatgYV2RsipQe6ZmRQAAAAAAAAiZ2T2UepB9+S+SJNs1XXKcuSRSWTdk3KXNlgx+IAKyAFTqnSDB02brnKVty511cdvi+SAtgczR0yw5z6t2NdXF/mTUtvQ6HGyacumN2NZGyuXKUWBtAAG7HvdE9924v2kW8ZKUU4vdNcCiJ+m3cXVJ++JLF1YAAigAAAACFqU9q4w/U92VpL1J/86XlEiGogAAim6UanPTdPSoe2Rc3CD/T5v0PPW23u2234s6bp428/Fi33VS2vn/pHMlAtejmqT03PjvJ/h7Wo2x8F5S9PuVR8lyYR64DRgycsLHlJ7ydUW/jsjeRQzpn2dsZrwZgAL5cj6a8d9aiD84o2GWgAAAABVal/k/8AlEUm6pHvwl7tiEaiAACOW6dYsp0Y+XFbqtuE9vfyfz/k409YuqrvpnVdBTrmtpRfJo5HP6HWKyUsC+MoPlC3g16+IHKm7Ex55eVVj1LedklFe73lzX0R1OUtrHRBefab/wBHS6HoNGlJ2dbtsiS2djWyS8kgLWEYwhGEeUUkvQyAAADnwAusX/Hr/wCqNpjXHqwjHyWxkZaAAAAAEfNq7Sh7e0uKKgv2VObQ6rOtFdyX0fkWJUYA5TpT0gnXOeBgz6slwuti+K/av7Kiz1XpFg6dJ19Z33rnCvw+L8Dnsjphnzb7CqimPhwcn9fsc6Ci8h0r1WMt3ZVL3SrX9Fng9MouSjn43VX66Xv9H9zkAB6ri5VGXSrca2Nlb/NF/Q3HmGmalk6ZkdtjT5+3B+zNeTPRdNzqdRxIZND4S4OL5xfimQSiRg1dpkJ+EeLI6Tb2Sbb8C4xKOwr2ftPjIVW8AGVAAAAAAwtrjbBxmt0zMAcv0luno+nXXx4yfdql+58vlz9Dy5tybbe7b3b8z3TJx6sqmVN9ULK5cJRmt0zhta6Atylbo9iXj2Fr4ekvv8zUqWODBLztLz9Pk45uJdVt+aUe78+RE3LrIAfYRlZNQri5zfKMVu36FHwv+hufLH1NYrb7PJ7vV/f4P+j7pXQ/VtQkpWU/hav13cH6R5/wd7oPRnA0ZKdUO1yPG+xd708iWrIscPE7Pv2e34LyJgBhoAAAAAAAAAAAAAYuCa2fFeRBv0TSsh73adiyfm6VuWAAqo9G9Fi91pmL61pk7Hw8fGj1caiqleVcFH+DeAPiWx9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//Z"}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                          <img
                        src={comment.buyer?.url_image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-[18px] font-medium text-qblack">
                        {comment.buyer.fullname}
                      </p>
  
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {Array.from(Array(comment.review), () => (
                        <span key={comment.rating + Math.random()}>
                          <Star />
                        </span>
                      ))}
                    </div>
                    <span className="text-[13px] font-normal text-qblack mt-1 inline-block">
                      ({comment.rating}.0)
                    </span>
                  </div>
                </div>
                <div className="comment mb-[30px]">
                  <p className="text-[15px] text-qgray leading-7 text-normal">
                    {comment.text}
                  </p>
                </div>
                <hr/>
              </div>
          
            ))}
        </div>
        {/* load comments */}
       
      </div>
   { !isAlreadySubmit && <> <div className="write-review w-full">
        <h1 className="text-2xl font-medium text-qblack mb-5">
          Votre avis*
        </h1>

        <div className="flex space-x-1 items-center mb-[30px]">
          <StarRating
            hoverRating={hoverRating}
            hoverHandler={hoverHandler}
            rating={rating}
            ratingHandler={ratingHandler}
          />
          <span className="text-qblack text-[15px] font-normal mt-1">
            ({rating}.0)
          </span>
        </div>

        <div className="w-full review-form ">
          <div className="sm:flex sm:space-x-[30px] items-center mb-5">
       
           
           
          </div>
          <div className="w-full mb-[30px]">
            <h6 className="input-label text-qgray capitalize text-[13px] font-normal block mb-2 ">
              Message*
            </h6>
            <TextField multiline minRows={10} className="w-[600px] max-w-[90%]" value = {review}  onChange={(e)=>setReview(e.target.value)} helperText="Minimum trois lettres!" id="outlined-basic" label= "Entrez votre commentaire" variant="outlined" />

          </div>

        
        </div>
      </div>
      <Button disabled = {isLoading} onClick = {()=>submitReview()} type="danger" className ="mt-2" variant="contained">Enregistrer</Button>
      </>}
    </div>
  );
}
