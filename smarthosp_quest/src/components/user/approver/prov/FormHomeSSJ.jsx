import React, { useEffect, useState } from 'react'
import useGlobalStore from '../../../../store/global-store'
import { useNavigate } from 'react-router-dom'
import { Hospital, UserPlus, Users } from 'lucide-react'
import { getHospitalOnProv } from '../../../../api/Hospital'
import { getListEvaluateByProv } from '../../../../api/Evaluate'
import { sumApproveUserOnProv, sumNotApproveUserOnProv } from '../../../../api/User'

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
        console.log('Hosp: ',res.data)
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
    await sumApproveUserOnProv(token, province)
      .then(res => {
        setIsApproveUser(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadSumNotApproveUser = async () => {
    await sumNotApproveUserOnProv(token, province)
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