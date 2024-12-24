import React, { useEffect, useState } from 'react'
import useGlobalStore from '../../store/global-store'
import { CircleHelp, FilePenLine, Grid2x2Check, LoaderCircle, Plus, Trash2 } from 'lucide-react'
import { createTopic, getListTopic, getTopicByID, removeTopic, updateTopic } from '../../api/Topic'
import { Form, Input, Modal, Table } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistExtra from 'dayjs/plugin/buddhistEra'
import { EditOutlined, ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'


dayjs.extend(buddhistExtra)
const { confirm } = Modal

const FormTopics = () => {

    const token = useGlobalStore((state) => state.token)
    const [listTopics, setListTopics] = useState([])
    const [topic, setTopic] = useState([])
    const [searchQuery, setSearchQuery] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [modalCreate, setModalCreate] = useState(false)
    const [modalUpdate, setModalUpdate] = useState(false)
    const [formCreate] = Form.useForm()
    const [formUpdate] = Form.useForm()

    //Load Data
    useEffect(() => {
        loadListTopic(token)
    }, [])

    const loadListTopic = async (token) => {
        setIsLoading(true)
        await getListTopic(token)
            .then(res => {
                setListTopics(res.data)
                setSearchQuery(res.data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setIsLoading(false))
    }

    //Filter
    const handleFilter = (e) => {
        setSearchQuery(listTopics.filter(f =>
            f.category_name_th.toLowerCase().includes(e.target.value) ||
            f.category_name_eng.toLowerCase().includes(e.target.value)
        ))
    }

    //DataSource Tabale
    const dataSouce = searchQuery.map((item, index) => ({
        ...item,
        key: index
    }))

    //Coulumn Table
    const columns = [
        {
            title: 'ลำดับ',
            align: 'center',
            render: ({ key }) =>
                <>
                    <span style={{ fontSize: '14px' }}>{key + 1}</span>
                </>
        },
        {
            title: <p className='text-center'>ชื่อด้าน (ไทย)</p>,
            render: ({ category_name_th }) =>
                <>
                    <span style={{ fontSize: '14px' }}>{category_name_th}</span>
                </>
        },
        {
            title: <p className='text-center'>ชื่อด้าน (อังกฤษ)</p>,
            render: ({ category_name_eng }) =>
                <>
                    <span style={{ fontSize: '14px' }}>{category_name_eng}</span>
                </>
        },
        {
            title: 'ปีงบประมาณ',
            align: 'center',
            render: ({ fiscal_year }) =>
                <>
                    <span style={{ fontSize: '14px' }}>{fiscal_year}</span>
                </>
        },
        {
            title: 'วันที่เพิ่ม',
            align: 'center',
            render: ({ createdAt }) =>
                <>
                    <span style={{ fontSize: '14px' }}>{dayjs(createdAt).locale('th').format('DD MMM BB')}</span>
                </>
        },
        {
            title: 'วันที่แก้ไข',
            align: 'center',
            render: ({ updatedAt }) =>
                <>
                    <span style={{ fontSize: '14px' }}>{dayjs(updatedAt).locale('th').format('DD MMM BB')}</span>
                </>
        },
        {
            title: 'จัดการ',
            align: 'center',
            render: ({ id }) =>
                <>
                    <div>
                        <button
                            className='mr-1 px-4 border rounded-full py-1 bg-yellow-400 hover:bg-yellow-500 shadow-md text-white'
                            onClick={() => showUpdateModal(id)}
                        >
                            <FilePenLine size={16} />
                        </button>
                        <button
                            className='px-4 border rounded-full py-1 bg-red-500 hover:bg-red-600 shadow-md text-white'
                            onClick={() => handleRemoveData(id)}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </>
        }
    ]

    //Show create modal
    const createModal = () => {
        setModalCreate(true)
    }

    //Close modal
    const closeModal = () => {
        setModalCreate(false)
        setModalUpdate(false)
    }

    //InitiallValue form create
    useEffect(() => {
        formCreate.setFieldsValue({
            category_name_th: "",
            category_name_eng: "",
            fiscal_year: "2568"
        })
    })

    //Save Topic
    const handleCreateTopic = async (fieldValues) => {
        console.log('FieldValues: ', fieldValues)
        createTopic(token, fieldValues)
            .then(res => {
                toast.success(res.data.message)
                loadListTopic(token)
                setModalCreate(false)
            })
            .catch(err => {
                toast.warning(err.response.data.message)
            })
    }

    //onFinishFailed
    const onFinishFailed = (errorInfo) => {
        console.log('Fialed: ', errorInfo)
    }

    //Show update modal
    const showUpdateModal = async (id) => {
        setModalUpdate(true)
        await getTopicByID(token, id)
            .then(res => {
                setTopic(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    //InitialValues formUpdate
    useEffect(() => {
        formUpdate.setFieldsValue({
            category_name_th: topic.category_name_th,
            category_name_eng: topic.category_name_eng,
            fiscal_year: topic.fiscal_year
        })
    })

    //Update topic
    const handleUpdateTopic = async (fieldValues) => {
        const values = {
            ...fieldValues,
            id: topic.id
        }
        await updateTopic(token, values)
            .then(res => {
                toast.success(res.data.message)
                setModalUpdate(false)
                loadListTopic(token)
            })
            .catch(err => {
                console.log(err)
            })
    }

    //remove topic
    const handleRemoveData = async (id) => {
        confirm({
            title: 'คุณต้องการลบข้อมูลหรือไม่?',
            icon: <ExclamationCircleFilled />,
            onOk() {
                removeTopic(token, id)
                    .then(res => {
                        toast.error(res.data.message)
                        loadListTopic(token)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    }


    return (
        <div>
            <div>
                <div className='flex justify-center items-center text-2xl font-bold mb-8 text-green-600'>
                    <Grid2x2Check /> <p className='ml-2'>ข้อมูลด้านการประเมิน</p>
                </div>
                <div className='bg-white rounded-md shadow-md'>
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


                                <div className='flex justify-between items-center p-2'>
                                    <div
                                        className='flex p-2 items-center'
                                        style={{ fontSize: '14px' }}
                                    >
                                        <button
                                            className='bg-green-600 py-1 px-4 rounded-full shadow-md hover:bg-green-700'
                                            onClick={createModal}
                                        >
                                            <p className='flex px-1 text-white items-center'>
                                                <Plus className='' /> เพิ่ม
                                            </p>
                                        </button>
                                        <p style={{ fontSize: '14px', marginLeft: '5px' }}>จำนวนทั้งหมด {searchQuery.length} รายการ</p>
                                    </div>
                                    <div>
                                        <Input
                                            placeholder='ค้นหาด้วยชื่อภาษาไทย หรือ อังกฤษ...'
                                            prefix={<SearchOutlined />}
                                            className='rounded-full'
                                            style={{ width: 250 }}
                                            onChange={handleFilter}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Table
                                        columns={columns}
                                        dataSource={dataSouce}
                                        size='small'
                                        bordered
                                        pagination={{ pageSize: 12 }}
                                    />
                                </div>
                            </>
                    }

                    <Modal
                        title={
                            <div className='flex justify-center'>
                                <ExclamationCircleFilled className='text-green-600' /> &nbsp;
                                <span className='text-xl font-bold'>เพิ่มด้านการประเมิน</span>
                            </div>
                        }
                        open={modalCreate}
                        onOk={formCreate.submit}
                        onCancel={closeModal}
                        width={450}
                        style={{ top: 20 }}
                    >
                        <Form
                            name='formCreate'
                            form={formCreate}
                            layout='vertical'
                            onFinish={handleCreateTopic}
                            onFinishFailed={onFinishFailed}
                            className='mt-2'
                        >
                            <Form.Item
                                name='category_name_th'
                                label={<b>ชื่อด้านการประเมิน (ไทย)</b>}
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณาระบุชื่อด้านการประเมิน',
                                    }
                                ]}
                                hasFeedback
                                className='mb-3'
                            >
                                <Input placeholder='ระบุชื่อด้านการประเมินภาษาไทย' />
                            </Form.Item>
                            <Form.Item
                                name='category_name_eng'
                                label={<b>ชื่อด้านการประเมิน (อังกฤษ)</b>}
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณาระบุชื่อด้านการประเมิน',
                                    }
                                ]}
                                hasFeedback
                                className='mb-3'
                            >
                                <Input placeholder='ระบุชื่อด้านการประเมินภาษาอังกฤษ' />
                            </Form.Item>
                            <Form.Item
                                name='fiscal_year'
                                label={<b>ปีงบประมาณ</b>}
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณาระบุปีงบประมาณ',
                                    }
                                ]}
                                hasFeedback
                                className='mb-3'
                            >
                                <Input placeholder='ระบุปีงบประมาณ' readOnly />
                            </Form.Item>
                        </Form>
                    </Modal>

                    <Modal
                        title={
                            <div className='flex justify-center'>
                                <ExclamationCircleFilled className='text-yellow-500' /> &nbsp;
                                <span className='text-xl font-bold'>แก้ไขด้านการประเมิน</span>
                            </div>
                        }
                        open={modalUpdate}
                        onOk={formUpdate.submit}
                        onCancel={closeModal}
                        width={450}
                        style={{ top: 20 }}
                    >
                        <Form
                            name='formUpdate'
                            form={formUpdate}
                            layout='vertical'
                            onFinish={handleUpdateTopic}
                            onFinishFailed={onFinishFailed}
                            className='mt-2'
                        >
                            <Form.Item
                                name='category_name_th'
                                label={<b>ชื่อด้านการประเมิน (ไทย)</b>}
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณาระบุชื่อด้านการประเมิน',
                                    }
                                ]}
                                hasFeedback
                                className='mb-3'
                            >
                                <Input placeholder='ระบุชื่อด้านการประเมินภาษาไทย' />
                            </Form.Item>
                            <Form.Item
                                name='category_name_eng'
                                label={<b>ชื่อด้านการประเมิน (อังกฤษ)</b>}
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณาระบุชื่อด้านการประเมิน',
                                    }
                                ]}
                                hasFeedback
                                className='mb-3'
                            >
                                <Input placeholder='ระบุชื่อด้านการประเมินภาษาอังกฤษ' />
                            </Form.Item>
                            <Form.Item
                                name='fiscal_year'
                                label={<b>ปีงบประมาณ</b>}
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณาระบุปีงบประมาณ',
                                    }
                                ]}
                                hasFeedback
                                className='mb-3'
                            >
                                <Input placeholder='ระบุปีงบประมาณ' readOnly />
                            </Form.Item>
                        </Form>
                    </Modal>

                </div>
            </div>
        </div>
    )
}

export default FormTopics