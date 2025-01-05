import React from 'react'
import LogoSmartHosp from '../assets/SmartHospital-Logo2.png'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  ListChecks,
  UserPlus,
  LogIn,
  NotebookText,
  Send
} from 'lucide-react'

const Sidebar = () => {
  return (
    <div className='bg-green-800 w-64 text-gray-100 flex flex-col h-screen'>
      <div className='h-24 bg-green-900 flex items-center justify-center gap-1'>
        <img src={LogoSmartHosp} />
      </div>

      <nav className='flex-1 px-4 py-4 space-y-2'>
        <NavLink
          to={'/smarthosp-quest/'}
          end
          className={({ isActive }) =>
            isActive
              ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
              : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
          }
        >
          <LayoutDashboard className='mr-2' />
          Dashboard
        </NavLink>
        {/* <NavLink
          to={'results'}
          end
          className={({ isActive }) =>
            isActive
              ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
              : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
          }
        >
          <LayoutDashboard className='mr-2' />
          ประกาศผล
        </NavLink> */}
        <NavLink
          to={'register'}
          className={({ isActive }) =>
            isActive
              ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
              : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
          }
        >
          <UserPlus className='mr-2' />
          ลงทะเบียนใช้งาน
        </NavLink>
        <NavLink
          to={'login'}
          className={({ isActive }) =>
            isActive
              ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
              : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
          }
        >
          <LogIn className='mr-2' />
          เข้าสู่ระบบ
        </NavLink>
        <NavLink
          to={'contact-us'}
          className={({ isActive }) =>
            isActive
              ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
              : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
          }
        >
          <Send className='mr-2' />
          ติดต่อเรา
        </NavLink>

      </nav>
    </div>
  )
}

export default Sidebar