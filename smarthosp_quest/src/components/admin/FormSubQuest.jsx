import React, { useEffect, useState } from 'react'
import { Eye, FilePenLine, Grid2x2Check, LoaderCircle, Plus, Trash2 } from 'lucide-react'
import useGlobalStore from '../../store/global-store'
import { Checkbox, Form, Input, InputNumber, Modal, Radio, Select, Table } from 'antd'
import { getListTopic } from '../../api/Topic'
import { getListQuests } from '../../api/Quest'
import { createSubQuest, getListSubQuests, getSubQuestByID, removeSubQuest, updateSubQuest } from '../../api/SubQuest'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistExtra from 'dayjs/plugin/buddhistEra'
import { ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'


dayjs.extend(buddhistExtra)
const { confirm } = Modal
const { TextArea } = Input

const FormSubQuest = () => {

    const token = useGlobalStore((state) => state.token)
    const [listTopics, setListTopics] = useState([])
    const [listQuests, setListQuests] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [listSubQuests, setListSubQuests] = useState([])
    const [searchQuery, setSearchQuery] = useState([])
    const [subQuest, setSubQuest] = useState([])
    const [formCreate] = Form.useForm()
    const [formUpdate] = Form.useForm()
    const [vals, setVals] = useState({
        category_questId: "",
    })


    useEffect(() => {
        loadListTopics(token)
        loadListQuests(token)
        loadListSubQuests(token)
    }, [])

    //Load list topics
    const loadListTopics = async (token) => {
        await getListTopic(token)
            .then(res => {
                setListTopics(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    //Option Topic for form 
    // const optionTopics = listTopics.sort((a, b) => a - b).map((item) => ({
    //     value: item.id,
    //     label: item.category_name_th
    // }))

    //Load list Quest
    const loadListQuests = async (token) => {
        await getListQuests(token)
            .then(res => {
                // console.log(res.data)
                setListQuests(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }


    // const optionQuests = listQuests.map((item) => ({
    //     vals === item.category_questId
    // }))


    //Load list SubQuest
    const loadListSubQuests = async (token) => {
        setIsLoading(true)
        await getListSubQuests(token)
            .then(res => {
                // console.log('SubQuest: ', res.data)
                setListSubQuests(res.data)
                setSearchQuery(res.data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setIsLoading(false))
    }

    //Filter SubQuest
    const handleFilter = (e) => {
        setSearchQuery(listSubQuests.filter(f =>
            f.category_quests.category_name_th.toLowerCase().includes(e.target.value) ||
            f.quests.quest_name.toLowerCase().includes(e.target.value) ||
            f.sub_quest_name.toLowerCase().includes(e.target.value)
        ))
    }

    //DataSource for table
    const dataSource = searchQuery.map((item, index) => ({
        ...item,
        key: index
    }))

    //Column for table
    const columns = [
        {
            title: 'ลำดับ',
            align: 'center',
            render: ({ key }) =>
                <>
                    <span className='text-sm'>{key + 1}</span>
                </>
        },
        {
            title: <p className='text-center'>คำถามย่อย</p>,
            width: '45%',
            render: ({ sub_quest_name }) =>
                <>
                    <span className='text-sm'>{sub_quest_name}</span>
                </>
        },
        {
            title: 'จำเป็น',
            align: 'center',
            render: ({ necessary }) =>
                <>
                    <Checkbox checked={necessary} />
                </>
        },
        {
            title: 'วันที่เพิ่ม',
            align: 'center',
            render: ({ createdAt }) =>
                <>
                    <span className='text-sm'>{dayjs(createdAt).locale('th').format('DD MMM BB')}</span>
                </>
        },
        {
            title: 'วันที่แก้ไข',
            align: 'center',
            render: ({ updatedAt }) =>
                <>
                    <span className='text-sm'>{dayjs(updatedAt).locale('th').format('DD MMM BB')}</span>
                </>
        },
        {
            title: 'จัดการ',
            align: 'center',
            render: ({ id }) =>
                <>
                    <div>
                        {/* <button
                            className='mr-1 px-4 border rounded-full py-1 bg-blue-500 hover:bg-blue-600 shadow-md text-white'
                            onClick={() => showSeeDetailModal(id)}
                        >
                            <Eye size={16} />
                        </button> */}
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

    //Show modal create
    const showCreateModal = () => {
        setOpenModalCreate(true)
    }

    //Close modal
    const closeModal = () => {
        setOpenModalCreate(false)
        setOpenModalUpdate(false)
    }


    useEffect(() => {
        formCreate.setFieldsValue({
            category_questId: null,
            questId: null,
            sub_quest_name: null,
            sub_quest_require_point: 0,
            sub_quest_total_point: 0,
            description: null,
            necessary: null
        })
    })



    //Create SubQuest
    const handleCreateSubQuests = async (fieldValue) => {
        console.log('fieldValue: ', fieldValue)
        await createSubQuest(token, fieldValue)
            .then(res => {
                toast.success(res.data.message)
                setOpenModalCreate(false)
                loadListSubQuests(token)
            })
            .catch(err => {
                console.log(err.response.data.message)
                toast.warning(err.response.data.message)
            })
    }


    //onFinishFailed
    const onFinishFailed = (errorInfo) => {
        console.log('Failed: ', errorInfo)
    }


    //Show update modal
    const showUpdateModal = (id) => {
        console.log('Update Modal: ', id)
        setOpenModalUpdate(true)
        getSubQuestByID(token, id)
            .then(res => {
                // console.log(res.data)
                setSubQuest(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    //Display data on form update
    useEffect(() => {
        formUpdate.setFieldsValue({
            category_questId: subQuest.category_questId,
            questId: subQuest.questId,
            sub_quest_name: subQuest.sub_quest_name,
            sub_quest_total_point: subQuest.sub_quest_total_point,
            sub_quest_require_point: subQuest.sub_quest_require_point,
            description: subQuest.description,
            necessary: subQuest.necessary
        })
    })


    //Update subQuest
    const handleUpdateSubQuest = (fieldValue) => {
        const values = {
            ...fieldValue,
            id: subQuest.id
        }
        console.log(values)
        updateSubQuest(token, values)
            .then(res => {
                toast.success(res.data.message)
                setOpenModalUpdate(false)
                loadListSubQuests(token)
            })
            .catch(err => {
                console.log(err.response.data.message)
                toast.error(err.response.data.message)
            })
    }


    //remove data
    const handleRemoveData = (id) => {
        confirm({
            title: 'คุณต้องการลบข้อมูลหรือไม่?',
            icon: <ExclamationCircleFilled />,
            onOk() {
                removeSubQuest(token, id)
                    .then(res => {
                        toast.success(res.data.message)
                        loadListSubQuests(token)
                    })
                    .catch(err => {
                        console.log(err.response.data.message)
                        toast.error(err.response.data.message)
                    })
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    }



    return (
        <div>
            {/* Header */}
            <div className='flex justify-center items-center text-2xl font-bold mb-8 text-green-600'>
                <Grid2x2Check /> <p className='ml-2'>ข้อมูลเกณฑ์การประเมินย่อย</p>
            </div>
            {/* Content */}
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

                            {/* Search */}
                            <div className='flex justify-between items-center p-2'>
                                {/* Left */}
                                <div className='flex items-center p-2'>
                                    <button
                                        className='bg-green-600 py-1 px-4 rounded-full shadow-md hover:bg-green-700'
                                        onClick={showCreateModal}
                                    >
                                        <p className='flex px-1 text-white items-center'>
                                            <Plus className='' /> เพิ่ม
                                        </p>
                                    </button>
                                    <p style={{ fontSize: '14px', marginLeft: '5px' }}>จำนวนทั้งหมด {searchQuery.length} รายการ</p>
                                </div>
                                {/* Right */}
                                <div>
                                    <Input
                                        placeholder='ค้นหาด้วยชื่อ...'
                                        prefix={<SearchOutlined />}
                                        className='rounded-full'
                                        style={{ width: 250 }}
                                        onChange={handleFilter}
                                    />
                                </div>
                            </div>
                            {/* Table */}
                            <div>
                                <Table
                                    dataSource={dataSource}
                                    columns={columns}
                                    size='dmall'
                                    bordered
                                />
                            </div>
                        </>
                }
                <Modal
                    title={
                        <div className='flex justify-center'>
                            <ExclamationCircleFilled className='text-green-600' /> &nbsp;
                            <span className='text-xl font-bold'>เพิ่มเกณฑ์ย่อย</span>
                        </div>
                    }
                    open={openModalCreate}
                    onOk={formCreate.submit}
                    onCancel={closeModal}
                    width={450}
                    style={{ top: 20 }}
                >
                    <Form
                        name='formCreate'
                        form={formCreate}
                        layout='vertical'
                        onFinish={handleCreateSubQuests}
                        onFinishFailed={onFinishFailed}
                        className='mt-2'
                        autoComplete='off'
                        initialValues={{
                            items: [{}]
                        }}
                    >
                        <Form.Item
                            name='category_questId'
                            label={<b>ชื่อด้านการประเมิน</b>}
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาระบุชื่อด้านการประเมิน',
                                }
                            ]}
                            className='mb-3'
                        >
                            <Select
                                placeholder='กรุณาเลือกชื่อด้านการประเมิน...'
                                onChange={(e) => setVals(e)}
                            >
                                {
                                    listTopics.sort((a, b) => a - b).map((item, k1) =>
                                        <Select.Option key={k1} value={item.id}>{item.category_name_th}</Select.Option>
                                    )
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name='questId'
                            label={<b>คำถามหลัก</b>}
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาระบุคำถามหลัก',
                                }
                            ]}
                            className='mb-3'
                        >
                            <Select placeholder='กรุณาเลือกคำถามหลัก...'>
                                {
                                    listQuests.map((item, k1) =>
                                        vals === item.category_questId
                                            ?
                                            <Select.Option key={k1} value={item.id}>{item.quest_name}</Select.Option>
                                            : null
                                    )
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name='sub_quest_name'
                            label={<b>คำถามย่อย</b>}
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาระบุคำถามย่อย',
                                }
                            ]}
                            className='mb-3'
                        >
                            <TextArea rows={5} />
                        </Form.Item>
                        {/* <div className='flex'>
                            <div className='w-full px-1'>
                                <Form.Item
                                    name='sub_quest_total_point'
                                    label={<b>คะแนนเต็ม</b>}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'กรุณาระบุคะแนนเต็ม',
                                        }
                                    ]}
                                    className='mb-3'
                                >
                                    <InputNumber className='w-full' />
                                </Form.Item>
                            </div>
                            <div className='w-full px-1'>
                                <Form.Item
                                    name='sub_quest_require_point'
                                    label={<b>คะแนนจำเป็น</b>}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'กรุณาระบุคะแนนเต็ม',
                                        }
                                    ]}
                                    className='mb-3'
                                >
                                    <InputNumber className='w-full' />
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item
                            name='description'
                            label={<b>คำชี้แจง/คำอธิบายเพิ่มเติม</b>}
                            className='mb-3'
                        >
                            <TextArea />
                        </Form.Item>
                        <Form.Item
                            name='necessary'
                            label={<b>จำเป็นต้องดำเนินการ</b>}
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาระบุว่าจำเป็นต้องดำเนินการหรือไม่?',
                                }
                            ]}
                            className='mb-3'
                        >
                            <Radio.Group>
                                <Radio value={true}>จำเป็น</Radio>
                                <Radio value={false}>ไม่จำเป็น</Radio>
                            </Radio.Group>
                        </Form.Item> */}
                    </Form>
                </Modal>

                <Modal
                    title={
                        <div className='flex justify-center'>
                            <ExclamationCircleFilled className='text-yellow-400' /> &nbsp;
                            <span className='text-xl font-bold'>แก้ไขเกณฑ์ย่อย</span>
                        </div>
                    }
                    open={openModalUpdate}
                    onOk={formUpdate.submit}
                    onCancel={closeModal}
                    width={450}
                    style={{ top: 20 }}
                >
                    <Form
                        name='formUpdate'
                        form={formUpdate}
                        layout='vertical'
                        onFinish={handleUpdateSubQuest}
                        onFinishFailed={onFinishFailed}
                        className='mt-2'
                        autoComplete='off'
                        initialValues={{
                            items: [{}]
                        }}
                    >
                        <Form.Item
                            name='category_questId'
                            label={<b>ชื่อด้านการประเมิน</b>}
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาระบุชื่อด้านการประเมิน',
                                }
                            ]}
                            className='mb-3'
                        >
                            <Select
                                placeholder='กรุณาเลือกชื่อด้านการประเมิน...'
                                onChange={(e) => setVals(e)}
                            >
                                {
                                    listTopics.sort((a, b) => a - b).map((item, k1) =>
                                        <Select.Option key={k1} value={item.id}>{item.category_name_th}</Select.Option>
                                    )
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name='questId'
                            label={<b>คำถามหลัก</b>}
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาระบุคำถามหลัก',
                                }
                            ]}
                            className='mb-3'
                        >
                            <Select placeholder='กรุณาเลือกคำถามหลัก...'>
                                {
                                    listQuests.map((item, k1) =>
                                        subQuest.category_questId === item.category_questId
                                            ?
                                            <Select.Option key={k1} value={item.id}>{item.quest_name}</Select.Option>
                                            : null
                                    )
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name='sub_quest_name'
                            label={<b>คำถามย่อย</b>}
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาระบุคำถามย่อย',
                                }
                            ]}
                            className='mb-3'
                        >
                            <TextArea rows={5} />
                        </Form.Item>
                        <div className='flex'>
                            <div className='w-full px-1'>
                                <Form.Item
                                    name='sub_quest_total_point'
                                    label={<b>คะแนนเต็ม</b>}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'กรุณาระบุคะแนนเต็ม',
                                        }
                                    ]}
                                    className='mb-3'
                                >
                                    <InputNumber className='w-full' />
                                </Form.Item>
                            </div>
                            <div className='w-full px-1'>
                                <Form.Item
                                    name='sub_quest_require_point'
                                    label={<b>คะแนนจำเป็น</b>}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'กรุณาระบุคะแนนเต็ม',
                                        }
                                    ]}
                                    className='mb-3'
                                >
                                    <InputNumber className='w-full' />
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item
                            name='description'
                            label={<b>คำชี้แจง/คำอธิบายเพิ่มเติม</b>}
                            className='mb-3'
                        >
                            <TextArea />
                        </Form.Item>
                        <Form.Item
                            name='necessary'
                            label={<b>จำเป็นต้องดำเนินการ</b>}
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาระบุว่าจำเป็นต้องดำเนินการหรือไม่?',
                                }
                            ]}
                            className='mb-3'
                        >
                            <Radio.Group>
                                <Radio value={true}>จำเป็น</Radio>
                                <Radio value={false}>ไม่จำเป็น</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Modal>



            </div>
        </div>
    )
}

export default FormSubQuest