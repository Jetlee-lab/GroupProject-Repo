import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AssessmentIcon from '@mui/icons-material/Assessment';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';

import Sidebaritem from './Sidebaritem'
function Sidebar() {
  return (
    <>
    
    <div className='bg-green-300 h-screen text-white w-60'>
        <Sidebaritem Icon={HomeIcon} text={'Home'} />
        <Sidebaritem Icon={DashboardIcon} text={'Dashboard'} />
        <Sidebaritem Icon={NotificationsIcon} text={'Notifications'} />
        <Sidebaritem Icon={AssessmentIcon} text={'Assessments'} />
        <Sidebaritem Icon={HelpIcon} text={'Help'} />
        <Sidebaritem Icon={LogoutIcon} text={'Logout'} />      
        
    </div>
    </>
  )
}

export default Sidebar


