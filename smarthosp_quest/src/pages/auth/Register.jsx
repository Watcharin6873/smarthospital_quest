import React, { useEffect, useState } from 'react'
import UseTitle from '../../utills/UseTitle'
import { Form, Select, Button, Input, Modal, Radio, Space } from 'antd';
import LogoSmartHosp from '../../assets/SmartHospital-Logo.png'
import ProviderID from '../../assets/Plogo-f6506bc1.png'
import Logo30Bath from '../../assets/new_30Bath.jpg'
import useGlobalStore from '../../store/global-store'
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProviderProfile, getTokenHealthID, getTokenProviderID, registerByProviderID } from '../../api/Auth';
import { ExclamationCircleFilled } from '@ant-design/icons';

const Register = () => {

  UseTitle('Login เข้าใช้งาน')
  const navigate = useNavigate()
  const myParam = useLocation().search
  const actionLogin = useGlobalStore((state) => state.actionLogin)
  const user = useGlobalStore((state) => state.user)
  const [providerProfile, setProviderProfile] = useState([])
  const [modalListHosp, setModalListHosp] = useState(false)
  const [value, setValue] = useState({
    hcode: "",
    hname_th: "",
    position_id: "",
    position: "",
    address: ""
  })
  const [registerModal, setRegisterModal] = useState(false)
  const [formCreateUser] = Form.useForm()

  const code = new URLSearchParams(myParam).get("code")
  // console.log('Code:', code)

  if (code) {
    const values = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'https://bdh-service.moph.go.th/smarthosp-quest/register/',
      // redirect_uri: 'http://localhost:5173/smarthosp-quest/register/',
      client_id: '019274d1-ac2a-7352-b73a-ca66a5b135fb',
      client_secret: '97e76d1d6eff9ac1ee377d598c0fe995f018a9c3'
    }
    getTokenHealthID(values)
      .then(res => {
        const h_token = res.data.data.access_token
        const values2 = {
          client_id: '49fba4c4-2c60-4d3f-b8da-3925d1ad7e65',
          secret_key: 'F83E767464E7334923C43D1C1443B',
          token_by: 'Health ID',
          token: h_token
        }
        getTokenProviderID(values2)
          .then(res => {
            // console.log("HealthData: ", res.data)
            const access_token = res.data.data.access_token;
            const client_id = '49fba4c4-2c60-4d3f-b8da-3925d1ad7e65';
            const secret_key = 'F83E767464E7334923C43D1C1443B';

            getProviderProfile(access_token, client_id, secret_key)
              .then(res => {
                // console.log("ProviderProfile: ", res.data.data)
                setProviderProfile(res.data.data)
                const lenghtHosp = res.data.data.organization
                if (lenghtHosp.length > 0) {
                  setModalListHosp(true)
                } else {
                  setValue(lenghtHosp)
                  setRegisterModal(true)
                }
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err)
      })
  }
  const listHosp = providerProfile.organization

  const onOk = () => {
    setModalListHosp(false)
  }

  const cancelModal = () => {
    setModalListHosp(false)
    setRegisterModal(false)
  }

  const onRadioChange = (e) => {
    setValue(e.target.value)
    setModalListHosp(false)
    setRegisterModal(true)
  }

  const providerData = {
    email: providerProfile.email,
    title_th: providerProfile.title_th,
    firstname_th: providerProfile.firstname_th,
    lastname_th: providerProfile.lastname_th,
    hcode: value.hcode,
    hname_th: value.hname_th,
    position_id: value.position_id,
    position: value.position,
    address: value.address,
    level: "4",
    objective: "responder"
  }

  // console.log('HospValue: ', providerData)

  useEffect(() => {
    formCreateUser.setFieldsValue({
      hcode: providerData.hcode,
      hname_th: providerData.hname_th,
      email: providerData.email,
      title_th: providerData.title_th,
      firstname_th: providerData.firstname_th,
      lastname_th: providerData.lastname_th,
      position_id: providerData.position_id,
      position: providerData.position,
      district: providerData.address.district,
      province: providerData.address.province,
      // zone: '',
      level: providerData.level,
      objective: providerData.objective
    })
  })


  const optionZone = [
    {value:'01', label:'เขตสุขภาพที่ 1'},
    {value:'02', label:'เขตสุขภาพที่ 2'},
    {value:'03', label:'เขตสุขภาพที่ 3'},
    {value:'04', label:'เขตสุขภาพที่ 4'},
    {value:'05', label:'เขตสุขภาพที่ 5'},
    {value:'06', label:'เขตสุขภาพที่ 6'},
    {value:'07', label:'เขตสุขภาพที่ 7'},
    {value:'08', label:'เขตสุขภาพที่ 8'},
    {value:'09', label:'เขตสุขภาพที่ 9'},
    {value:'10', label:'เขตสุขภาพที่ 10'},
    {value:'11', label:'เขตสุขภาพที่ 11'},
    {value:'12', label:'เขตสุขภาพที่ 12'},
    {value:'13', label:'เขตสุขภาพที่ 13'},
  ]



  const onFinish = async (values) => {
    console.log(values)
    await registerByProviderID(values)
      .then(res => {
        toast.success(res.data.message)
        setRegisterModal(false)
        setTimeout(() => navigate('/smarthosp-quest/login'), 5000)
      })
      .catch(err => {
        console.log(err)
        toast.warning(err.response.data.message)
      })
  }


  const onFinishFailed = (errorInfo) => {
    console.log('Failed', errorInfo)
  }


  return (
    <div className='grid grid-cols-3 gap-4'>
      <div></div>
      <div>
        <div className='bg-white rounded-md shadow-md w-full p-2'>
          {/* Headeer */}

          {/* Right form */}
          <div className='w-full'>
            <div className='flex justify-center items-center mb-5'>
              <img className='mt-5' src={LogoSmartHosp} />
            </div>
            <div className='text-lg flex justify-center mb-4'>
              <h1 style={{ color: '#037840' }}>ลงทะเบียนใช้งานด้วย</h1>
            </div>
            <div>
              <Button
                className='h-12'
                block
                href='https://moph.id.th/oauth/redirect?client_id=019274d1-ac2a-7352-b73a-ca66a5b135fb&redirect_uri=https://bdh-service.moph.go.th/smarthosp-quest/register/&response_type=code'
                // href='https://moph.id.th/oauth/redirect?client_id=019274d1-ac2a-7352-b73a-ca66a5b135fb&redirect_uri=http://localhost:5173/smarthosp-quest/register/&response_type=code'
                // disabled
              >
                <img
                  className='w-32 p-2'
                  src={ProviderID} />
              </Button>
            </div>
          </div>
        </div>
        <Modal
          title={
            <div
              style={{
                justifyContent: 'center',
                display: 'flex',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            >
              <ExclamationCircleFilled style={{ color: 'orange' }} /> &nbsp;
              <span>เลือกหน่วยบริการที่ต้องการล็อกอิน</span>
            </div>
          }
          open={modalListHosp}
          onOk={onOk}
          onCancel={cancelModal}
          footer={null}
          width={400}
          style={{ top: 20 }}
        >
          <hr />
          <Radio.Group onChange={onRadioChange}>
            <Space direction='vertical'>
              {listHosp && listHosp.map((item, index) => (
                <Radio.Button
                  key={index}
                  value={item}
                  style={{ width: '350px' }}
                >
                  {item.hname_th + ' [' + item.hcode + ']'}
                </Radio.Button>
              ))}
            </Space>
          </Radio.Group>
        </Modal>

        <Modal
          title={
            <div className='flex justify-center'>
              <ExclamationCircleFilled style={{ color: 'orange' }} /> &nbsp;
              <span className='text-xl font-bold'>ลงทะเบียนเข้าใช้งาน</span>
            </div>
          }
          open={registerModal}
          onOk={formCreateUser.submit}
          onCancel={cancelModal}
          width={1000}
          style={{ top: 20 }}
        >
          <Form
            name='formCreateUser'
            form={formCreateUser}
            layout='vertical'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className='mt-2'
          >
            <div className='flex'>
              <div className='w-full p-2'>
                <div className='border rounded-md px-2 py-2 mb-2 h-full'>
                  <div className='flex justify-center'>
                    <p className='text-lg font-bold m-2'><u>ข้อมูลบุคคล</u></p>
                  </div>
                  {/* <Form.Item
                    name='title_th'
                    label={<b>คำนำหน้าชื่อ :</b>}
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    style={{ marginBottom: '10px' }}
                  >
                    <Input readOnly />
                  </Form.Item> */}
                  <Form.Item
                    name='firstname_th'
                    label={<b>ชื่อ :</b>}
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    style={{ marginBottom: '10px' }}
                  >
                    <Input readOnly />
                  </Form.Item>
                  <Form.Item
                    name='lastname_th'
                    label={<b>นามสกุล :</b>}
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    style={{ marginBottom: '10px' }}
                  >
                    <Input readOnly />
                  </Form.Item>
                  <Form.Item
                    name='position_id'
                    label={<b>รหัสตำแหน่ง :</b>}
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    style={{ marginBottom: '10px' }}
                  >
                    <Input readOnly />
                  </Form.Item>
                  <Form.Item
                    name='position'
                    label={<b>ตำแหน่ง :</b>}
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    style={{ marginBottom: '10px' }}
                  >
                    <Input readOnly />
                  </Form.Item>
                  <Form.Item
                    name='email'
                    label={<b>อีเมล :</b>}
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    style={{ marginBottom: '10px' }}
                  >
                    <Input readOnly />
                  </Form.Item>
                </div>
              </div>
              <div className='w-full p-2'>
                <div className='border rounded-md px-2 py-2 mb-2 h-full'>
                  <div className='flex justify-center'>
                    <p className='text-lg font-bold m-2'><u>ที่อยู่หน่วยบริการ</u></p>
                  </div>
                  <Form.Item
                    name='hcode'
                    label={<b>รหัสหน่วยบริการ :</b>}
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    style={{ marginBottom: '10px' }}
                  >
                    <Input readOnly />
                  </Form.Item>
                  <Form.Item
                    name='hname_th'
                    label={<b>ชื่อหน่วยบริการ :</b>}
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    style={{ marginBottom: '10px' }}
                  >
                    <Input readOnly />
                  </Form.Item>
                  {/* <Form.Item
                    name='sub_district'
                    label={<b>ตำบล :</b>}
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    style={{ marginBottom: '10px' }}
                  >
                    <Input readOnly />
                  </Form.Item> */}
                  <Form.Item
                    name='district'
                    label={<b>อำเภอ :</b>}
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    style={{ marginBottom: '10px' }}
                  >
                    <Input readOnly />
                  </Form.Item>
                  <Form.Item
                    name='province'
                    label={<b>จังหวัด :</b>}
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    style={{ marginBottom: '10px' }}
                  >
                    <Input readOnly />
                  </Form.Item>
                  <Form.Item
                    name='zone'
                    label={<b>เขตสุขภาพ :</b>}
                    rules={[
                      {
                        required: true,
                        message:'กรุณาระบุเขตสุขภาพ!'
                      }
                    ]}
                    style={{ marginBottom: '10px' }}
                    
                  >
                    <Select options={optionZone} placeholder="กรุณาระบุเขตสุขภาพ..." />
                  </Form.Item>
                </div>
              </div>
              <div className='w-full p-2'>
                <div className='border rounded-md px-2 py-2 mb-2 h-full'>
                  <div className='flex justify-center'>
                    <p className='text-lg font-bold m-2'><u>ระดับหน่วยงาน</u></p>
                  </div>
                  <Form.Item
                    name='level'
                    label={<b>ระดับหน่วยงาน :</b>}
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    style={{ marginBottom: '10px' }}
                  >
                    <Radio.Group onChange={(e)=>e.target.value}>
                      <Space direction='vertical'>
                        <Radio value='4'>หน่วยบริการ</Radio>
                        <Radio value='3'>จังหวัด</Radio>
                        <Radio value='2'>เขตสุขภาพ</Radio>
                        <Radio value='1'>ส่วนกลาง</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    name='objective'
                    label={<b>ประเภทผู้ใช้ :</b>}
                    rules={[
                      {
                        required: true,
                      }
                    ]}
                    style={{ marginBottom: '10px' }}
                  >
                    <Radio.Group onChange={(e)=>e.target.value}>
                      <Space direction='vertical'>
                        <Radio value='zone_approve'>คกก.รพ.อัจฉริยะเขตฯ Approve</Radio>
                        <Radio value='prov_approve'>คกก.รพ.อัจฉริยะ สสจ. Approve</Radio>
                        <Radio value='responder'>ผู้ประเมินโรงพยาบาลตนเอง</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>

                </div>
              </div>
            </div>
          </Form>
        </Modal>



      </div>
      <div></div>
    </div>
  )
}

export default Register