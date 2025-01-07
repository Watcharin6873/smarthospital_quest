import React, { useEffect, useState } from 'react'
import Gem from '../../assets/gem-icons.png'
import Gold from '../../assets/Gold2.png'
import Silver from '../../assets/Silver2.png'
import { Blocks, HandPlatter, MonitorCog, UserRound } from 'lucide-react'
import useGlobalStore from '../../store/global-store'
import { getCyberImageData, sumEvaluateByHosp } from '../../api/Evaluate'
import { ArrowUpOutlined } from '@ant-design/icons'


const HomeUsers = () => {
  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)
  const [listPoint, setListPoint] = useState([])
  const [cyberData, setCyberData] = useState({
    cyber_level: "",
    cyber_image: "",
    usersId: "",
    hcode: ""
  })


  useEffect(() => {
    loadListPoint(token)
    loadCyberImageData(token)
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

  const loadCyberImageData = async () => {
    await getCyberImageData(token, user.hcode)
      .then(res => {
        setCyberData(res.data)
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



  const sumTotalPoint = listPoint.reduce((a, v) => a + Number(v.total_point), 0)
  const sumRequirePoint = listPoint.reduce((a, v) => a + Number(v.require_point), 0)

  const initialPoint = 800
  const initialRequirePoint = 510
  const initialCyber = 'Green'

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
        {/* <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex justify-center items-center gap-2'>
            <p className='text-2xl text-green-700 font-bold'>คะแนนที่ได้อยู่ในระดับ</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3'>
            {
              sumTotalPoint < 600
                ? <p className='text-4xl font-bold text-red-500'>ไม่ผ่าน!</p>
                : sumTotalPoint >= 600 && sumTotalPoint < 700
                  ? <p className='text-4xl font-bold text-slate-400'>เงิน</p>
                  : sumTotalPoint >= 700 && sumTotalPoint < 800 && sumRequirePoint < 510
                    ? <p className='text-4xl font-bold text-slate-400'>เงิน</p>
                    : sumTotalPoint >= 700 && sumTotalPoint < 800 && sumRequirePoint == 510
                      ? <p className='text-4xl font-bold text-yellow-600'>ทอง</p>
                      : sumTotalPoint >= 800 && sumRequirePoint < 510 && cyberData.cyber_level == 'Green'
                        ? <p className='text-4xl font-bold text-slate-400'>เงิน</p>
                        : sumTotalPoint >= 800 && sumRequirePoint == 510 && cyberData.cyber_level != 'Green'
                          ? <p className='text-4xl font-bold text-yellow-600'>ทอง</p>
                          : sumTotalPoint >= 800 && sumRequirePoint == 510 && cyberData.cyber_level == 'Green'
                            ? <p className='text-4xl font-bold text-orange-400'>เพชร</p>
                            : null

            }
          </div>
          <div className='p-2 flex justify-between'>
            <div className='text-slate-400'><p>คะแนนเต็มรวม</p></div>
            <div className='flex text-green-700'>
              {
                sumTotalPoint < 600
                  ?<p className='text-red-500'>{sumTotalPoint}</p>
                  : sumTotalPoint >= 600 && sumTotalPoint < 700
                    ? <p className='text-slate-400'>{sumTotalPoint}</p>
                    : sumTotalPoint >= 700 && sumTotalPoint < 800
                      ? <p className='text-yellow-600'>{sumTotalPoint}</p>
                      : sumTotalPoint >= 800
                        ? <p className='text-green-700'>{sumTotalPoint}</p>
                        : null

              }
            </div>
          </div>
          <div className='p-2 flex justify-between'>
            <div className='text-slate-400'><p>คะแนนจำเป็นรวม</p></div>
            <div className='flex text-green-700'>
              {
                sumRequirePoint < 510
                  ? <p className='text-red-500'>{sumRequirePoint}</p>
                  : <p className='text-green-700'>{sumRequirePoint}</p>
              }
            </div>
          </div>
          <div className='p-2 flex justify-between'>
            <div className='text-slate-400'><p>ระดับ Cyber security</p></div>
            <div className='flex text-green-700'>
              {
                cyberData.cyber_level === 'Green'
                  ? <p className='text-green-700'>เขียว</p>
                  : cyberData.cyber_level === 'Yellow'
                    ? <p className='text-yellow-400'>เหลือง</p>
                    : cyberData.cyber_level === 'Red'
                      ? <p className='text-red-500'>แดง</p>
                      : null


              }
            </div>
          </div>
        </div> */}
      </div>

    </div>
  )
}

export default HomeUsers