import React from 'react'
import HeaderProvApprover from '../components/user/approver/prov/HeaderProvApprover'
import SidebarProvApprover from '../components/user/approver/prov/SidebarProvApprover'
import { Outlet } from 'react-router-dom'

const LayoutProvApprover = () => {
  return (
    <div className='flex h-screen'>
      <SidebarProvApprover />
      <div className='flex-1 flex flex-col'>
        <HeaderProvApprover />
        <main className='flex-1 p-6 bg-gray-100 overflow-y-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default LayoutProvApprover