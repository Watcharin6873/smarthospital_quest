import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGlobalStore from '../../../../store/global-store'
import { Hospital, UserPlus, Users } from 'lucide-react'
import { getListHospitalOnZone } from '../../../../api/Hospital'
import { getListEvaluateByZone } from '../../../../api/Evaluate'
import { approveUserOnZone, notApproveUserOnZone } from '../../../../api/User'

const FormHomeZone = () => {

  const navigate = useNavigate()
  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)

  const [isLoading, setIsLoading] = useState(false)
  const [listHospitalOfZone, setListHospitalOfZone] = useState([])
  const [listEvaluateByZone, setListEvaluateByZone] = useState([])
  const [isApproveUser, setIsApproveUser] = useState([])
  const [isNotApproveUser, setIsNotApproveUser] = useState([])


  const zone = user.zone

  useEffect(() => {
    loadListHospitalOfZone(token)
    loadListEvaluateByZone(token)
    loadApproveUser(token)
    loadNotApproveUser(token)
  }, [])

  const loadListHospitalOfZone = async () => {
    await getListHospitalOnZone(token, zone)
      .then(res => {
        setListHospitalOfZone(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadListEvaluateByZone = async () => {
    await getListEvaluateByZone(token, zone)
      .then(res => {
        setListEvaluateByZone(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const dataSource = listEvaluateByZone.map((item) => ({
    id: item.id,
    category_questId: item.category_questId,
    questId: item.questId,
    sub_questId: item.sub_questId,
    quest_name: item.quests.quest_name,
    sub_quest_name: item.sub_quests.sub_quest_name,
    sub_quest_list: item.sub_quests.sub_quest_lists,
    check: item.check,
    file_name: item.file_name,
    ssj_approve: item.ssj_approve,
    zone_approve: item.zone_approve,
    hcode: item.hcode,
    hname_th: item.hospitals.hname_th,
    provcode: item.hospitals.provcode,
    provname: item.hospitals.provname,
    users_id: item.userId,
    users_firstname_th: item.users.firstname_th,
    users_lastname_th: item.users.lastname_th,
  }))

  console.log("Data: ", dataSource)

  const loadApproveUser = async () => {
    await approveUserOnZone(token, zone)
      .then(res => {
        setIsApproveUser(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadNotApproveUser = async () => {
    await notApproveUserOnZone(token, zone)
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
            <p className='text-4xl'>{listHospitalOfZone.length}</p>
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
            <p className='text-4xl'>{listHospitalOfZone.length}</p>
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
            <p className='text-4xl'>{listHospitalOfZone.length}</p>
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
            <p className='text-4xl'>{listHospitalOfZone.length}</p>
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
            <UserPlus /><p className='text-green-800'>คกก.สสจ.ที่ยังไม่อนุมัติ</p>
          </div>
          <div className='flex justify-center items-baseline gap-1 p-3'>
            <p className='text-4xl'>{isNotApproveUser.length}</p>
            <p className='text-xs'>ราย</p>
          </div>
        </div>
        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex justify-center gap-2'>
            <Users /><p className='text-green-800'>คกก.สสจ.ที่อนุมัติแล้ว</p>
          </div>
          <div className='flex justify-center items-baseline gap-1 p-3'>
            <p className='text-4xl'>{isApproveUser.length}</p>
            <p className='text-xs'>ราย</p>
          </div>
        </div>
        {/* <div className='bg-white rounded-md shadow-md p-3'>

        </div>
        <div className='bg-white rounded-md shadow-md p-3'>

        </div> */}
      </div>
    </div>
  )
}

export default FormHomeZone