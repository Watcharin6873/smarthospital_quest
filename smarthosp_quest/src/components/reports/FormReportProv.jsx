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

      <div className='flex justify-center items-center text-2xl font-bold mb-8 text-green-600'>
        <p className='ml-2'>รายงานผลการประเมิน</p>
      </div>

      <div className='bg-white rounded-md shadow-md p-3'>
        <table className='w-full text-left table-fixed text-slate-800'>
          <thead>
            <tr className='text-md text-slate-500 border border-l border-r border-slate-300 bg-slate-200'>
              <th className='text-center p-2 border-r'>หน่วยบริการที่อยู่ในจังหวัด{province}</th>
              <th className='text-center p-2 border-r w-40'>ประเภท</th>
            </tr>
          </thead>
          {
            listHospitals.map((item1, k1) => (
              <tbody>
                <tr className='cursor-pointer bg-slate-100 hover:bg-slate-50' key={k1} onClick={() => handleExpandedRow(k1)}>
                  <td className='border p-1 text-stone-800'>
                    <div className='flex gap-1 pl-4'>
                      <p className='text-sm'>{item1.hname_th}</p>
                      <p className='text-sm'>[{item1.hcode}]</p>
                    </div>
                  </td>
                  <td className='border text-center p-1 text-stone-800'>
                    <p className='text-sm'>{item1.typename}</p>
                  </td>
                </tr>
                {expandedRows === k1 ? (
                  <tr>
                    <td
                      colSpan={2}
                      className='text-center border'
                    >
                      <table className='w-full table-fixed text-slate-700'>
                        <thead className='bg-gray-100'>
                          <tr>
                            <th colSpan={2} className='text-xs text-center border w-52'>ด้านโครงสร้าง</th>
                            <th colSpan={2} className='text-xs text-center border w-52'>ด้านบริหารจัดการ</th>
                            <th colSpan={2} className='text-xs text-center border w-52'>ด้านการบริการ</th>
                            <th colSpan={2} className='text-xs text-center border w-52'>ด้านบุคลากร</th>
                          </tr>
                          <tr>
                            <th className='text-xs text-center border'>คะแนนเต็ม</th>
                            <th className='text-xs text-center border'>คะแนนจำเป็น</th>
                            <th className='text-xs text-center border'>คะแนนเต็ม</th>
                            <th className='text-xs text-center border'>คะแนนจำเป็น</th>
                            <th className='text-xs text-center border'>คะแนนเต็ม</th>
                            <th className='text-xs text-center border'>คะแนนจำเป็น</th>
                            <th className='text-xs text-center border'>คะแนนเต็ม</th>
                            <th className='text-xs text-center border'>คะแนนจำเป็น</th>
                          </tr>
                        </thead>
                        <tbody className='bg-gray-50'>
                          <tr className='text-xs'>
                            <td className='border text-center'>
                              <p>0</p>
                            </td>
                            <td className='border text-center'>
                              <p>0</p>
                            </td>
                            <td className='border text-center'>
                              <p>0</p>
                            </td>
                            <td className='border text-center'>
                              <p>0</p>
                            </td>
                            <td className='border text-center'>
                              <p>0</p>
                            </td>
                            <td className='border text-center'>
                              <p>0</p>
                            </td>
                            <td className='border text-center'>
                              <p>0</p>
                            </td>
                            <td className='border text-center'>
                              <p>0</p>
                            </td>
                          </tr>
                        </tbody>
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

export default FormReportProv