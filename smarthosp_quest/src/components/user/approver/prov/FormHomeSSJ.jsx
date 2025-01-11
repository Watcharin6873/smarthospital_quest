import React, { useEffect, useState } from 'react'
import useGlobalStore from '../../../../store/global-store'
import Gem from '../../../../assets/Blue-gem.png'
import Gold from '../../../../assets/Gold2.png'
import Silver from '../../../../assets/Silver2.png'
import HospitalIcon from '../../../../assets/Hospital.png'
import { useNavigate } from 'react-router-dom'
import { Hospital, UserPlus, Users } from 'lucide-react'
import { getHospitalOnProv } from '../../../../api/Hospital'
import { getListEvaluateByProv } from '../../../../api/Evaluate'
import { approveUserOnProv, notApproveUserOnProv } from '../../../../api/User'
import { ArrowUpOutlined } from '@ant-design/icons'

const FormHomeSSJ = () => {

  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [listHospital, setListHospital] = useState([])
  const [listEvaluateByProv, setListEvaluateByHosp] = useState([])
  const [isApproveUser, setIsApproveUser] = useState([])
  const [isNotApproveUser, setIsNotApproveUser] = useState([])

  const province = user.province

  useEffect(() => {
    loadListHospital(token)
    loadListEvaluateByProv(token)
    loadSumApproveUser(token)
    loadSumNotApproveUser(token)
  }, [])

  const loadListHospital = async () => {
    await getHospitalOnProv(token, province)
      .then(res => {
        console.log('Hosp: ', res.data)
        setListHospital(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadListEvaluateByProv = async () => {
    await getListEvaluateByProv(token, province)
      .then(res => {
        console.log(res.data)
        setListEvaluateByHosp(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadSumApproveUser = async () => {
    await approveUserOnProv(token, province)
      .then(res => {
        setIsApproveUser(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadSumNotApproveUser = async () => {
    await notApproveUserOnProv(token, province)
      .then(res => {
        setIsNotApproveUser(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>

      <div className='grid grid-cols-4 gap-4'>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <img
              className='bg-amber-50 w-12 rounded-full shadow-md'
              src={Gem}
              alt='Gem'
            />
            <p className='text-2xl text-green-700 font-bold'>ระดับเพชร</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3'>
            <p className='text-4xl'>0</p>
            <p>รพ.</p>
          </div>
          <div className='p-2 flex justify-between'>
            <div className='text-slate-400'><p>จำนวนทั้งหมด</p></div>
            <div className='flex text-green-700'><p>0.0 % </p><ArrowUpOutlined /></div>
          </div>
        </div>
        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <img
              className='bg-amber-50 w-12 rounded-full shadow-md'
              src={Gold}
              alt='Gold'
            />
            <p className='text-2xl text-green-700 font-bold'>ระดับทอง</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3'>
            <p className='text-4xl'>0</p>
            <p>รพ.</p>
          </div>
          <div className='p-2 flex justify-between'>
            <div className='text-slate-400'><p>จำนวนทั้งหมด</p></div>
            <div className='flex text-green-700'><p>0.0 % </p><ArrowUpOutlined /></div>
          </div>
        </div>
        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <img
              className='bg-amber-50 w-12 rounded-full shadow-md'
              src={Silver}
              alt='Silver'
            />
            <p className='text-2xl text-green-700 font-bold'>ระดับเงิน</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3'>
            <p className='text-4xl'>0</p>
            <p>รพ.</p>
          </div>
          <div className='p-2 flex justify-between'>
            <div className='text-slate-400'><p>จำนวนทั้งหมด</p></div>
            <div className='flex text-green-700'><p>0.0 % </p><ArrowUpOutlined /></div>
          </div>
        </div>
        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <img
              className='bg-amber-50 w-12 rounded-full shadow-md'
              src={HospitalIcon}
              alt='HospitalIcon'
            />
            <p className='text-2xl text-green-700 font-bold'>รพ.ทั้งหมด</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3'>
            <p className='text-4xl'>0/{listHospital.length}</p>
            <p>รพ.</p>
          </div>
          <div className='p-2 flex justify-between'>
            <div className='text-slate-400'><p>จำนวนทั้งหมด</p></div>
            <div className='flex text-green-700'><p>0.0 % </p><ArrowUpOutlined /></div>
          </div>
        </div>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex justify-center gap-2'>
            <Hospital /><p className='text-green-800'>หน่วยงานที่ประเมินด้านโครงสร้าง</p>
          </div>
          <div className='flex justify-center items-baseline gap-1 p-3'>
            <p className='text-4xl'>0 /</p>
            <p className='text-4xl'>{listHospital.length}</p>
            <p className='text-xs'>รพ.</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 text-blue-800'>
            <p>อนุมัติแล้ว</p>
            <p>0</p>
            <p>รพ.</p>
          </div>
        </div>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex justify-center gap-2'>
            <Hospital /><p className='text-green-800'>หน่วยงานที่ประเมินด้านบริหารจัดการ</p>
          </div>
          <div className='flex justify-center items-baseline gap-1 p-3'>
            <p className='text-4xl'>0 /</p>
            <p className='text-4xl'>{listHospital.length}</p>
            <p className='text-xs'>รพ.</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 text-blue-800'>
            <p>อนุมัติแล้ว</p>
            <p>0</p>
            <p>รพ.</p>
          </div>
        </div>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex justify-center gap-2'>
            <Hospital /><p className='text-green-800'>หน่วยงานที่ประเมินด้านการบริการ</p>
          </div>
          <div className='flex justify-center items-baseline gap-1 p-3'>
            <p className='text-4xl'>0 /</p>
            <p className='text-4xl'>{listHospital.length}</p>
            <p className='text-xs'>รพ.</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 text-blue-800'>
            <p>อนุมัติแล้ว</p>
            <p>0</p>
            <p>รพ.</p>
          </div>
        </div>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex justify-center gap-2'>
            <Hospital /><p className='text-green-800'>หน่วยงานที่ประเมินด้านบุคลากร</p>
          </div>
          <div className='flex justify-center items-baseline gap-1 p-3'>
            <p className='text-4xl'>0 /</p>
            <p className='text-4xl'>{listHospital.length}</p>
            <p className='text-xs'>รพ.</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 text-blue-800'>
            <p>อนุมัติแล้ว</p>
            <p>0</p>
            <p>รพ.</p>
          </div>
        </div>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex justify-center gap-2'>
            <UserPlus /><p className='text-green-800'>ผู้ประเมินรายใหม่ที่ยังไม่อนุมัติ</p>
          </div>
          <div className='flex justify-center items-baseline gap-1 p-3'>
            <p className='text-4xl'>{isNotApproveUser.length}</p>
            <p className='text-xs'>ราย</p>
          </div>
        </div>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex justify-center gap-2'>
            <Users /><p className='text-green-800'>ผู้ประเมินรายใหม่ที่อนุมัติแล้ว</p>
          </div>
          <div className='flex justify-center items-baseline gap-1 p-3'>
            <p className='text-4xl'>{isApproveUser.length}</p>
            <p className='text-xs'>ราย</p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default FormHomeSSJ