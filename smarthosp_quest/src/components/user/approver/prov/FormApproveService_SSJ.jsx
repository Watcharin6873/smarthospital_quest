import React, { useEffect, useState } from 'react'
import useGlobalStore from '../../../../store/global-store'
import { useNavigate } from 'react-router-dom'
import { getDocumentByEvaluateByHosp, getListEvaluateByProv, ssjChangeStatusApprove } from '../../../../api/Evaluate'
import { Button, Checkbox, Divider, Image, Select, Switch } from 'antd'
import { SnippetsOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'

const FormApproveService_SSJ = () => {

  const navigate = useNavigate()
  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)

  const [isLoading, setIsLoading] = useState(false)
  const [evaluateByProv, setEvaluateByProv] = useState([])
  const [searchQuery, setSearchQuery] = useState([])
  const [documentFile, setDocumentFile] = useState()
  const [hospcode, setHospcode] = useState(null)


  const province = user.province


  useEffect(() => {
    loadListEvaluateByProve(token)
  }, [])

  const loadListEvaluateByProve = async () => {
    await getListEvaluateByProv(token, province)
      .then(res => {
        // console.log("List: ", res.data)
        setEvaluateByProv(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const category3 = evaluateByProv.filter(f => f.category_quests.id === 3)

  const uniqueData = [...new Map(category3.map(item => [item.hospitals['hcode', 'hname_th'], item])).values()]

  // console.log("List: ", uniqueData)

  const optionSelectHosp = uniqueData.map((item) => ({
    value: item.hcode,
    label: item.hospitals.hname_th + ' [' + item.hcode + ']'
  }))



  const uniqueCatId = 2

  const selectHospital = (e) => {
    setHospcode(e)
    setSearchQuery(category3.filter(f => f.hcode === e))
    getDocumentByEvaluateByHosp(token, uniqueCatId, e)
      .then(res => {
        // console.log(res.data)
        setDocumentFile(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const listQuest = [...new Map(searchQuery.map(item => [item.quests["quest_name"], item])).values()]

  const changeStatusApprove = async (e, id) => {
    console.log(e, id)
    const values = {
      id: id,
      ssj_approve: e
    }

    await ssjChangeStatusApprove(token, values)
      .then(res => {
        toast.success(res.data.message)
        loadListEvaluateByProve(token, province)
        setSearchQuery(category3.filter(f => f.hcode == hospcode))
      })
      .catch(err => {
        console.log(err)
      })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed: ', errorInfo)
  }

  const showPDF = (pdf) => {
    window.open(`https://bdh-service.moph.go.th/api/smarthosp/file-uploads/${pdf}`, "_blank", "noreferer")
  }


  return (
    <div>

      <div className='flex justify-center items-center text-2xl font-bold mb-8 text-green-600'>
        <p className='ml-2'>Approve ด้านการบริการ</p>
      </div>

      <div className='bg-white rounded-md shadow-md p-3'>
        <div className='flex justify-center items-center space-x-3'>
          <p className='font-bold'>เลือกหน่วยบริการ : </p>
          <Select
            showSearch
            onChange={(e) => selectHospital(e)}
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={optionSelectHosp}
            placeholder='กรุณาเลือกหน่วยบริการ...'
            style={{ width: '40%' }}
          />
          {
            !documentFile
              ? null
              :
              <>
                <Button
                  onClick={() => showPDF(documentFile.file_name)}
                  type='primary'
                >
                  <SnippetsOutlined /> ดูเอกสาร/หลักฐาน
                </Button>
              </>
          }
        </div>
        <Divider />
        <div>
          <table className='w-full text-left table-fixed text-slate-800'>
            <thead>
              <tr className='text-md text-slate-500 border border-l border-r border-slate-300 bg-slate-50'>
                <th className='text-center p-4 border-r'>เกณฑ์การประเมินและคำตอบ</th>
                <th className='text-center p-4 border-r w-32'>คะแนนเต็ม</th>
                <th className='text-center p-4 border-r w-32'>คะแนนจำเป็น</th>
                <th className='text-center p-4 border-r w-32'>ภาพหลักฐาน</th>
                <th className='text-center p-4 border-r w-32'>การอนุมัติ</th>
              </tr>
            </thead>
            <tbody>
              {
                listQuest.map((item2, k2) =>
                  <>
                    <tr key={k2} className='border-b border-l border-r'>
                      <td colSpan={5}>
                        <p
                          className='ml-1 p-1 font-bold'
                          style={{ fontSize: '20px' }}
                        >
                          <u>{item2.quests.quest_name}</u>
                        </p>
                      </td>
                    </tr>
                    {
                      searchQuery.map((item1, k1) => (
                        item1.quests.quest_name === item2.quests.quest_name
                          ?
                          <>
                            <tr key={k1} className='border-neutral-200 dark:border-white/10 border-b border-l border-r'>
                              <td className='p-4'>
                                <div className='ml-7'>
                                  <p className='font-bold text-slate-600'>{item1.sub_quests.sub_quest_name}</p>
                                  <div className='pl-10 flex gap-2'>
                                    <Checkbox checked />
                                    {
                                      item1.sub_quests.sub_quest_lists.map((it) =>
                                        it.choice === item1.check
                                          ?
                                          <p className={
                                            it.sub_quest_listname === 'ไม่มีการดำเนินการ'
                                              ? 'text-red-700'
                                              : 'text-green-700'
                                          }>
                                            {it.sub_quest_listname}
                                          </p>
                                          : <></>
                                      )
                                    }
                                  </div>
                                </div>
                              </td>
                              <td className='text-center border-l'>
                                {
                                  item1.sub_quests.sub_quest_lists.map((it1) =>
                                    it1.choice === item1.check
                                      ? <p className='font-bold'>{it1.sub_quest_total_point}</p>
                                      : <></>
                                  )
                                }
                              </td>
                              <td className='text-center border-l'>
                                {
                                  item1.sub_quests.sub_quest_lists.map((it2) =>
                                    it2.choice === item1.check
                                      ? <p className='font-bold'>{it2.sub_quest_require_point}</p>
                                      : <></>
                                  )
                                }
                              </td>
                              <td className='text-center border-l'>
                                <div className='flex justify-center items-center'>
                                  {
                                    item1.file_name
                                      ?
                                      <>
                                        <Image
                                          className='px-1 py-1'
                                          width={100}
                                          src={`https://bdh-service.moph.go.th/api/smarthosp/file-uploads/${item1.file_name}`}
                                        />
                                      </>
                                      :
                                      <>
                                        -
                                      </>
                                  }

                                </div>
                              </td>
                              <td className='text-center border-l px-1'>
                                <Switch size='small' checked={item1.ssj_approve} onChange={(e) => changeStatusApprove(e, item1.id)} />
                              </td>
                            </tr>
                          </>
                          : null
                      ))
                    }
                  </>

                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default FormApproveService_SSJ