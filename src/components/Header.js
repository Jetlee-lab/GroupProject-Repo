import React from 'react'
import logo from './Logo.webp'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
export default function header() {
  return (
    <> 
      <div className='flex items-center justify-between p-4 bg-blue-500 text-white shadow-2xl'>
        {/*Logo*/}
        <div className='flex items-center bg-blue-500'>
          <img src={logo} className="App-logo rounded-full" alt="logo" width={70} />
          <h2 className='font-bold p-2'>AITS</h2>
        </div>
      

        {/*Search bar*/}
        <input type="text" className='border-2 border-gray-300 p-2 w-64 rounded-3xl text-black outline-none' placeholder='Search'></input>

        {/*Message*/}
        <h1 className='text-3xl'>WELCOME TO AITS</h1>


        {/*Icons*/}
      <div>
        <CircleNotificationsIcon className='mx-2 cursor-pointer'/> 
        <AccountCircleIcon className='mx-2 cursor-pointer'/>
        <SettingsIcon className='mx-2 cursor-pointer'/>
      </div>

    
      </div>
    </>
  )
}
