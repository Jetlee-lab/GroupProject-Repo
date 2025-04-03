import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';
import {Link} from 'react-router-dom';
import SideBarItem from './SideBarItem'

const SideBar = () => {
  return (
    <>
      <div className='bg-green-100 border-r-2 border-b-2 rounded border-blue-600 overflow-y-auto row-start-2'>  
      
      <Link to="/"><SideBarItem Icon={HomeIcon} text={'Home'}/></Link>
      <Link to="/registrar-reports"><SideBarItem Icon={AssignmentIcon} text={'Reports'}/></Link>
      <Link to="/notifications"><SideBarItem Icon={NotificationsIcon} text={'Notifications'}/></Link>
      <Link to="/settings"><SideBarItem Icon={SettingsIcon} text={'Settings'}/></Link>
      <Link to="/help"><SideBarItem Icon={HelpIcon} text={'Help & Support'}/></Link>
      <Link to="/logout"><SideBarItem Icon={LogoutIcon} text={'Logout'}/></Link>

      </div>
    </>
  )
}

export default SideBar
