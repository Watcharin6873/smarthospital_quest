import React from 'react'
import LogoMOPH from '../../assets/Logo_MOPH.png'
import LogoSmartHosp from '../../assets/SmartHospital-Logo2.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { Modal } from 'antd'
import {
  LayoutDashboard,
  ListChecks,
  UserPlus,
  LogIn,
  NotebookText,
  Send,
  LogOut,
  BookCheck,
  ShieldCheck
} from 'lucide-react'
import useGlobalStore from '../../store/global-store'
import { ExclamationCircleFilled } from '@ant-design/icons'

const { confirm } = Modal

const SidebarUser = () => {

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
          to={'/smarthosp-quest/user'}
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
          to={'result-infrastructure'}
          className={({ isActive }) =>
            isActive
              ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
              : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
          }
        >
          <ListChecks className='mr-2' />
          ผลประเมินด้านโครงสร้าง
        </NavLink>
        <NavLink
          to={'result-management'}
          className={({ isActive }) =>
            isActive
              ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
              : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
          }
        >
          <ListChecks className='mr-2' />
          ผลประเมินด้านบริหารจัดการ
        </NavLink>
        <NavLink
          to={'result-service'}
          className={({ isActive }) =>
            isActive
              ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
              : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
          }
        >
          <ListChecks className='mr-2' />
          ผลประเมินด้านการบริหาร
        </NavLink>
        <NavLink
          to={'result-people'}
          className={({ isActive }) =>
            isActive
              ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
              : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
          }
        >
          <ListChecks className='mr-2' />
          ผลประเมินด้านบุคลากร
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

export default SidebarUser