import React, { useEffect, useState } from 'react'
import UseTitle from '../utills/UseTitle'
import Gem from '../assets/gem-icons.png'
import Gold from '../assets/Gold2.png'
import Silver from '../assets/Silver2.png'
import HospitalIcon from '../assets/Hospital.png'
import The_Best from '../assets/The_Best.png'
import { ArrowUpOutlined } from '@ant-design/icons'
import { getListHospitalAll } from '../api/Hospital'
import { getListEvaluateAll } from '../api/Evaluate'
import { Hospital } from 'lucide-react'

const Home = () => {

  UseTitle('Dashboard')
  const [listHospitalAll, setListHospitalAll] = useState([])
  const [listEvaluateAll, setListEvaluateAll] = useState([])
  const [expandedRows, setExpandedRows] = useState(null)

  useEffect(() => {
    loadListHospitalAll()
    loadListEvaluateAll()
  }, [])


  const loadListHospitalAll = async () => {
    await getListHospitalAll()
      .then(res => {
        setListHospitalAll(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadListEvaluateAll = async () => {
    await getListEvaluateAll()
      .then(res => {
        setListEvaluateAll(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const zoneData = [...new Map(listHospitalAll.map(item=>[item['zone'], item])).values()]

  const dataSource = listEvaluateAll.map((item) => ({
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

  const handleExpandedRow = (e) => {
    console.log('Value: ', e)
    var currentExpandedRows = null;
    const isRowExpanded = currentExpandedRows === e ? e : null;
    const newExpandedRows = isRowExpanded
      ? null
      : (currentExpandedRows = e);
    if (expandedRows !== e) {
      setExpandedRows(newExpandedRows);
    } else {
      setExpandedRows(null);
    }
  }


  return (
    <div>
      {/* <div className='mb-3 text-center'>
        <p className='w-full h-6 text-2xl text-red-500'>***ระบบจะเปิดใช้งานหลังจากประชุมชี้แจงการใช้งานระบบประเมินโรงพยาบาลอัจฉริยะ ในวันที่ 7 มกราคม 2568***</p>
      </div> */}
      <div className='grid grid-cols-4 gap-4'>
        {/* <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <img
              className='bg-amber-50 w-12 rounded-full shadow-md'
              src={The_Best}
              alt='The_Best'
            />
            <p className='text-2xl text-green-700 font-bold'>The Best</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3'>
            <p className='text-4xl'>12</p>
            <p>รพ.</p>
          </div>
          <div className='p-2 flex justify-between'>
            <div className='text-slate-400'><p>จำนวนทั้งหมด</p></div>
            <div className='flex text-green-700'><p>1.33 % </p><ArrowUpOutlined /></div>
          </div>
        </div> */}
        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex justify-center gap-2'>
            <Hospital /><p className='text-xl text-green-800 font-bold'>ประเมินผลด้านโครงสร้าง</p>
          </div>
          <div className='flex justify-center items-baseline gap-1 p-3'>
            <p className='text-4xl'>0 /</p>
            <p className='text-4xl'>{listHospitalAll.length}</p>
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
            <Hospital /><p className='text-xl text-green-800 font-bold'>ประเมินผลด้านบริหารจัดการ</p>
          </div>
          <div className='flex justify-center items-baseline gap-1 p-3'>
            <p className='text-4xl'>0 /</p>
            <p className='text-4xl'>{listHospitalAll.length}</p>
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
            <Hospital /><p className='text-xl text-green-800 font-bold'>ประเมินผลด้านการบริการ</p>
          </div>
          <div className='flex justify-center items-baseline gap-1 p-3'>
            <p className='text-4xl'>0 /</p>
            <p className='text-4xl'>{listHospitalAll.length}</p>
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
            <Hospital /><p className='text-xl text-green-800 font-bold'>ประเมินผลด้านบุคลากร</p>
          </div>
          <div className='flex justify-center items-baseline gap-1 p-3'>
            <p className='text-4xl'>0 /</p>
            <p className='text-4xl'>{listHospitalAll.length}</p>
            <p className='text-xs'>รพ.</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 text-blue-800'>
            <p>อนุมัติแล้ว</p>
            <p>0</p>
            <p>รพ.</p>
          </div>
        </div>

      </div>

      <br />

      <div>
        <div className='col-span-2 bg-white rounded-md shadow-md p-2'>
          <div className='text-center p-2'>
            <p className='text-base font-bold text-green-800'>รายงานผลการอนุมัติการประเมินผลโรงพยาบาลอัจฉริยะ ปีงบประมาณ พ.ศ. 2568</p>
          </div>
          <table className='w-full table-fixed'>
            <thead>
              <tr className='bg-green-700 text-sm text-white'>
                <th className='border p-1'>เขตสุขภาพ</th>
                <th className='border p-1'>ด้านโครงสร้าง</th>
                <th className='border p-1'>ด้านบริหารจัดการ</th>
                <th className='border p-1'>ด้านการบริการ</th>
                <th className='border p-1'>ด้านบุคลากร</th>
              </tr>
            </thead>
            {
              zoneData.sort((a,b)=>(Number(a.zone) > Number(b.zone)) ? 1: -1).map((item1,k1)=>(
                <tbody className='text-sm'>
                  <tr className='cursor-pointer hover:bg-slate-50' key={k1}  onClick={() => handleExpandedRow(k1)}>
                    <td className='border text-slate-600 pl-3 p-1'><p>เขตสุขภาพที่ {Number(item1.zone)}</p></td>
                    <td className='border text-slate-600 text-center p-1'>
                      0
                    </td>
                    <td className='border text-slate-600 text-center p-1'>
                      0
                    </td>
                    <td className='border text-slate-600 text-center p-1'>
                      0
                    </td>
                    <td className='border text-slate-600 text-center p-1'>
                      0
                    </td>
                  </tr>
                  {expandedRows === k1 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className='text-center text-orange-500'
                      >
                        ส่วนนี้จะแสดงข้อมูลรายโรงพยาบาล! เขตสุขภาพที่ {item1.zone}
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              ))
            }
                
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home