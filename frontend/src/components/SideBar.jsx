import React from 'react'
import SideBarItem from './SideBarItem';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from  '@mui/icons-material/Dashboard';
import AssignmentIcon from  '@mui/icons-material/Assignment';
import NotificationsIcon from  '@mui/icons-material/Notifications';
import TextSnippetIcon from  '@mui/icons-material/TextSnippet';
import SettingsIcon from  '@mui/icons-material/Settings';
import LogoutIcon from  '@mui/icons-material/Logout';
import HelpIcon from  '@mui/icons-material/Help';



function SideBar() {
  return (
    <>
     <div className='bg-green-100 w-60 h-screen'>
     <SideBarItem Icon={HomeIcon} text={'Home'}/>
     <SideBarItem Icon={DashboardIcon} text={'Dashboard'}/>
     <SideBarItem Icon={AssignmentIcon} text={'Issues'}/>
     <SideBarItem Icon={NotificationsIcon} text={'Notifications'}/>
     <SideBarItem Icon={TextSnippetIcon} text={'Reports'}/>
     <SideBarItem Icon={SettingsIcon} text={'Settings'}/>
     <SideBarItem Icon={LogoutIcon} text={'Logout'}/>
     <SideBarItem Icon={HelpIcon} text={'Help'}/>

     </div>
    </>
  )
}

export default SideBar