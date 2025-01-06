import React from 'react'
import LogoMOPH from '../../../assets/Logo_MOPH.png'
import LogoSmartHosp from '../../../assets/SmartHospital-Logo2.png'
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
    Monitor,
    MonitorCheck,
    ShieldCheck
} from 'lucide-react'
import useGlobalStore from '../../../store/global-store'
import { ExclamationCircleFilled } from '@ant-design/icons'

const { confirm } = Modal



const SidebarUserResponder = () => {

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
                    to={'/smarthosp-quest/user/responder'}
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
                    to={'evaluate-infrastructure'}
                    className={({ isActive }) =>
                        isActive
                            ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
                            : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                    }
                >
                    <ListChecks className='mr-2' />
                    ประเมินด้านโครงสร้าง
                </NavLink>
                <NavLink
                    to={'evaluate-management'}
                    className={({ isActive }) =>
                        isActive
                            ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
                            : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                    }
                >
                    <ListChecks className='mr-2' />
                    ประเมินด้านบริหารจัดการ
                </NavLink>
                <NavLink
                    to={'evaluate-service'}
                    className={({ isActive }) =>
                        isActive
                            ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
                            : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                    }
                >
                    <ListChecks className='mr-2' />
                    ประเมินด้านการบริการ
                </NavLink>
                <NavLink
                    to={'evaluate-people'}
                    className={({ isActive }) =>
                        isActive
                            ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
                            : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                    }
                >
                    <ListChecks className='mr-2' />
                    ประเมินด้านบุคลากร
                </NavLink>
                <NavLink
                    to={'cyber-check'}
                    className={({ isActive }) =>
                        isActive
                            ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
                            : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                    }
                >
                    <ShieldCheck className='mr-2' />
                    ระดับ Cyber Security ศทส.
                </NavLink>
                <NavLink
                    to={'report-hosp'}
                    className={({ isActive }) =>
                        isActive
                            ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
                            : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                    }
                >
                    <MonitorCheck className='mr-2' />
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

export default SidebarUserResponder