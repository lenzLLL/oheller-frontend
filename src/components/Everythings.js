import Image from "next/image";
import {BsCheckCircle} from "react-icons/bs"
function Everythings(){
    const everyThingsDatas = [
        {
            title:"Exploration des services",
            subtitle:"Notre plateforme permettra aux utilisateurs de rechercher et d'explorer facilement une grande variété de services, tout domaines confondu."
        },
        {
            title:"Gestion des profils",
            subtitle:"Chaque utilisateur pourra créer un profil personnalisé sur le site web, où il pourra avoir accès à un certain nombre de service en fonction du type de compte"
        },
        {
            title:"Rentabilisation",
            subtitle:"Les utilisateurs auront la possibilité de rentabliser leurs compétences, grâce aux services de freelance, e-commerce et la participation aux sondages"
        },
        {
            title:"Gestion des historiques",
            subtitle:"les utilisateurs auront la possibilité de consulter le historiques (commandes,sondages,...) et de recevoir des notifications par mail",
        }

    ]
    return <div className="bg-[#f1fdf7] gap-5 flex flex-col lg:flex-row px-7 py-7 lg:px-15 lg:py-15 xl:px-20 xl:py-20 justify-between">
        <div className="w-full lg:w-1/2">
            <h2 className="mb-5 text-center text-4xl text-[#555] font-bold">
                A Popos De La <span className="text-appPrimaryColor">Plateforme!</span>
            </h2>
            <ul className="flex flex-col gap-10 my-10">
                {
                    everyThingsDatas.map(
                        ({title,subtitle})=>{
                            return(
                                <li key = {title}>
                                    <div className="flex items-center gap-5 my-1">
                                        <BsCheckCircle size={30} className="text-[#6264]"/>
                                        <h4 className=" text-xl font-semibold">{title}</h4> 

                                    </div>
                                    <p className="text-[#666]">
                                        {subtitle}
                                    </p>
                                </li>
                            )
                        }
                    )
                }
            </ul>
        </div>
        <div style = {{borderRadius:"10px"}} className="relative w-full lg:w-1/2 h-[350px] lg:h-[500px] rounded-2xl">
            <Image className="rounded-[5px] shadow-md" fill src = "https://images.pexels.com/photos/3184312/pexels-photo-3184312.jpeg?auto=compress&cs=tinysrgb&w=600"/>
        </div>
        <div>

        </div>
    </div>       
}

export default Everythings;