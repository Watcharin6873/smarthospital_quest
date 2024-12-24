import React from 'react'
import HeaderZoneApprover from '../components/user/approver/zone/HeaderZoneApprover'
import SidebarZoneApprover from '../components/user/approver/zone/SidebarZoneApprover'
import { Outlet } from 'react-router-dom'

const LayoutZoneApprover = () => {
  return (
    <div className='flex h-screen'>
      <SidebarZoneApprover />
      <div className='flex-1 flex flex-col'>
        <HeaderZoneApprover />
        <main className='flex-1 p-6 bg-gray-100 overflow-y-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default LayoutZoneApprover