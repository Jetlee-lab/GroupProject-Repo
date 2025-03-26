import React from 'react'

function SideBarItem({Icon,text}) {
  return (
    <div>
        <div className='flex items-center p-4 mb-2 hover:bg-blue-400 cursor-pointer'>
            <div className='Icon'>
                <Icon/>
            </div>

            <p className='font-semibold text-xl ml-4'>{text }</p>
        </div>
    </div>
  )
}

export default SideBarItem
