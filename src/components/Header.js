import React from 'react'
import Logo from './Logo.webp'

function Header() {
  return (
   <>
    <div>
        <header/>
        <div className='flex items-center bg-blue-500' >
         <img src={Logo} className="App-logo rounded-full" alt="Logo" width={70}/>
         <h2 className='text-3xl font-bold p-3'>AITS</h2>
        </div>
    </div>
    
   </>
  )
}

export default Header
