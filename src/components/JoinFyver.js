import React from "react"
import Image from "next/image";
import Typed from "react-typed"
function JoinFyver(){
    return <div className="mx-16 my-8 lg:mx-32 lg:my-16 relative">
        <div className="w-full h-96">
            <Image src = {"/login4.png"} className="rounded-lg" fill alt ="signup"/>
        </div>
        <div className="absolute top-0 bg-[rgba(0,0,0,0.3)] rounded-lg w-full h-full">

        </div>
        <div className="absolute top-0 pl-[40px] gap-10 left-0 w-full h-full flex flex-col justify-center">
            <h1 className="text-white text-[40px] font-bold w-[90%] ">
                <Typed
                    strings = {[
                        "Trouvez un travail ou gagnez des marchés Retrouvez notre communauté de E-commerce",
                        "Faites des gains en vendant vos produits numériques tel que les livres (E-Book)",
                        "Vendez vos projets numériques tel que des logiciels, codes sources, Design"
                    ]}
                    loop
                    typeSpeed={150}
                    backDelay={100}
                />
        </h1>

        </div>
        <button style = {{boxShadow:"0 0 5px #1DDF73"}} className="absolute bottom-0 m-[40px] mb-[50px]  bg-[#1DDF73] w-[150px] py-3 font-semibold border-[#1DDF73] px-3 rounded-lg text-white">
                Rejoindre Bollo
            </button>
    </div>        
}

export default JoinFyver;