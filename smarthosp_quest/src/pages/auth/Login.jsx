import React, { useEffect, useState } from 'react'
import UseTitle from '../../utills/UseTitle'
import { Form, Select, Button, Input, Modal, Radio, Space } from 'antd';
import LogoSmartHosp from '../../assets/SmartHospital-Logo.png'
import ProviderID from '../../assets/Plogo-f6506bc1.png'
import Logo30Bath from '../../assets/new_30Bath.jpg'
import useGlobalStore from '../../store/global-store'
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { getProviderProfile, getTokenHealthID, getTokenProviderID } from '../../api/Auth';
import { ExclamationCircleFilled } from '@ant-design/icons';

const Login = () => {

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
  const [formLogin] = Form.useForm()

  const code = new URLSearchParams(myParam).get("code")

  if (code) {
    const values = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'https://bdh-service.moph.go.th/smarthosp-quest/login/',
      // redirect_uri: 'http://localhost:5173/smarthosp-quest/login/',
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

            const access_token = res.data.data.access_token;
            const client_id = '49fba4c4-2c60-4d3f-b8da-3925d1ad7e65';
            const secret_key = 'F83E767464E7334923C43D1C1443B';

            getProviderProfile(access_token, client_id, secret_key)
              .then(res => {
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
                console.log(err.response.data)
              })
          })
          .catch(err => {
            console.log(err.response.data)
          })
      })
      .catch(err => {
        console.log(err.response.data)
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
  }

  const providerData = {
    email: providerProfile.email,
    firstname_th: providerProfile.firstname_th,
    lastname_th: providerProfile.lastname_th,
    hcode: value.hcode
  }


  const handleSubmit = (fieldValues) => {
    
    const values = {
      email: providerProfile.email,
      firstname_th: providerProfile.firstname_th,
      lastname_th: providerProfile.lastname_th,
      hcode: fieldValues.hospital.hcode,
      level: fieldValues.level,
      objective: fieldValues.objective
    }

    console.log('Values: ', values)
    actionLogin(values)
    const role = user.role
    const objective = user.objective
    if (role) {
      setModalListHosp(false)
      toast.success(`ยินดีต้อนรับคุณ ${user.firstname_th + ' ' + user.lastname_th}`)
    }
    {
      role === 'admin' && objective === 'Administrator'
        ? setTimeout(() => navigate('/smarthosp-quest/admin'), 5000)
        : role === 'user' && objective === 'responder'
          ? setTimeout(() => navigate('/smarthosp-quest/user/responder'), 5000)
          : role === 'user' && objective === 'prov_approve'
            ? setTimeout(() => navigate('/smarthosp-quest/user/prov-approve'), 5000)
            : role === 'user' && objective === 'zone_approve'
              ? setTimeout(() => navigate('/smarthosp-quest/user/zone-approve'), 5000)
              : null
    }
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
              <h1 style={{ color: '#037840' }}>ล็อกอินเข้าใช้งานด้วย</h1>
            </div>
            <div>
              <Button
                className='h-12'
                block
                href='https://moph.id.th/oauth/redirect?client_id=019274d1-ac2a-7352-b73a-ca66a5b135fb&redirect_uri=https://bdh-service.moph.go.th/smarthosp-quest/login/&response_type=code'
                // href='https://moph.id.th/oauth/redirect?client_id=019274d1-ac2a-7352-b73a-ca66a5b135fb&redirect_uri=http://localhost:5173/smarthosp-quest/login/&response_type=code'
                // disabled
              >
                <img
                  className='w-32 p-2'
                  src={ProviderID} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div></div>
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
        onCancel={cancelModal}
        footer={null}
        width={400}
        style={{ top: 20 }}
      >
        <hr />
        <Form
          name='form-login'
          layout='vertical'
          onFinish={handleSubmit}
        >
          <Form.Item
            name='hospital'
            label={<b>หน่วยบริการ :</b>}
            rules={[
              {
                required: true,
                message: 'กรุณาคลิกเลือกหน่วยบริการ'
              }
            ]}
          >
            <Radio.Group onChange={(e) => e.target.value}>
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
          </Form.Item>
          <Form.Item
            name='level'
            label={<b>ระดับหน่วยงาน :</b>}
            rules={[
              {
                required: true,
                message: 'กรุณาเลือกระดับหน่วยงาน'
              }
            ]}
          >
            <Radio.Group onChange={(e) => e.target.value}>
              <Space direction='vertical'>
                <Radio value='4'>หน่วยบริการ</Radio>
                <Radio value='3'>จังหวัด</Radio>
                <Radio value='2'>เขตสุขภาพ</Radio>
                <Radio value='1'>ส่วนกลาง (กระทรวงสาธารณสุข)</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          {/* <Form.Item
            name='objective'
            label={<b>ประเภทผู้ใช้ :</b>}
            rules={[
              {
                required: true,
                message: 'กรุณาเลือกระดับหน่วยงาน'
              }
            ]}
          >
            <Radio.Group onChange={(e) => e.target.value}>
              <Space direction='vertical'>
                <Radio value='zone_approve'>คกก.รพ.อัจฉริยะเขตฯ Approve</Radio>
                <Radio value='prov_approve'>คกก.รพ.อัจฉริยะ สสจ. Approve</Radio>
                <Radio value='responder'>โรงพยาบาลประเมินตนเอง</Radio>
              </Space>
            </Radio.Group>
          </Form.Item> */}
          <Form.Item>
            <Button block type="primary" htmlType="submit" size=''>
              ล็อกอินเข้าใช้งาน
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Login