import React, { useEffect, useState } from 'react'
import useGlobalStore from '../../../store/global-store'
import { Button, Divider, Form, Image, Input, Select, Upload } from 'antd'
import { Squircle } from 'lucide-react'
import { CheckSquareFilled, UploadOutlined } from '@ant-design/icons'
import { getCyberSecurityLevelData, uploadCyberImage } from '../../../api/Evaluate'
import { toast } from 'react-toastify'

const FormCyberScuritycheck = () => {

    const user = useGlobalStore((state) => state.user)
    const token = useGlobalStore((state) => state.token)
    const [clientReady, setClientReady] = useState(false)
    const [cyberData, setCyberData] = useState({
        cyber_level: "",
        cyber_image: "",
        usersId: "",
        hcode: ""
    })

    useEffect(() => {
        setClientReady(true)
        loadCyberImageData(token)
    }, [])


    const [formCyberCheck] = Form.useForm()


    const optionCyber = [
        {
            value: 'Green',
            label: <div className='flex gap-2 pl-3 text-green-800'><p>เขียว</p><CheckSquareFilled /></div>
        },
        {
            value: 'Yellow',
            label: <div className='flex gap-2 pl-3 text-yellow-400'><p className=''>เหลือง</p><CheckSquareFilled /></div>
        },
        {
            value: 'Red',
            label: <div className='flex gap-2 pl-3 text-red-500'><p className=''>แดง</p><CheckSquareFilled /></div>
        },
    ]

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const handleSubmitForm = async (fieldValue) => {
        console.log(fieldValue)
        const formData = new FormData()
        formData.append("cyber_image", fieldValue.cyber_image.file.originFileObj)
        formData.append("cyber_level", fieldValue.cyber_level)
        formData.append("usersId", fieldValue.usersId)
        formData.append("hcode", fieldValue.hcode)

        await uploadCyberImage(token, formData)
            .then(res => {
                toast.success(res.data.message)
            })
            .catch(err => {
                console.log(err)
            })

    }

    useEffect(() => {
        formCyberCheck.setFieldsValue({
            usersId: user.id,
            hcode: user.hcode
        })
    }, [])

    const loadCyberImageData = async () => {
        await getCyberSecurityLevelData(token, user.hcode)
            .then(res => {
                setCyberData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }



    return (
        <div>
            <div className='flex justify-center items-center text-2xl font-bold mb-8 text-green-600'>
                <p className='ml-2'>ระดับ Cyber Scurity ของศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร</p>
            </div>

            <div className='bg-white rounded-md shadow-md p-3'>
                <div className='flex justify-center'>
                    <Form
                        form={formCyberCheck}
                        name='formCyberCheck'
                        layout='inline'
                        onFinish={handleSubmitForm}
                    >
                        <Form.Item
                            name={`cyber_level`}
                            label={<b>ระดับ Cyber Security ศทส.</b>}
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาเลือกระดับ Cyber!',
                                },
                            ]}
                        >
                            <Select className='' options={optionCyber} style={{ width: 200 }} placeholder='กรุณาเลือกระดับ Cyber...' />
                        </Form.Item>
                        <Form.Item
                            name={`cyber_image`}
                            label={<b>อัปโหลดไฟล์/ภาพ</b>}
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาเพิ่มภาพระดับ Cyber!',
                                },
                            ]}
                        >
                            <Upload customRequest={({ onSuccess }) => onSuccess('ok')}>
                                <Button icon={<UploadOutlined />} style={{ width: 200 }}>
                                    Click to Upload
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            name={`usersId`}
                            hidden={true}
                        >
                            <Input />

                        </Form.Item>
                        <Form.Item
                            name={`hcode`}
                            hidden={true}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item shouldUpdate>
                            {() => (
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    disabled={
                                        !clientReady ||
                                        !formCyberCheck.isFieldsTouched(true) ||
                                        !!formCyberCheck.getFieldsError().filter(({ errors }) => errors.length).length
                                    }
                                >
                                    เพิ่มข้อมูล
                                </Button>
                            )}
                        </Form.Item>
                    </Form>
                </div>
                <Divider />
                <div className='grid grid-cols-6 gap-4'>
                    <div className='col-start-2 col-span-4'>
                        <div className='flex justify-center items-center'>
                            <Image
                                className='px-1 py-1'
                                width={450}
                                src={`https://bdh-service.moph.go.th/api/smarthosp/cyber-image/${cyberData.cyber_image}`}
                            />
                        </div>

                        {/* <table className='w-full text-left table-fixed text-slate-800'>
                            <thead>
                                <tr className='text-slate-800 border border-l border-r border-slate-300 bg-slate-50'>
                                    <th className='text-center p-2 border'>รูปภาพ</th>
                                    <th className='text-center p-2 border'>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <td></td>
                                <td></td>
                            </tbody>
                        </table> */}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FormCyberScuritycheck