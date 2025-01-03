import React, { useEffect, useState } from 'react'
import useGlobalStore from '../../../store/global-store'
import { ExclamationCircleFilled, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Table, Form, InputNumber, Button, Input, Space, Select, Checkbox, Divider, Upload, Modal, Radio } from 'antd'
import { CircleCheck, CircleX, Key, LoaderCircle, Save, Square, SquareCheck } from 'lucide-react'
import { getListQuests } from '../../../api/Quest'
import { getEvaluateByHosp, getListEvaluateByHosp, getListSubQuestsForEvaluate } from '../../../api/Evaluate'
import { saveEvaluates } from '../../../api/Evaluate';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getSubQuestByID } from '../../../api/SubQuest';
import axios from 'axios';


const FormEvaluateInfraStructure_v2 = () => {

  const navigate = useNavigate()
  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)

  const [listQuest, setListQuest] = useState([])
  const [listSubQuest, setListSubQuest] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [listEvaluate, setListEvaluate] = useState([])
  const [questId, setQuestId] = useState('')
  const [subQuestById, setSubQuestById] = useState({})
  const [formEvaluate] = Form.useForm()
  const [formUpload] = Form.useForm()
  const [file, setFile] = useState()
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadItemModal, setUploadItemModal] = useState(false)
  const [itemId, setItemId] = useState()
  const [formUploadAllType] = Form.useForm()
  // console.log('Check: ', check)



  useEffect(() => {
    loadListQuest(token)
    // loadListEvaluate(token)
  }, [])


  const hcode = user.hcode
  const catId = 1
  const loadListEvaluate = async () => {
    await getEvaluateByHosp(token, catId, hcode)
      .then(res => {
        console.log('Eva: ', res.data)
        setListEvaluate(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }


  const loadListQuest = async () => {
    await getListQuests(token)
      .then(res => {
        setListQuest(res.data)
      })
      .catch(err => {
        console.log(err.response.data.message)
      })
  }


  const questData = listQuest.filter(item => item.category_questId === 1)

  const optionQuestData = questData.map((item, k1) => ({
    value: item.id,
    label: item.quest_name
  }))



  const selectQuest = async (id) => {
    setQuestId(id)
    setIsLoading(true)
    await getListSubQuestsForEvaluate(token, id)
      .then(res => {
        // console.log('Data: ', res.data)
        setListSubQuest(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))

    await getEvaluateByHosp(token, id, hcode)
      .then(res => {
        // console.log('Eva: ', res.data)
        setListEvaluate(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }



  const uniqueQuest = [...new Set(listSubQuest.map(q => q.quests.quest_name))]

  const dataSource = listSubQuest.map((item, k1) => ({ ...item, key: k1 }))

  console.log(dataSource)


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
        setTimeout(() => navigate('/smarthosp-quest/user/responder/evaluate-infrastructure'), 5000)
      })
      .catch(err => {
        console.log(err.response.data.message)
        toast.error(err.response.data.message)
      })
  }

  const showFormUpload = () => {
    setShowUploadModal(true)
  }

  const showFormUploadItem = (item) => {
    if (item) {
      setItemId(item)
    }
    setUploadItemModal(true)
  }

  const closeModal = () => {
    setShowUploadModal(false)
    setUploadItemModal(false)
  }

  //Upload File PDF
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
      setShowUploadModal(false)
    }).catch(err => {
      console.log(err.response.data)
      toast.error(err.response.data.message)
    })
  }

  //Upload all type file
  const handleUploadAllType = async (fieldValue) => {
    const formData = new FormData();
    formData.append("file_name", fieldValue.file_name.file.originFileObj)
    formData.append("category_questId", fieldValue.category_questId)
    formData.append("questId", fieldValue.questId)
    formData.append("sub_questId", fieldValue.sub_questId)
    formData.append("check", fieldValue.check)
    formData.append("hcode", fieldValue.hcode)
    formData.append("userId", fieldValue.userId)

    await axios.post(import.meta.env.VITE_APP_API + `/saveEvaluates2`, formData, {
      headers: {
        Authorization: `Bearer ` + token,
        "Content-Type": "multipart/form-data"
      }
    }).then(res => {
      toast.success(res.data.message)
      setUploadItemModal(false)
    }).catch(err => {
      console.log(err)
      toast.error('ต้องเป็นไฟล์นามสกุล .png หรือ .jpg หรือ .pdf เท่านั้น!!')
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
      formUploadAllType.setFieldsValue({
        category_questId: itemId.category_questId,
        questId: itemId.questId,
        sub_questId: itemId.id,
        sub_quest_name: itemId.sub_quest_name,
        hcode: user.hcode,
        userId: user.id
      })
    }
  })

  return (
    <div>
      <div className='flex justify-center items-center text-2xl font-bold mb-8 text-green-600'>
        <p className='ml-2'>ประเมินผลด้านโครงสร้าง (Infrastructure)</p>
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
            <Button onClick={showFormUpload}>
              <UploadOutlined /> แนบเอกสาร/หลักฐานแบบรวมไฟล์ (PDF)
            </Button>
          </div>
        </div>
        <Divider />

        <div>
          <div className='my-2'>
            <p
              className='text-lg ml-4 font-bold text-yellow-900'
            >
              <u>{uniqueQuest}</u>
            </p>
          </div>

          <div
            className=''
          >
            <div className='grid grid-cols-7 ml-10 bg-slate-100 text-md text-slate-950'>
              <div className='col-span-4 text-center border'>
                <p className='font-bold p-2'>รายการ</p>
              </div>
              {/* <div className='text-center border'>
                  <p className='font-bold p-2'>จำเป็นดำเนินการ</p>
                </div> */}
              <div className='text-center border'>
                <p className='font-bold p-2'>คะแนนเต็ม</p>
              </div>
              <div className='text-center border'>
                <p className='font-bold p-2'>คะแนนจำเป็น</p>
              </div>
              <div className='text-center border'>
                <p className='font-bold p-2'>ภาพหลักฐาน</p>
              </div>
            </div>
            {
              dataSource.map((item, k1) => (
                <>
                  <div className='grid grid-cols-7 ml-10'>
                    <div className='col-span-4 border'>
                      <p
                        className='p-2 font-bold'
                      >
                        {item.sub_quest_name}
                      </p>
                    </div>
                    <div className='text-center border'>
                      <p className='mt-6 font-bold'>{item.sub_quest_total_point}</p>
                    </div>
                    <div className='text-center border'>
                      <p className='mt-6 font-bold'>{item.sub_quest_require_point}</p>
                    </div>
                    <div className='text-center border'>
                      <div className='mt-5'>
                        <Button onClick={() => showFormUploadItem(item)}>
                          ประเมินผล
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              ))
            }
          </div>
        </div>


        <Modal
          title={
            <div className='flex justify-center'>
              <ExclamationCircleFilled className='text-green-600' /> &nbsp;
              <span className='text-xl font-bold'>แนบเอกสาร/หลักฐาน</span>
            </div>
          }
          open={showUploadModal}
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
              <span className='text-xl font-bold'>ประเมินผลด้านโครงสร้าง</span>
            </div>
          }
          open={uploadItemModal}
          onOk={formUploadAllType.submit}
          onCancel={closeModal}
          width={450}
          style={{ top: 20 }}
        >
          <Divider />
          <Form
            name='formUploadAllType'
            form={formUploadAllType}
            layout='vertical'
            onFinish={handleUploadAllType}
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
              <Input.TextArea rows={7} readOnly />
            </Form.Item>
            <Form.Item
              name='hcode'
              label={<b>หน่วยบริการ</b>}
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
              name='check'
              label={<b>ตัวเลือกการประเมินผล</b>}
            >
              <Radio.Group>
                <Space direction='vertical'>
                  <Radio value="true" className='text-green-700'>มีการดำเนินการ</Radio>
                  <Radio value="false" className='text-red-700'>ไม่มีการดำเนินการ</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name='userId'
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

export default FormEvaluateInfraStructure_v2