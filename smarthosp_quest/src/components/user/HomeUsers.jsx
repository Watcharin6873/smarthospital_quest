import React, { useEffect, useState } from 'react'
import { Blocks, HandPlatter, MonitorCog, UserRound } from 'lucide-react'
import useGlobalStore from '../../store/global-store'
import { sumEvaluateByHosp } from '../../api/Evaluate'


const HomeUsers = () => {
  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)

  const [listPoint, setListPoint] = useState([])


  useEffect(() => {
    loadListPoint(token)
  }, [])
  const hcode = user.hcode
  const loadListPoint = async () => {
    await sumEvaluateByHosp(token, hcode)
      .then(res => {
        setListPoint(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const dataSource = listPoint.map((item) => ({ ...item }))

  const infraScore = dataSource.filter((item) => item.category_questId === 1)
  const manageScore = dataSource.filter((item) => item.category_questId === 2)
  const serviceScore = dataSource.filter((item) => item.category_questId === 3)
  const peopleScore = dataSource.filter((item) => item.category_questId === 4)

  console.log(listPoint)

  return (
    <div>

      <div className='grid grid-cols-4 gap-4'>
        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <div className='w-12 h-12 bg-amber-50 rounded-full shadow-md flex justify-center items-center'>
              <Blocks className='text-green-700' size={30} />
            </div>
            <p className='text-2xl text-green-700 font-bold'>ด้านโครงสร้าง</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3'>
            <div className='w-36 text-center border rounded-md p-5'>
              <p className=''>คะแนนเต็ม</p>
              {
                infraScore.map((item4) => (
                  item4.total_point === null
                    ? <p className='text-2xl text-blue-700'>0/300</p>
                    : <p className='text-2xl text-blue-700'>{item4.total_point}/300</p>
                ))
              }
              {
                infraScore.map((item4) => (
                  <p className='text-sm mt-2'>คิดเป็น {(item4.total_point / 300 * 100).toFixed(1)} %</p>
                ))
              }
            </div>
            <div className='w-36 text-center border rounded-md p-5'>
              <p className=''>คะแนนจำเป็น</p>
              {
                infraScore.map((item) => (
                  item.require_point === null
                    ? <p className='text-2xl text-green-700'>0/170</p>
                    : <p className='text-2xl text-green-700'>{item.require_point}/170</p>
                ))
              }
              {
                infraScore.map((item4) => (
                  <p className='text-sm mt-2'>คิดเป็น {(item4.require_point / 170 * 100).toFixed(1)} %</p>
                ))
              }
            </div>
          </div>
        </div>
        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <div className='w-12 h-12 bg-amber-50 rounded-full shadow-md flex justify-center items-center'>
              <MonitorCog className='text-green-700' size={30} />
            </div>
            <p className='text-2xl text-green-700 font-bold'>ด้านบริหารจัดการ</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3'>
            <div className='w-36 text-center border rounded-md p-5'>
              <p className=''>คะแนนเต็ม</p>
              {
                manageScore.map((item4) => (
                  item4.total_point === null
                    ? <p className='text-2xl text-blue-700'>0/300</p>
                    : <p className='text-2xl text-blue-700'>{item4.total_point}/300</p>
                ))
              }
              {
                manageScore.map((item4) => (
                  <p className='text-sm mt-2'>คิดเป็น {(item4.total_point / 300 * 100).toFixed(1)} %</p>
                ))
              }
            </div>
            <div className='w-36 text-center border rounded-md p-5'>
              <p className=''>คะแนนจำเป็น</p>
              {
                manageScore.map((item) => (
                  item.require_point === null
                    ? <p className='text-2xl text-green-700'>0/170</p>
                    : <p className='text-2xl text-green-700'>{item.require_point}/170</p>
                ))
              }
              {
                manageScore.map((item4) => (
                  <p className='text-sm mt-2'>คิดเป็น {(item4.require_point / 170 * 100).toFixed(1)} %</p>
                ))
              }
            </div>
          </div>
        </div>
        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <div className='w-12 h-12 bg-amber-50 rounded-full shadow-md flex justify-center items-center'>
              <HandPlatter className='text-green-700' size={30} />
            </div>
            <p className='text-2xl text-green-700 font-bold'>ด้านการบริการ</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3'>
            <div className='w-36 text-center border rounded-md p-5'>
              <p className=''>คะแนนเต็ม</p>
              {
                serviceScore.map((item4) => (
                  item4.total_point === null
                    ? <p className='text-2xl text-blue-700'>0/300</p>
                    : <p className='text-2xl text-blue-700'>{item4.total_point}/300</p>
                ))
              }
              {
                serviceScore.map((item4) => (
                  <p className='text-sm mt-2'>คิดเป็น {(item4.total_point / 300 * 100).toFixed(1)} %</p>
                ))
              }
            </div>
            <div className='w-36 text-center border rounded-md p-5'>
              <p className=''>คะแนนจำเป็น</p>
              {
                serviceScore.map((item) => (
                  item.require_point === null
                    ? <p className='text-2xl text-green-700'>0/170</p>
                    : <p className='text-2xl text-green-700'>{item.require_point}/170</p>
                ))
              }
              {
                serviceScore.map((item4) => (
                  <p className='text-sm mt-2'>คิดเป็น {(item4.require_point / 170 * 100).toFixed(1)} %</p>
                ))
              }
            </div>
          </div>
        </div>
        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <div className='w-12 h-12 bg-amber-50 rounded-full shadow-md flex justify-center items-center'>
              <UserRound className='text-green-700' size={30} />
            </div>
            <p className='text-2xl text-green-700 font-bold'>ด้านบุคลากร</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3'>
            <div className='w-36 text-center border rounded-md p-5'>
              <p className=''>คะแนนเต็ม</p>
              {
                peopleScore.map((item4) => (
                  item4.total_point === null
                    ? <p className='text-2xl text-blue-700'>0/100</p>
                    : <p className='text-2xl text-blue-700'>{item4.total_point}/100</p>
                ))
              }
              {
                peopleScore.map((item4) => (
                  <p className='text-sm mt-2'>คิดเป็น {(item4.total_point / 100 * 100).toFixed(1)} %</p>
                ))
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HomeUsers