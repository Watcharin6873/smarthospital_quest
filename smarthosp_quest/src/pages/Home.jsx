import React, { useState } from 'react'
import UseTitle from '../utills/UseTitle'
import Gem from '../assets/gem-icons.png'
import Gold from '../assets/Gold2.png'
import Silver from '../assets/Silver2.png'
import HospitalIcon from '../assets/Hospital.png'
import The_Best from '../assets/The_Best.png'
import { ArrowUpOutlined } from '@ant-design/icons'

const Home = () => {

  UseTitle('Dashboard')
  const [expandedRows, setExpandedRows] = useState(null)


  const dataSource = [
    { id: 1, zone: '1', gem: 0, gold: 0, silver: 0 },
    { id: 2, zone: '2', gem: 0, gold: 0, silver: 0 },
    { id: 3, zone: '3', gem: 0, gold: 0, silver: 0 },
    { id: 4, zone: '4', gem: 0, gold: 0, silver: 0 },
    { id: 5, zone: '5', gem: 0, gold: 0, silver: 0 },
    { id: 6, zone: '6', gem: 0, gold: 0, silver: 0 },
    { id: 7, zone: '7', gem: 0, gold: 0, silver: 0 },
    { id: 8, zone: '8', gem: 0, gold: 0, silver: 0 },
    { id: 9, zone: '9', gem: 0, gold: 0, silver: 0 },
    { id: 10, zone: '10', gem: 0, gold: 0, silver: 0 },
    { id: 11, zone: '11', gem: 0, gold: 0, silver: 0 },
    { id: 12, zone: '12', gem: 0, gold: 0, silver: 0 }
  ]

  const dataSorce2 = [
    { id: 1, typename: "โรงพยาบาลศูนย์", gem: 20, gold: 30, silver: 40 },
    { id: 2, typename: "โรงพยาบาลทั่วไป", gem: 20, gold: 30, silver: 40 },
    { id: 3, typename: "โรงพยาบาลขุมชน", gem: 20, gold: 30, silver: 40 },
  ]

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
      <div className='mb-3 text-center'>
        <p className='animate-bounce w-full h-6 text-2xl text-red-500'>***ระบบจะเปิดใช้งานในวันที่ 2 มกราคม 2568***</p>
      </div>
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
            <p className='text-4xl'>0/902</p>
            <p>รพ.</p>
          </div>
          <div className='p-2 flex justify-between'>
            <div className='text-slate-400'><p>จำนวนทั้งหมด</p></div>
            <div className='flex text-green-700'><p>0.0 % </p><ArrowUpOutlined /></div>
          </div>
        </div>
      </div>

      <br />

      <div>
        <div className='col-span-2 bg-white rounded-md shadow-md p-2'>
          <table className='w-full table-fixed'>
            <thead>
              <tr className='bg-green-700 text-md text-white'>
                <th className='border p-1'>เขตสุขภาพ</th>
                <th className='border p-1'>ระดับเพชร</th>
                <th className='border p-1'>ระดับทอง</th>
                <th className='border p-1'>ระดับเงิน</th>
              </tr>
            </thead>
            {
              dataSource.map((item1, k1) => (
                <tbody>
                  <tr className='cursor-pointer hover:bg-slate-50' key={k1} onClick={() => handleExpandedRow(k1)}>
                    <td className='border text-slate-600 pl-3 p-1'><p>เขตสุขภาพที่ {item1.zone}</p></td>
                    <td className='border text-slate-600 text-center p-1'>
                      {item1.gem}
                    </td>
                    <td className='border text-slate-600 text-center p-1'>
                      {item1.gold}
                    </td>
                    <td className='border text-slate-600 text-center p-1'>
                      {item1.silver}
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