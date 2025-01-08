import React, { useState, useEffect } from 'react'
import useGlobalStore from '../../../../store/global-store'
import { getListEvaluateByProv, getSubQuetList, ssjChangeStatusApprove } from '../../../../api/Evaluate'
import { Button, Checkbox, Divider, Form, Image, Input, Select, Switch } from 'antd'
import { Save } from 'lucide-react'
import { getDocumentsByEvaluateByHosp } from '../../../../api/Approve'
import { EyeOutlined, EyeTwoTone, SnippetsOutlined } from '@ant-design/icons'
import { changeStatus } from '../../../../api/User'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { getListQuests } from '../../../../api/Quest'

const FormApproveInfrastructure_SSJ = () => {

  const navigate = useNavigate()
  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)
  const [isLoading, setIsLoading] = useState(false)
  const [listQuests, setListQuests] = useState([])
  const [evaluateByProv, setEvaluateByProv] = useState([])
  const [searchQuery, setSearchQuery] = useState([])
  const [documentFile, setDocumentFile] = useState()
  const [hospcode, setHospcode] = useState(null)
  const [subQuestList, setSubQuestList] = useState([])

  const [formSsjApprove] = Form.useForm()
  const province = user.province

  useEffect(() => {
    loadListEvaluateByProve(token, province)
    loadSubQuestList(token)
  }, [])


  const loadSubQuestList = async () => {
    await getSubQuetList(token)
      .then(res => {
        setSubQuestList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }


  const dataSubQuestLists = subQuestList.map((item) => ({
    id: item.id,
    sub_questId: item.sub_questId,
    choice: item.choice,
    sub_quest_listname: item.sub_quest_listname,
    sub_quest_total_point: item.sub_quest_total_point,
    sub_quest_require_point: item.sub_quest_require_point,
    description: item.description,
    necessary: item.necessary,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }))

  const loadListQuests = async () => {
    await getListQuests(token)
      .then(res => {
        setListQuests(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }


  const loadListEvaluateByProve = () => {
    setIsLoading(true)
    getListEvaluateByProv(token, province)
      .then(res => {
        // console.log(res.data)
        setEvaluateByProv(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))

  }

  const category1 = evaluateByProv.filter(f => f.category_quests.id === 1)

  const uniqueData = [...new Map(category1.map(item => [item.hospitals['hcode', 'hname_th'], item])).values()]

  const optionSelectHosp = uniqueData.map((item) => ({
    value: item.hcode,
    label: item.hospitals.hname_th + ' [' + item.hcode + ']'
  }))



  const uniqueCatId = 1


  const selectHospital = (e) => {
    setHospcode(e)
    loadListQuests(token)
    setSearchQuery(category1.filter(f => f.hcode === e))
    getDocumentsByEvaluateByHosp(token, uniqueCatId, e)
      .then(res => {
        // console.log(res.data)
        setDocumentFile(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }


  const searchQuests = listQuests.filter(f => f.category_questId === 1)
  // console.log('Quest: ', searchQuests)

  const changeStatusApprove = (e, id) => {
    console.log(e, id)
    const values = {
      id: id,
      ssj_approve: e
    }

    ssjChangeStatusApprove(token, values)
      .then(res => {
        toast.success(res.data.message)
        loadListEvaluateByProve(token, province)
        setSearchQuery(category1.filter(f => f.hcode == hospcode))
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleSubmit = async (fieldValue) => {
    const result = []
    searchQuery.forEach((qItem) => {
      result.push({
        evaluateId: fieldValue["evaluateId" + qItem.id],
        usersId: fieldValue["usersId" + qItem.id],
        province: fieldValue["province" + qItem.id],
        zone: fieldValue["zone" + qItem.id],
        ssj_approve: fieldValue["ssj_approve" + qItem.id],
      })
    })
    console.log('Result: ', result)

  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed: ', errorInfo)
  }

  const showPDF = (pdf) => {
    window.open(`https://bdh-service.moph.go.th/api/smarthosp/file-uploads/${pdf}`, "_blank", "noreferer")
  }


  useEffect(() => {
    formSsjApprove.setFieldsValue({
      evaluateId: searchQuery.id,
      usersId: user.id,
      province: user.province,
      zone: user.zone
    })
  })


  return (
    <div>
      <div className='flex justify-center items-center text-2xl font-bold mb-8 text-green-600'>
        <p className='ml-2'>Approve ด้านโครงสร้าง</p>
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
          <Form
            name='formSsjApprove'
            form={formSsjApprove}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
          >
            <table className='w-full text-left table-fixed text-slate-800'>
              <thead>
                <tr className='text-md text-slate-500 border border-l border-r border-slate-300 bg-slate-50'>
                  <th className='text-center p-4 border-r'>เกณฑ์การประเมินและคำตอบ</th>
                  <th className='text-center p-4 border-r w-32'>คะแนนเต็ม</th>
                  <th className='text-center p-4 border-r w-32'>คะแนนจำเป็น</th>
                  <th className='text-center p-4 border-r w-32'>ไฟล์หลักฐาน</th>
                  {/* <th className='text-center p-4 border-r w-32'>การอนุมัติ</th> */}
                </tr>
              </thead>
              <tbody>
                {
                  searchQuests.map((item2, k2) =>
                    <>
                      <tr key={k2} className='border-b border-l border-r'>
                        <td colSpan={4}>
                          <p
                            className='ml-1 p-1 font-bold'
                            style={{ fontSize: '18px' }}
                          >
                            <u>{item2.quest_name}</u>
                          </p>
                        </td>
                      </tr>
                      {
                        searchQuery.map((item1, k1) => (
                          item1.quests.quest_name === item2.quest_name
                            ?
                            <>
                              <tr key={k1} className='border-neutral-200 dark:border-white/10 border-b border-l border-r'>
                                <td className='p-4'>
                                  <Form.Item
                                    name={'evaluateId' + item1.id}
                                    hidden={true}
                                    initialValue={item1.id}
                                  >
                                    <Input />
                                  </Form.Item>

                                  <Form.Item
                                    name={'usersId' + item1.id}
                                    hidden={true}
                                    initialValue={user.id}
                                  >
                                    <Input />
                                  </Form.Item>
                                  <Form.Item
                                    name={'province' + item1.id}
                                    hidden={true}
                                    initialValue={user.province}
                                  >
                                    <Input />
                                  </Form.Item>
                                  <Form.Item
                                    name={'zone' + item1.id}
                                    hidden={true}
                                    initialValue={user.zone}
                                  >
                                    <Input />
                                  </Form.Item>
                                  <Form.Item
                                    name={'ssj_approve' + item1.id}
                                    hidden={true}
                                    initialValue={true}
                                  >
                                    <Input />
                                  </Form.Item>
                                  <div className='ml-7'>
                                    <p className='font-bold text-slate-600'>{item1.sub_quests.sub_quest_name}</p>
                                    <div className='pl-10 flex gap-2'>
                                      {
                                        item1.check.split(",").map((ch) =>
                                          dataSubQuestLists.map((sb) =>
                                            sb.sub_questId === item1.sub_quests.id && sb.choice === ch
                                              ?
                                              <div className='flex items-baseline gap-2 mt-3 ml-7'>
                                                <Checkbox checked />
                                                <p
                                                  className={
                                                    sb.sub_quest_listname === 'ไม่มีการดำเนินการ'
                                                      ? 'text-red-700'
                                                      : 'text-green-700'
                                                  }
                                                >
                                                  {sb.sub_quest_listname}
                                                </p>
                                              </div>
                                              : null
                                          )
                                        )
                                      }
                                    </div>
                                  </div>
                                </td>
                                <td className='text-center border-l'>
                                  {
                                    item1.check.split(",").map((ch) =>
                                      dataSubQuestLists.map((sb) =>
                                        sb.sub_questId === item1.sub_quests.id && sb.choice === ch
                                          ?
                                          <div className='flex justify-center items-baseline gap-2 mt-3'>
                                            <p className='font-bold'>{sb.sub_quest_total_point}</p>
                                          </div>
                                          : null
                                      )
                                    )
                                  }
                                </td>
                                <td className='text-center border-l'>
                                  {
                                    item1.check.split(",").map((ch) =>
                                      dataSubQuestLists.map((sb) =>
                                        sb.sub_questId === item1.sub_quests.id && sb.choice === ch
                                          ?
                                          <div className='flex justify-center items-baseline gap-2 mt-3'>
                                            <p className='font-bold'>{sb.sub_quest_require_point}</p>
                                          </div>
                                          : null
                                      )
                                    )
                                  }
                                </td>
                                <td className='text-center border-l'>
                                  <div className='flex justify-center items-center'>
                                    {
                                      item1.file_name
                                        ?
                                        <>
                                          <Button onClick={() => showPDF(item1.file_name)}>
                                            <EyeTwoTone /> ดูไฟล์
                                          </Button>
                                        </>
                                        :
                                        <>
                                          -
                                        </>
                                    }

                                  </div>
                                </td>
                                {/* <td className='text-center border-l px-1'>
                                  <Switch size='small' checked={item1.ssj_approve} onChange={(e) => changeStatusApprove(e, item1.id)} />
                                </td> */}
                              </tr>
                            </>
                            : null
                        ))
                      }
                      <div>

                      </div>
                    </>
                  )
                }
              </tbody>
            </table>
            <div className='flex justify-center space-x-1 mt-3'>
              <div className='m-3'>
                <Form.Item>
                  <Button
                    type='primary'
                    htmlType='submit'
                    style={{ width: 500 }}
                  >
                    <Save /> Approve ผลการประเมินด้านโครงสร้าง
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
          {/* <div className='flex justify-center space-x-1 mt-5'>
              <div>
                <Form.Item>
                  <Button
                    type='primary'
                    htmlType='submit'
                    style={{ width: 500 }}
                  >
                    <Save /> อนุมัติผลการประเมิน รพ.อัจฉริยะด้านโครงสร้าง
                  </Button>
                </Form.Item>
              </div>
            </div> */}
        </div>
      </div>
    </div>
  )
}

export default FormApproveInfrastructure_SSJ