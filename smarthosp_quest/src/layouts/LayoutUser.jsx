import React from 'react'
import SidebarUser from '../components/user/SidebarUser'
import HeaderUser from '../components/user/HeaderUser'
import { Outlet } from 'react-router-dom'

const LayoutUser = () => {
  return (
    <div className='flex h-screen'>
      <SidebarUser />
      <div className='flex-1 flex flex-col'>
        <HeaderUser />
        <main className='flex-1 p-6 bg-gray-100 overflow-y-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default LayoutUser