import React, { useEffect, useState } from 'react'
import useGlobalStore from '../../store/global-store'
import { getDocumentsFromEvaluate, getEvaluateById, getListEvaluateByHosp, refreshEvaluate, saveDocuments, updatePointEvaluate } from '../../api/Evaluate'
import { CircleCheck, CircleX, FilePenLine, LoaderCircle, MonitorCheck, RefreshCw } from 'lucide-react'
import { getListTopic } from '../../api/Topic'
import { Button, Checkbox, Divider, Form, Input, InputNumber, Modal, Radio, Select, Upload } from 'antd'
import { getListQuests } from '../../api/Quest'
import { ExclamationCircleFilled, UploadOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import axios from 'axios'

const FormReportHosp = () => {

    const user = useGlobalStore((state) => state.user)
    const token = useGlobalStore((state) => state.token)
    const [listCategoryQuest, setListCategoryQuest] = useState([])
    const [listQuest, setListQuest] = useState([])
    const [listEvaluate, setListEvaluate] = useState([])
    const [evaluateById, setEvaluateById] = useState({})
    const [searchCategory, setSearchCategory] = useState([])
    const [searchQuest, setSearchQuest] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [isModalUploadOpen, setIsModalUploadOpen] = useState(false)
    const [formUpdate] = Form.useForm()
    const [formUpload] = Form.useForm()
    const [category_questId, setCategory_questtId] = useState('')
    const [listDocuments, setListDocuments] = useState([])

    useEffect(() => {
        loadListEvaluate(token)
        loadListCategoryQuest(token)
        loadListQuest(token)
    }, [])

    const loadListCategoryQuest = async () => {
        await getListTopic(token)
            .then(res => {
                setListCategoryQuest(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const optionCategory = listCategoryQuest.map((item) => ({
        value: item.id,
        label: item.category_name_th,
        key: item.id
    }))

    const loadListQuest = async () => {
        await getListQuests(token)
            .then(res => {
                setListQuest(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const hcode = user.hcode
    const loadListEvaluate = async () => {
        setIsLoading(true)
        await getListEvaluateByHosp(token, hcode)
            .then(res => {
                console.log(res.data)
                setListEvaluate(res.data)
                searchCategory(res.data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setIsLoading(false))
    }


    const selectCategoryQuest = (e) => {
        setCategory_questtId(e)
        setSearchCategory(listEvaluate.filter(f => f.category_questId === e))
        setSearchQuest(listQuest.filter(f => f.category_questId === e))
    }

    console.log('Data: ', searchCategory)

    // const refreshData = async (category_questId, hcode) => {
    //     console.log({
    //         category_questId,
    //         hcode
    //     })
    //     setIsLoading(true)
    //     await refreshEvaluate(token, category_questId, hcode)
    //         .then(res => {
    //             setListEvaluate(res.data)
    //         })
    //         .catch(err => {
    //             console.log(err.response.data)
    //         })
    //         .finally(() => setIsLoading(false))
    // }


    const showUploadModal = async (id) => {
        setIsModalUploadOpen(true)
        await getEvaluateById(token, id)
            .then(res => {
                setEvaluateById(res.data)
                refreshData(category_questId, hcode)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        formUpload.setFieldsValue({
            evaluateId: evaluateById.id
        })
    })



    const showUpdateModal = async (id) => {
        setIsModalUpdateOpen(true)
        await getEvaluateById(token, id)
            .then(res => {
                setEvaluateById(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }


    useEffect(() => {
        formUpdate.setFieldsValue({
            category_questId: evaluateById.category_questId,
            questId: evaluateById.questId,
            sub_questId: evaluateById.sub_questId,
            description: evaluateById.description,
            necessary: evaluateById.necessary,
            sub_quest_total_point: evaluateById.sub_quest_total_point,
            sub_quest_require_point: evaluateById.sub_quest_require_point,
            hcode: evaluateById.hcode,
            userId: evaluateById.userId
        })
    })

    const handleUpdateEvaluate = async (fieldValue) => {
        const values = {
            ...fieldValue, id: evaluateById.id
        }
        await updatePointEvaluate(token, values)
            .then(res => {
                toast.success(res.data.message)
                setIsModalUpdateOpen(false)
                refreshData(category_questId, hcode)
            })
            .catch(err => {
                console.log(err.response.data.message)
                toast.error(err.response.data.message)
            })
    }

    const handleUpload = async (fieldValue) => {
        const formData = new FormData();
        formData.append("documents", fieldValue.document.file.originFileObj)
        // formData.append("evaluateId", fieldValue.evaluateId)


        await axios.put(import.meta.env.VITE_APP_API + `/saveDocuments/` + evaluateById.id, formData, {
            headers: {
                Authorization: `Bearer ` + token,
                "Content-Type": "multipart/form-data"
            }
        }).then(res => {
            toast.success(res.data.message)
            setIsModalUploadOpen(false)
            refreshData(category_questId, hcode)
        }).catch(err => {
            console.log(err.response.data)
            toast.error(err.response.data.message)
        })
    }


    const onFinishFailed = (errorInfo) => {
        console.log('Failed: ', errorInfo)
    }


    const closeModal = () => {
        setIsModalUpdateOpen(false)
        setIsModalUploadOpen(false)
    }






    return (
        <div>
            <div className='flex justify-center items-center text-2xl font-bold mb-8 text-green-600'>
                <MonitorCheck /> <p className='ml-2'> รายงานผลการประเมินโรงพยาบาลอัจฉริยะ ประจำปีงบประมาณ 2568</p>
            </div>
            <div className='bg-white rounded-md shadow-md p-3'>

                <div className='flex justify-center items-center space-x-1'>
                    <p className='font-bold'>ด้านการประเมิน : </p>
                    <Select
                        onChange={(e) => selectCategoryQuest(e)}
                        options={optionCategory}
                        placeholder='กรุณาเลือกด้านการประเมินที่ต้องการ...'
                        style={{ width: '20%' }}
                    />
                    {/* <Button onClick={() => refreshData(category_questId, hcode)}>
                        <RefreshCw /> Refresh
                    </Button> */}
                </div>
                <Divider />
                <div>
                    {
                        isLoading
                            ?
                            <>
                                <div className='flex justify-center items-center'>
                                    <LoaderCircle className='w-16 h-16 text-blue-400 animate-spin' />
                                </div>
                            </>
                            :
                            <>
                                <table className='text-left table-fixed w-full min-w-screen text-slate-800'>
                                    <thead className=''>
                                        <tr
                                            className='text-md text-slate-500 border border-l border-r border-slate-300 bg-slate-50'
                                            style={{ fontSize: '15px' }}
                                        >
                                            <th className='text-center p-4 border-r' style={{ width: 500 }}>เกณฑ์การประเมิน</th>
                                            <th className='text-center p-4 border-r'>จำเป็นดำเนินการ</th>
                                            <th className='text-center p-4 border-r'>คะแนนเต็ม</th>
                                            <th className='text-center p-4 border-r'>คะแนนจำเป็น</th>
                                            <th className='text-center p-4 border-r'>เอกสาร/หลักฐาน</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {searchQuest.map((item1, k1) => (
                                            <>
                                                <tr key={k1} className='border'>
                                                    <td className='p-1 text-amber-950 font-bold' colSpan={5}>{item1.quest_name}</td>
                                                </tr>
                                                {searchCategory.map((item2, k2) => (
                                                    item1.id === item2.questId
                                                        ?
                                                        <tr key={k2} className='border'>
                                                            <td className='pl-5 pr-1 py-1 border-r w-screen' style={{ fontSize: '15px' }}>
                                                                <p className='font-bold'>{item2.sub_quest_name}</p>
                                                                <div className='flex gap-1 ml-16 p-2'>
                                                                    <Checkbox checked />                                                                    
                                                                    <p className={
                                                                        item2.sub_quest_listname === 'ไม่มีการดำเนินการ'
                                                                            ? 'text-red-700'
                                                                            : 'text-green-700'
                                                                    }>
                                                                        {item2.sub_quest_listname}                                                                        
                                                                    </p>
                                                                </div>
                                                            </td>
                                                            <td className='text-center border-r px-1' style={{ fontSize: '15px' }}>
                                                                <div className='flex justify-center'>
                                                                    {
                                                                        item2.necessary === 1
                                                                            ? <CircleCheck size={18} className='text-green-600' />
                                                                            : <CircleX size={18} className='text-red-500' />
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td className='text-center border-r'>
                                                                <p className='font-bold'>{item2.sub_quest_total_point}</p>
                                                            </td>
                                                            <td className='text-center border-r' style={{ fontSize: '15px' }}>
                                                                <p className='font-bold'>{item2.sub_quest_require_point}</p>
                                                            </td>
                                                            <td className='text-center border-r' style={{ fontSize: '15px' }}>

                                                            </td>
                                                        </tr>
                                                        : null
                                                ))}
                                            </>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                    }

                    {/* Modal Update data */}
                    <Modal
                        title={
                            <div className='flex justify-center'>
                                <ExclamationCircleFilled className='text-yellow-500' /> &nbsp;
                                <span className='text-xl font-bold'>แก้ไขคะแนนหัวข้อการประเมิน</span>
                            </div>
                        }
                        open={isModalUpdateOpen}
                        onOk={formUpdate.submit}
                        onCancel={closeModal}
                        width={450}
                        style={{ top: 20 }}
                    >
                        <Form
                            name='formUpdate'
                            form={formUpdate}
                            layout='vertical'
                            onFinish={handleUpdateEvaluate}
                            onFinishFailed={onFinishFailed}
                            className='mt-2'
                        >
                            <Form.Item
                                name='hcode'
                                label={<b>หน่วยบริการ</b>}
                            >
                                <div className='p-1 border rounded-md'>
                                    {
                                        evaluateById.hcode
                                            ? user.hname_th + " [" + evaluateById.hcode + "]"
                                            : null
                                    }
                                </div>
                            </Form.Item>
                            <Form.Item
                                name='category_questId'
                                label={<b>ด้านการประเมิน</b>}
                            >
                                <div className='p-1 border rounded-md'>
                                    {
                                        evaluateById.category_questId
                                            ? evaluateById.category_quests.category_name_th
                                            : null
                                    }
                                </div>
                            </Form.Item>
                            <Form.Item
                                name='questId'
                                label={<b>เกณฑ์หลัก</b>}
                            >
                                <div className='p-1 border rounded-md'>
                                    {
                                        evaluateById.questId
                                            ? evaluateById.quests.quest_name
                                            : null
                                    }
                                </div>
                            </Form.Item>
                            <Form.Item
                                name='sub_questId'
                                label={<b>เกณฑ์ย่อย</b>}
                            >
                                <div className='p-1 border rounded-md'>
                                    {
                                        evaluateById.sub_questId
                                            ? evaluateById.sub_quests.sub_quest_name
                                            : null
                                    }
                                </div>
                            </Form.Item>
                            <Form.Item
                                name='description'
                                label={<b>คำอธิบาย/คำชี้แจงเพิ่มเติม</b>}
                            >
                                <div className='p-1 border rounded-md'>
                                    {
                                        evaluateById.description ? evaluateById.description : 'ไม่ระบุ'
                                    }
                                </div>
                            </Form.Item>
                            <Form.Item
                                name='necessary'
                                label={<b>จำเป็นต้องดำเนินการ</b>}
                            >
                                <div className='p-1 border rounded-md'>
                                    {
                                        evaluateById.necessary
                                            ? 'จำเป็น'
                                            : 'ไม่จำเป้น'
                                    }
                                </div>
                            </Form.Item>
                            <div className='flex justify-between'>
                                <div>
                                    <Form.Item
                                        name='sub_quest_total_point'
                                        label={<b>คะแนนเต็ม</b>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'ระบุคะแนนเต็ม'
                                            }
                                        ]}
                                    >
                                        <InputNumber className='ml-2' />
                                    </Form.Item>
                                </div>
                                <div>
                                    <Form.Item
                                        name='sub_quest_require_point'
                                        label={<b>คะแนนจำเป็นต้องดำเนินการ</b>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'ระบุคะแนนจำเป็น'
                                            }
                                        ]}
                                    >
                                        <InputNumber className='ml-2' />
                                    </Form.Item>
                                </div>
                            </div>
                            <Form.Item
                                name='userId'
                                label={<b>ผู้ประเมิน</b>}
                            >
                                <div className='p-1 border rounded-md'>
                                    {
                                        evaluateById.userId
                                            ? user.firstname_th + " " + user.lastname_th
                                            : null
                                    }
                                </div>
                            </Form.Item>
                        </Form>
                    </Modal>


                </div>
            </div>
        </div>
    )
}

export default FormReportHosp