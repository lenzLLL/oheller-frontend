import React from "react"
import Image from "next/image";

function Compagnies(){
    const flags = ["/flags/p1.png","/flags/p2.png","/flags/p3.png","/flags/p2.jpg"]
    return <div className="flex flex-col p-5 items-center justify-center text-gray-400 text-2xl font-bold min-h-[11vh]">
    Paiements sécurisés: &nbsp;
    <ul className = "my-5 flex justify-center flex-wrap gap-10">
        {
            flags.map(
                (flag)=>{
                    return (
                        <li key = {flag} className = {"relative h-[4.5rem] w-[4.5rem]"}>
                            <Image alt = "brand" fill src = {flag}/>    
                        </li>
                    );
                }
            )
        }
    </ul>
    </div>      
}

export default Compagnies;