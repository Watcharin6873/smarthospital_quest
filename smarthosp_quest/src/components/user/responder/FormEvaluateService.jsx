import React, { useState, useEffect } from 'react'
import useGlobalStore from '../../../store/global-store'
import { getListQuests } from '../../../api/Quest'
import { Select, Button, Divider, Form, Input, Checkbox, InputNumber, Modal, Upload, Radio, Space } from 'antd'
import { ExclamationCircleFilled, UploadOutlined } from '@ant-design/icons'
import { getListSubQuestsForEvaluate, saveEvaluates, getEvaluateByHosp } from '../../../api/Evaluate'
import { CircleCheck, CircleX, MousePointer, Save } from 'lucide-react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FormEvaluateService = () => {

  const navigate = useNavigate()
  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)
  const [isLoading, setIsLoading] = useState(false)
  const [isShowUploadModal, setIsShowUploadModal] = useState(false)
  const [isShowUploadItemModal, setIsShowUploadItemModal] = useState(false)
  const [listQuest, setListQuest] = useState([])
  const [listSubQuest, setListSubQuest] = useState([])
  const [listEvaluate, setListEvaluate] = useState([])
  const [itemId, setItemId] = useState()
  const [formEvaluate] = Form.useForm()
  const [formUpload] = Form.useForm()
  const [formUploadItem] = Form.useForm()
  const [val, setVal] = useState("")

  console.log('Val : ', Number(val.substring(1, 5)))


  const hcode = user.hcode
  useEffect(() => {
    loadListQuest(token)
  }, [])

  const loadListQuest = async () => {
    await getListQuests(token)
      .then(res => {
        setListQuest(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const questData = listQuest.filter(item => item.category_questId === 3)

  const optionQuestData = questData.map((item, k1) => ({
    value: item.id,
    label: item.quest_name.substring(0, 90)
  }))

  const selectQuest = async (id) => {
    setIsLoading(true)
    console.log(id)
    await getListSubQuestsForEvaluate(token, id)
      .then(res => {
        console.log('Data: ', res.data)
        setListSubQuest(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))

    await getEvaluateByHosp(token, id, hcode)
      .then(res => {
        console.log('Eva: ', res.data)
        setListEvaluate(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const uniqueQuest = [...new Set(listSubQuest.map(item => item.quests.quest_name))]
  const dataSource = listSubQuest.map((item, key) => ({
    ...item,
    key: key
  }))

  const handleSubmit = async (fieldValue) => {
    const results = [];
    dataSource.forEach((qItem) => {
      results.push({
        sub_questId: qItem.id,
        category_questId: fieldValue["category_questId" + qItem.id],
        questId: fieldValue["questId" + qItem.id],
        check: fieldValue["check" + qItem.id],
        hcode: fieldValue["hcode" + qItem.id],
        userId: fieldValue["userId" + qItem.id],
      });
    });
    console.log("Success:", results);
    await saveEvaluates(token, results)
      .then(res => {
        toast.success(res.data.message)
        setTimeout(() => navigate('/smarthosp-quest/user/responder/evaluate-service'), 5000)
      })
      .catch(err => {
        console.log(err.response.data.message)
        toast.error(err.response.data.message)
      })
  }

  const showFormUploadModal = () => [
    setIsShowUploadModal(true)
  ]

  const showUploadItemModal = (item) => {
    if (item) {
      setItemId(item)
    }
    setIsShowUploadItemModal(true)
  }

  const closeModal = () => {
    setIsShowUploadModal(false)
    setIsShowUploadItemModal(false)
  }

  const handleUpload = async (fieldValue) => {
    const formData = new FormData();
    formData.append("file_name", fieldValue.file_name.file.originFileObj)
    formData.append("category_questId", fieldValue.category_questId)
    formData.append("hcode", fieldValue.hcode)
    formData.append("usersId", fieldValue.usersId)


    await axios.post(import.meta.env.VITE_APP_API + `/saveDocuments`, formData, {
      headers: {
        Authorization: `Bearer ` + token,
        "Content-Type": "multipart/form-data"
      }
    }).then(res => {
      toast.success(res.data.message)
      setIsShowUploadModal(false)
    }).catch(err => {
      console.log(err.response.data)
      toast.error(err.response.data.message)
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Fialed: ", errorInfo)
  }

  useEffect(() => {
    formUpload.setFieldsValue({
      category_questId: '1',
      hcode: user.hcode,
      usersId: user.id
    })
  })

  useEffect(() => {
    if (itemId) {
      formUploadItem.setFieldsValue({
        category_questId: itemId.category_questId,
        questId: itemId.questId,
        sub_questId: itemId.id,
        sub_quest_name: itemId.sub_quest_name,
        hcode: user.hcode,
        usersId: user.id
      })
    }
  })

  //UploadItem
  const handleUploadItem = async (fieldValue) => {
    const formData = new FormData();
    formData.append("file_name", fieldValue.file_name.file.originFileObj)
    formData.append("category_questId", fieldValue.category_questId)
    formData.append("questId", fieldValue.questId)
    formData.append("sub_questId", fieldValue.sub_questId)
    formData.append("hcode", fieldValue.hcode)
    formData.append("usersId", fieldValue.usersId)


    await axios.post(import.meta.env.VITE_APP_API + `/saveEvidenceAll`, formData, {
      headers: {
        Authorization: `Bearer ` + token,
        "Content-Type": "multipart/form-data"
      }
    }).then(res => {
      toast.success(res.data.message)
      setIsShowUploadItemModal(false)
    }).catch(err => {
      console.log(err)
      toast.error('ต้องเป็นไฟล์นามสกุล .png หรือ .jpg หรือ .pdf เท่านั้น!!')
    })
  }


  return (
    <div>
      <div className='flex justify-center items-center text-2xl font-bold mb-8 text-green-600'>
        <p className='ml-2'>ประเมินผลด้านการบริการ (Service)</p>
      </div>

      <div className='bg-white rounded-md shadow-md p-3'>
        <div className='flex justify-center items-center space-x-3'>
          <p className='font-bold'>เลือกเกณฑ์การประเมิน : </p>
          <Select
            onChange={(e) => selectQuest(e)}
            options={optionQuestData}
            placeholder='กรุณาเลือกหัวข้อเพื่อประเมิน...'
            style={{ width: '40%' }}
          />
          <div>
            <Button onClick={showFormUploadModal}>
              <UploadOutlined /> แนบเอกสาร/หลักฐานแบบรวมไฟล์ (PDF)
            </Button>
          </div>

        </div>
        <Divider />
        {
          listEvaluate.length > 0
            ?
            <>
              <div className='text-center'>
                <Button onClick={() => navigate('/smarthosp-quest/user/responder/report-hosp')}>
                  <MousePointer /> ประเมินหัวข้อนี้แล้ว คลิกเพื่อตรวจสอบ
                </Button>
              </div>
            </>
            :
            <>
              <div>
                <div className='my-2 max-w-screen-xl'>
                  <p
                    className='text-lg ml-4 font-bold text-yellow-900'
                  >
                    <u>{uniqueQuest}</u>
                  </p>
                </div>

                <Form
                  name='formEvaluate'
                  form={formEvaluate}
                  onFinish={handleSubmit}
                >
                  <div
                    className=''
                  >
                    <div className='grid grid-cols-6 ml-10 bg-slate-100 text-md text-slate-950'>
                      <div className='col-span-4 text-center border'>
                        <p className='font-bold p-2'>รายการ</p>
                      </div>
                      <div className='text-center border'>
                        <p className='font-bold p-2'>คะแนนเต็ม</p>
                      </div>
                      <div className='text-center border'>
                        <p className='font-bold p-2'>คะแนนจำเป็น</p>
                      </div>
                      {/* <div className='text-center border'>
                      <p className='font-bold p-2'>ภาพหลักฐาน</p>
                    </div> */}
                    </div>
                    {
                      dataSource.map((item, k1) => (
                        <>
                          <div className='grid grid-cols-6 ml-10'>
                            <div className='col-span-4 border'>
                              <p
                                className='p-2 font-bold'
                              >
                                {item.sub_quest_name}
                              </p>
                              <Form.Item
                                name={'category_questId' + item.id}
                                hidden={true}
                                initialValue={item.category_questId}
                              >
                                <Input />
                              </Form.Item>
                              <Form.Item
                                name={'questId' + item.id}
                                hidden={true}
                                initialValue={item.questId}
                              >
                                <Input />
                              </Form.Item>
                              <Form.Item
                                name={'description' + item.id}
                                initialValue={item.description}
                                hidden={true}
                              >
                                <Input className='border-none' />
                              </Form.Item>
                              {
                                item.id === 145 || item.id === 150 || item.id === 157 || item.id === 179 || item.id === 189
                                  || item.id === 192 || item.id === 195
                                  ?
                                  <>
                                    <Form.Item
                                      name={'sub_quest_listId' + item.id}
                                      initialValue={1}
                                      hidden={true}
                                    >
                                      <Input className='border-none' />
                                    </Form.Item>
                                    <Form.Item
                                      name={"check" + item.id}
                                      className='ml-16 mt-1'
                                    >
                                      <Radio.Group onChange={(e) => setVal(e.target.value)}>
                                        <Space direction='vertical'>
                                          {
                                            item.sub_quest_lists.map((it1, k1) => (
                                              it1.sub_questId === item.id
                                                ? <Radio className='text-green-700' value={"C" + it1.id}>{it1.sub_quest_listname}</Radio>
                                                : null
                                            ))
                                          }
                                        </Space>
                                      </Radio.Group>
                                    </Form.Item>
                                  </>

                                  :
                                  <>
                                    <Form.Item
                                      name={'sub_quest_listId' + item.id}
                                      hidden={true}
                                    >
                                      <Input className='border-none' />
                                    </Form.Item>
                                    <Form.Item
                                      name={"check" + item.id}
                                      className='ml-16 mt-1'
                                    >
                                      <Radio.Group>
                                        <Space direction='vertical'>
                                          <Radio value="true" className='text-green-700'>มีการดำเนินการ</Radio>
                                          <Radio value="false" className='text-red-700'>ไม่มีการดำเนินการ</Radio>
                                        </Space>
                                      </Radio.Group>
                                    </Form.Item>
                                  </>

                              }
                            </div>
                            <div className='text-center border'>
                              <Form.Item
                                name={'sub_quest_total_point' + item.id}
                                rules={[
                                  {
                                    required: true,
                                    message: 'กรุณาระบุ'
                                  }
                                ]}
                                initialValue={item.sub_quest_total_point}
                                hidden={true}
                                className='mt-1'
                              >
                                <InputNumber readOnly />
                              </Form.Item>
                              <p className='mt-6 font-bold'>{item.sub_quest_total_point}</p>
                              <div className='mt-2'>
                                {
                                  item.id === 145 || item.id === 150 || item.id === 157 || item.id === 179 || item.id === 189
                                    || item.id === 192 || item.id === 195
                                    ?
                                    <>
                                      {
                                        item.sub_quest_lists.map((it4) =>
                                          it4.sub_questId === item.id
                                            ?
                                            <p className='text-green-700'>
                                              {it4.sub_quest_total_point}
                                            </p>
                                            : <></>
                                        )
                                      }
                                    </>
                                    :
                                    <></>
                                }
                              </div>
                            </div>
                            <div className='text-center border'>
                              <Form.Item
                                name={'sub_quest_require_point' + item.id}
                                rules={[
                                  {
                                    required: true,
                                    message: 'กรุณาระบุ'
                                  }
                                ]}
                                initialValue={item.sub_quest_require_point}
                                hidden={true}
                                className='mt-1'
                              >
                                <InputNumber readOnly />
                              </Form.Item>
                              <Form.Item
                                name={'hcode' + item.id}
                                hidden={true}
                                initialValue={user.hcode}
                              >
                                <Input />
                              </Form.Item>
                              <Form.Item
                                name={'userId' + item.id}
                                hidden={true}
                                initialValue={user.id}
                              >
                                <Input />
                              </Form.Item>
                              <p className='mt-6 font-bold'>{item.sub_quest_require_point}</p>
                              <div className='mt-2'>
                                {
                                  item.id === 145 || item.id === 150 || item.id === 157 || item.id === 179 || item.id === 189
                                    || item.id === 192 || item.id === 195
                                    ?
                                    <>
                                      {
                                        item.sub_quest_lists.map((it4) =>
                                          it4.sub_questId === item.id
                                            ?
                                            <p className='text-green-700'>
                                              {it4.sub_quest_require_point}
                                            </p>
                                            : <></>
                                        )
                                      }
                                    </>
                                    :
                                    <></>
                                }
                              </div>
                            </div>
                            {/* <div className='text-center border'>
                            <div className='mt-5'>
                              <Button onClick={() => showUploadItemModal(item)}>
                                <UploadOutlined /> อัปโหลด
                              </Button>
                            </div>
                          </div> */}
                          </div>
                        </>
                      ))
                    }
                  </div>
                  <div className='flex justify-center space-x-1 mt-3'>
                    <div>
                      {
                        listSubQuest.length > 0
                          ?
                          <Form.Item>
                            <Button
                              type='primary'
                              htmlType='submit'
                              style={{ width: 500 }}
                            >
                              <Save /> บันทึกผลการประเมิน
                            </Button>
                          </Form.Item>
                          : null
                      }
                    </div>
                  </div>
                </Form>
              </div>
            </>
        }

        <Modal
          title={
            <div className='flex justify-center'>
              <ExclamationCircleFilled className='text-green-600' /> &nbsp;
              <span className='text-xl font-bold'>แนบเอกสาร/หลักฐาน</span>
            </div>
          }
          open={isShowUploadModal}
          onOk={formUpload.submit}
          onCancel={closeModal}
          width={450}
          style={{ top: 20 }}
        >
          <Divider />
          <Form
            name='formUpload'
            form={formUpload}
            layout='vertical'
            onFinish={handleUpload}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name='category_questId'
              label={<b>ด้านการประเมิน</b>}
            >
              <Select
                options={[
                  {
                    value: '1',
                    label: 'ด้านโครงสร้าง'
                  }
                ]}
              />
            </Form.Item>
            <Form.Item
              name='hcode'
              label={<b>รหัสหน่วยบริการ</b>}
            >
              <Select
                options={[
                  {
                    value: user.hcode,
                    label: user.hname_th
                  }
                ]}
              />
            </Form.Item>
            <Form.Item
              name='usersId'
              label={<b>ผู้บันทึก</b>}
            >
              <Select
                options={[
                  {
                    value: user.id,
                    label: user.firstname_th + " " + user.lastname_th
                  }
                ]}
              />
            </Form.Item>
            <Form.Item
              name='file_name'
              label={<b>แนบเอกสาร/หลักฐาน</b>}
            >
              <Upload customRequest={({ onSuccess }) => onSuccess('ok')}>
                <Button>
                  <UploadOutlined /> แนบเอกสาร/หลักฐาน
                </Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title={
            <div className='flex justify-center'>
              <ExclamationCircleFilled className='text-green-600' /> &nbsp;
              <span className='text-xl font-bold'>แนบเอกสาร/หลักฐาน</span>
            </div>
          }
          open={isShowUploadItemModal}
          onOk={formUploadItem.submit}
          onCancel={closeModal}
          width={450}
          style={{ top: 20 }}
        >
          <Divider />
          <Form
            name='formUploadItem'
            form={formUploadItem}
            layout='vertical'
            onFinish={handleUploadItem}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name='category_questId'
              label={<b>ด้านการประเมิน</b>}
            >
              <Select
                options={[
                  {
                    value: itemId ? itemId.category_questId : null,
                    label: itemId ? itemId.category_quests.category_name_th : null,
                  }
                ]}
              />
            </Form.Item>
            <Form.Item
              name='questId'
              label={<b>เกณฑ์การประเมินหลัก</b>}
            >
              <Select
                options={[
                  {
                    value: itemId ? itemId.questId : null,
                    label: itemId ? itemId.quests.quest_name : null
                  }
                ]}
              />
            </Form.Item>
            <Form.Item
              name='sub_questId'
              hidden={true}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='sub_quest_name'
              label={<b>เกณฑ์การประเมินย่อย</b>}
            >
              <Input.TextArea rows={3} readOnly />
            </Form.Item>
            <Form.Item
              name='hcode'
              label={<b>รหัสหน่วยบริการ</b>}
            >
              <Select
                options={[
                  {
                    value: user.hcode,
                    label: user.hname_th
                  }
                ]}
              />
            </Form.Item>
            <Form.Item
              name='usersId'
              label={<b>ผู้บันทึก</b>}
            >
              <Select
                options={[
                  {
                    value: user.id,
                    label: user.firstname_th + " " + user.lastname_th
                  }
                ]}
              />
            </Form.Item>
            <Form.Item
              name='file_name'
              label={<b>อัปโหลดไฟล์/เอกสาร หลักฐาน</b>}
            >
              <Upload customRequest={({ onSuccess }) => onSuccess('ok')}>
                <Button>
                  <UploadOutlined /> อัปโหลดไฟล์นามสกุล (.jpg หรือ .png หรือ .pdf)
                </Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>

      </div>
    </div>
  )
}

export default FormEvaluateService