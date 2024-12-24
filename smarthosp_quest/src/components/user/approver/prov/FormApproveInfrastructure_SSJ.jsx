import React, { useState, useEffect } from 'react'
import useGlobalStore from '../../../../store/global-store'
import { getListEvaluateByProv } from '../../../../api/Evaluate'
import { Button, Checkbox, Divider, Form, Input, Select } from 'antd'
import { Save } from 'lucide-react'
import { getDocumentsByEvaluateByHosp } from '../../../../api/Approve'
import { EyeOutlined, SnippetsOutlined } from '@ant-design/icons'

const FormApproveInfrastructure_SSJ = () => {

  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)
  const [isLoading, setIsLoading] = useState(false)
  const [evaluateByProv, setEvaluateByProv] = useState([])
  const [searchQuery, setSearchQuery] = useState([])
  const [documentFile, setDocumentFile] = useState()

  const [formSsjApprove] = Form.useForm()
  const province = user.province

  useEffect(() => {
    loadListEvaluateByProve(token, province)
  }, [])


  const loadListEvaluateByProve = async () => {
    setIsLoading(true)
    await getListEvaluateByProv(token, province)
      .then(res => {
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


  const listQuest = [...new Map(searchQuery.map(item => [item.quests["quest_name"], item])).values()]
  const uniqueCatId = 1

  const selectHospital = (e) => {
    setSearchQuery(category1.filter(f => f.hcode === e))
    getDocumentsByEvaluateByHosp(token, uniqueCatId, e)
      .then(res => {
        console.log(res.data)
        setDocumentFile(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }





  // console.log('Data: ', documentFile)
  // console.log('Data: ', uniqueCatId)

  const handleSubmitApprove = async (fieldValue) => {
    console.log(fieldValue)
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
            onFinish={handleSubmitApprove}
            onFinishFailed={onFinishFailed}
          >
            <table className='w-full text-left table-fixed text-slate-800'>
              <thead>
                <tr className='text-md text-slate-500 border border-l border-r border-slate-300 bg-slate-50'>
                  <th className='text-center p-4 border-r'>เกณฑ์การประเมิน</th>
                  <th className='text-center p-4 border-r w-32'>คะแนนเต็ม</th>
                  <th className='text-center p-4 border-r w-32'>คะแนนจำเป็น</th>
                  <th className='text-center p-4 border-r w-32'>อนุมัติ</th>
                  <th className='text-center p-4 border-r w-32'>หมายเหตุ</th>
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
                                <td>
                                  <div className='ml-7'>
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
                                      initialValue={item1.users.id}
                                    >
                                      <Input />
                                    </Form.Item>
                                    {item1.sub_quests.sub_quest_name}
                                  </div>
                                </td>
                                <td className='text-center border-l'>
                                  <Form.Item
                                    name={'hcode' + item1.id}
                                    hidden={true}
                                    initialValue={item1.hcode}
                                  >
                                    <Input />
                                  </Form.Item>
                                  <p>{item1.sub_quest_total_point}</p>
                                </td>
                                <td className='text-center border-l'>
                                  <Form.Item
                                    name={'province' + item1.id}
                                    hidden={true}
                                    initialValue={item1.hospitals.provname}
                                  >
                                    <Input />
                                  </Form.Item>
                                  <p>{item1.sub_quest_require_point}</p>
                                </td>
                                <td className='text-center border-l'>
                                  <Form.Item
                                    name={'ssj_approved' + item1.id}
                                    valuePropName='checked'
                                  >
                                    <div className='flex justify-center items-center'>
                                      <Checkbox style={{ marginTop: '18px' }} />
                                    </div>
                                  </Form.Item>
                                </td>
                                <td className='text-center border-l px-1'>
                                  <Form.Item
                                    name={'description' + item1.id}
                                  >
                                    <Input style={{ marginTop: '18px' }} />
                                  </Form.Item>
                                  <Form.Item
                                    name={'zone' + item1.id}
                                    hidden={true}
                                    initialValue={item1.hospitals.zone}
                                  >
                                    <Input />
                                  </Form.Item>
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
            <div className='flex justify-center space-x-1 mt-5'>
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
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default FormApproveInfrastructure_SSJ