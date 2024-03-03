import React from 'react'
import Navabar from '../Navabar'
import Footer from '../Footer'

export default function Layout({children}) {
  return (
    <div className='main bg-[#2a3445] min-h-full'>
        <Navabar/>
        <div className='container'>
            <div className='menuContainer'>
                <div className='menu'>

                </div>
            </div>
            <div className='menuOutlet'>
                {children}
            </div> 
        </div>
        <Footer/>

    </div>
  )
}
