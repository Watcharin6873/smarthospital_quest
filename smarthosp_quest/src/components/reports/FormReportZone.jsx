import React, { useEffect, useState } from 'react'
import useGlobalStore from '../../store/global-store'
import { useNavigate } from 'react-router-dom'
import { getListHospitalOnZone } from '../../api/Hospital'

const FormReportZone = () => {

  const navigate = useNavigate()
  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)

  const [isLoading, setIsLoading] = useState(false)
  const [listHospitals, setListHospitals] = useState([])
  const [listEvaluateByZone, setListEvaluateByZone] = useState([])
  const [expandedRows, setExpandedRows] = useState(null)
  const [expandedRows2, setExpandedRows2] = useState(null)

  const zone = user.zone

  useEffect(() => {
    loadListHospitalByZone(token)
  }, [])


  const loadListHospitalByZone = async () => {
    await getListHospitalOnZone(token, zone)
      .then(res => {
        setListHospitals(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const provData = [...new Map(listHospitals.map(item => [item["provcode", "provname"], item])).values()]
  const hospData = [...new Map(listHospitals.map(item => [item["provcode", "hcode", "hname_th"], item])).values()]

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

  const handleExpandedRow2 = (e) => {
    console.log('Value: ', e)
    var currentExpandedRows = null;
    const isRowExpanded = currentExpandedRows === e ? e : null;
    const newExpandedRows = isRowExpanded
      ? null
      : (currentExpandedRows = e);
    if (expandedRows !== e) {
      setExpandedRows2(newExpandedRows);
    } else {
      setExpandedRows2(null);
    }
  }


  return (
    <div>
      <div className='flex justify-center items-center text-2xl font-bold mb-8 text-green-600'>
        <p className='ml-2'>รายงานผลการประเมินของเขตสุขภาพที่ {Number(zone)} </p>
      </div>

      <div className='bg-white rounded-md shadow-md p-3'>
        <table className='w-full text-left table-fixed text-slate-800'>
          <thead>
            <tr className='text-slate-800 border border-l border-r border-slate-300 bg-slate-50'>
              <th className='text-center p-2 border-r'>รายชื่อจังหวัดในเขตสุขภาพที่ {Number(zone)}</th>
            </tr>
          </thead>
          {
            provData.map((item1, k1) => (
              <tbody>
                <tr key={k1} className='cursor-pointer hover:bg-slate-50' onClick={() => handleExpandedRow(k1)}>
                  <td className='border p-1 text-center font-bold text-yellow-700'>
                    <p>{item1.provname}</p>
                  </td>
                </tr>
                {expandedRows === k1 ? (
                  <tr>
                    <td className='border'>
                      <table className='w-full table-fixed text-slate-700'>
                        <thead className='bg-slate-50'>
                          <tr>
                            <th rowSpan={2} className='text-sm text-center border'>หน่วยบริการ</th>
                            <th colSpan={2} className='text-sm text-center border w-52'>ด้านโครงสร้าง</th>
                            <th colSpan={2} className='text-sm text-center border w-52'>ด้านบริหารจัดการ</th>
                            <th colSpan={2} className='text-sm text-center border w-52'>ด้านการบริการ</th>
                            <th colSpan={2} className='text-sm text-center border w-52'>ด้านบุคลากร</th>
                          </tr>
                          <tr>
                            <th className='text-sm text-center border'>คะแนนเต็ม</th>
                            <th className='text-sm text-center border'>คะแนนจำเป็น</th>
                            <th className='text-sm text-center border'>คะแนนเต็ม</th>
                            <th className='text-sm text-center border'>คะแนนจำเป็น</th>
                            <th className='text-sm text-center border'>คะแนนเต็ม</th>
                            <th className='text-sm text-center border'>คะแนนจำเป็น</th>
                            <th className='text-sm text-center border'>คะแนนเต็ม</th>
                            <th className='text-sm text-center border'>คะแนนจำเป็น</th>
                          </tr>
                        </thead>
                        {
                          listHospitals.map((item2, k2) => (
                            item2.provcode === item1.provcode
                              ?
                              <tbody>
                                <tr key={k2}>
                                  <td className='border'>
                                    <p className='pl-2 text-sm'>{item2.hname_th} [{item2.hcode}]</p>
                                  </td>
                                  <td className='border'>
                                  </td>
                                  <td className='border'>                                    
                                  </td>
                                  <td className='border'>
                                  </td>
                                  <td className='border'>                                    
                                  </td>
                                  <td className='border'>
                                  </td>
                                  <td className='border'>                                    
                                  </td>
                                  <td className='border'>
                                  </td>
                                  <td className='border'>                                    
                                  </td>
                                </tr>
                              </tbody>
                              : null

                          ))
                        }
                      </table>
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

export default FormReportZone