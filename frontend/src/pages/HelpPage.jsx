import React from 'react';
import HelpHeader from '../components/HelpHeader';  
import UserGuide from '../components/UserGuide';
import FAQ from '../components/FAQ';
import ContactSupport from '../components/ContactSupport';    

const HelpPage = () => {
  return (
    <div className='p-10 w-full bg-blue-100 h-screen'>
      <HelpHeader />
      <UserGuide />
      <FAQ />       
       <ContactSupport />         
    </div>
  )
}

export default HelpPage;

