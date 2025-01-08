import React from 'react'
import LogoMOPH from '../../assets/Logo_MOPH.png'
import LogoSmartHosp from '../../assets/SmartHospital-Logo2.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { Modal } from 'antd'
import {
  LayoutDashboard,
  UserPen, Send, LogOut,
  FolderCog, FileCog, Monitor
} from 'lucide-react'
import useGlobalStore from '../../store/global-store'
import { ExclamationCircleFilled } from '@ant-design/icons'

const { confirm } = Modal

const SidebarAdmin = () => {

  const logout = useGlobalStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    //Code
    confirm({
      title: 'คุณต้องการออกจากระบบหรือไม่?',
      icon: <ExclamationCircleFilled />,
      content: '',
      onOk() {
        logout()
        navigate("/smarthosp-quest/")
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  }


  return (
    <div className='bg-green-800 w-64 text-gray-100 flex flex-col h-screen'>
      <div className='h-24 bg-green-900 flex items-center justify-center gap-1'>
        <div>
          <img src={LogoSmartHosp} />
        </div>
      </div>

      <nav className='flex-1 px-4 py-4 space-y-2'>
        <NavLink
          to={'/smarthosp-quest/admin'}
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
        <NavLink
          to={'manage-user'}
          className={({ isActive }) =>
            isActive
              ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
              : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
          }
        >
          <UserPen className='mr-2' />
          จัดการข้อมูลผู้ใช้งาน (เขตฯ)
        </NavLink>
        <NavLink
          to={'manage-topic'}
          className={({ isActive }) =>
            isActive
              ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
              : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
          }
        >
          <FolderCog className='mr-2' />
          จัดการข้อมูลด้านการประเมิน
        </NavLink>
        <NavLink
          to={'manage-quest'}
          className={({ isActive }) =>
            isActive
              ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
              : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
          }
        >
          <FileCog className='mr-2' />
          จัดการข้อมูลเกณฑ์หลัก
        </NavLink>
        <NavLink
          to={'manage-sub-quest'}
          className={({ isActive }) =>
            isActive
              ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
              : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
          }
        >
          <FileCog className='mr-2' />
          จัดการข้อมูลเกณฑ์ย่อย
        </NavLink>
        <NavLink
          to={'report-centre'}
          className={({ isActive }) =>
            isActive
              ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
              : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
          }
        >
          <Monitor className='mr-2' />
          รายงานผลการประเมิน
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

      <footer className='px-4 py-4 space-y-2'>
        <NavLink
          onClick={handleLogout}
          className='text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
        >
          <LogOut className='mr-2' />
          Logout
        </NavLink>
      </footer>
    </div>
  )
}

export default SidebarAdmin