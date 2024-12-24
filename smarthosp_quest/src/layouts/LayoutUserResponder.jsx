import React from 'react'
import SidebarUserResponder from '../components/user/responder/SidebarUserResponder'
import HeaderUserResponder from '../components/user/responder/HeaderUserResponder'
import { Outlet } from 'react-router-dom'

const LayoutUserResponder = () => {
  return (
    <div className='flex h-screen'>
      <SidebarUserResponder />
      <div className='flex-1 flex flex-col'>
        <HeaderUserResponder />
        <main className='flex-1 p-6 bg-gray-100 overflow-y-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default LayoutUserResponder