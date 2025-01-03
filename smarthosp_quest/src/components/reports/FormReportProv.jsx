import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGlobalStore from '../../store/global-store'
import { getHospitalOnProv } from '../../api/Hospital'
import { Table } from 'antd'

const FormReportProv = () => {

  const navigate = useNavigate()
  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)

  const [isLoading, setIsLoading] = useState(false)
  const [listHospitals, setListHospitals] = useState([])
  const [listEvaluateByProv, setListEvaluateByProv] = useState([])
  const [expandedRows, setExpandedRows] = useState(null)

  const province = user.province

  useEffect(() => {
    loadListHospitals(token)
  }, [])

  const loadListHospitals = async () => {
    await getHospitalOnProv(token, province)
      .then(res => {
        console.log(res.data)
        setListHospitals(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

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
      <div className='text-center mb-3'>
        <p className='text-3xl text-green-900'>รายงานผลการประเมิน</p>
      </div>

      <div className='bg-white rounded-md shadow-md p-3'>
        <table className='w-full text-left table-fixed text-slate-800'>
          <thead>
            <tr className='text-md text-slate-500 border border-l border-r border-slate-300 bg-slate-50'>
              <th className='text-center p-4 border-r'>หน่วยบริการ</th>
              <th className='text-center p-4 border-r'>ที่อยู่</th>
              <th className='text-center p-4 border-r w-32'>เขตสุขภาพ</th>
              <th className='text-center p-4 border-r w-40'>ประเภท</th>
            </tr>
          </thead>
          {
            listHospitals.map((item1, k1) => (
              <tbody>
                <tr className='cursor-pointer hover:bg-slate-50' key={k1} onClick={() => handleExpandedRow(k1)}>
                  <td className='border p-1 text-stone-800'>
                    <div className='flex gap-1 pl-4'>
                      <p className='text-sm'>{item1.hname_th}</p>
                      <p className='text-sm'>[{item1.hcode}]</p>
                    </div>
                  </td>
                  <td className='border p-1 text-stone-800'>
                    <div className='flex gap-2 pl-4'>
                      <p className='text-sm'>ต.{item1.tmbname}</p>
                      <p className='text-sm'>อ.{item1.ampname}</p>
                      <p className='text-sm'>จ.{item1.provname}</p>
                    </div>
                  </td>
                  <td className='border text-center p-1 text-stone-800'>
                    <p className='text-sm'>{item1.zone}</p>
                  </td>
                  <td className='border text-center p-1 text-stone-800'>
                    <p className='text-sm'>{item1.typename}</p>
                  </td>
                </tr>
                {expandedRows === k1 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className='text-center text-orange-500'
                    >
                      ส่วนนี้จะแสดงข้อมูลการประเมินของ{item1.hname_th} [{item1.hcode}]
                    </td>
                  </tr>
                ) : null}
              </tbody>
            ))
          }
        </table>
      </div>
    </div>
  )
}

export default FormReportProv