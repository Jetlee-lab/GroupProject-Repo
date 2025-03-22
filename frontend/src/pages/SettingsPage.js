import React, { useState } from 'react';

const SettingsPage = ({darkMode, toggleTheme}) => {
  const [notifications, setNotifications] = useState(true);


  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  return (
    <div className={`p-10 w-full h-screen transition-all ${darkMode ? 'bg-gray-900 text-white' : 'bg-blue-100 text-black'}`}>
      <h1 className='text-4xl font-bold mb-6'>Settings</h1>
      
      {/* Theme Toggle */}
      <div className='mb-4'>
        <label className='flex items-center cursor-pointer'>
          <input type='checkbox' className='hidden' checked={darkMode} onChange={toggleTheme} />
          <div className='relative w-12 h-6 bg-gray-300 rounded-full shadow-inner'>
            <div className={`absolute w-6 h-6 bg-white rounded-full shadow-md transition-transform ${darkMode ? 'translate-x-6' : ''}`}></div>
          </div>
          <span className='ml-3 text-lg'>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
        </label>
      </div>
      
      {/* Notification Toggle */}
      <div className='mb-4'>
        <label className='flex items-center cursor-pointer'>
          <input type='checkbox' className='hidden' checked={notifications} onChange={toggleNotifications} />
          <div className='relative w-12 h-6 bg-gray-300 rounded-full shadow-inner'>
            <div className={`absolute w-6 h-6 bg-white rounded-full shadow-md transition-transform ${notifications ? 'translate-x-6' : ''}`}></div>
          </div>
          <span className='ml-3 text-lg'>{notifications ? 'Notifications On' : 'Notifications Off'}</span>
        </label>
      </div>
      
      {/* Change Password */}
      <div className='mt-6'>
        <h2 className='text-2xl font-semibold mb-2'>Change Password</h2>
        <input type='password' required placeholder='Current Password' className='w-full p-2 border rounded mb-2' />
        <input type='password' required placeholder='New Password' className='w-full p-2 border rounded mb-2' />
        <input type='password' required placeholder='Confirm New Password' className='w-full p-2 border rounded mb-2' />
        <button className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>Update Password</button>
      </div>
    </div>
  );
};

export default SettingsPage;