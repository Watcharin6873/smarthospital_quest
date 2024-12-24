import React, { useEffect, useState } from 'react'
import { FilePenLine, Grid2x2Check, LoaderCircle, Plus, Trash2 } from 'lucide-react'
import useGlobalStore from '../../store/global-store'
import { Button, Card, Space, Form, Input, Modal, Table, Select } from 'antd'
import { getListTopic } from '../../api/Topic'
import { createQuests, getListQuests, getQuestByID, removeQuest, updateQuest } from '../../api/Quest'
import { ExclamationCircleFilled, SearchOutlined, CloseOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistExtra from 'dayjs/plugin/buddhistEra'



dayjs.extend(buddhistExtra)
const { confirm } = Modal

const FormQuest = () => {

    const token = useGlobalStore((state) => state.token)
    const [listTopics, setListTopics] = useState([])
    const [listQuests, setListQuests] = useState([])
    const [searchQuery, setSearchQuery] = useState([])
    const [quest, setQuest] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [formCreate] = Form.useForm()
    const [formUpdate] = Form.useForm()


    //Get list Topic data
    useEffect(() => {
        loadListTopics(token)
    }, [])

    const loadListTopics = async (token) => {
        await getListTopic(token)
            .then(res => {
                setListTopics(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const options = listTopics.map((item) => ({
        value: item.id,
        label: item.category_name_th
    }))



    //Get list Quest data
    useEffect(() => {
        loadListQuests(token)
    }, [])

    const loadListQuests = async (token) => {
        setIsLoading(true)
        await getListQuests(token)
            .then(res => {
                setListQuests(res.data)
                setSearchQuery(res.data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setIsLoading(false))
    }

    //Search filter
    const handleFilter = (e) => {
        setSearchQuery(listQuests.filter(f => f.category_quests.category_name_th.toLowerCase().includes(e.target.value)))
    }


    //Datasource for table
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
            title: <p className='text-center'>ด้าน</p>,
            render: ({ category_quests }) =>
                <>
                    <span className='text-sm'>{category_quests.category_name_th}</span>
                </>
        },
        {
            title: <p className='text-center'>คำถามหลัก</p>,
            width: '45%',
            render: ({ quest_name }) =>
                <>
                    <span className='text-sm'>{quest_name}</span>
                </>
        },
        {
            title: 'ปีงบประมาณ',
            align: 'center',
            render: ({ category_quests }) =>
                <>
                    <span className='text-sm'>{category_quests.fiscal_year}</span>
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

    //Show modal create Quest
    const showCreateModal = () => {
        setOpenModalCreate(true)
    }

    //Close modal
    const closeModal = () => {
        setOpenModalCreate(false)
        setOpenModalUpdate(false)
    }

    //Create quest 
    const handleCreateQuests = async (fieldValue) => {
        // console.log('FieldValue: ', fieldValue.items[0])
        const values = fieldValue.items[0].list.map((item) => ({
            quest_name: item.quest_name,
            category_questId: fieldValue.items[0].category_questId
        }))
        console.log('Value: ', values)
        await createQuests(token, values)
            .then(res => {
                toast.success(res.data.message)
                setOpenModalCreate(false)
                loadListQuests(token)
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
    const showUpdateModal = async (id) => {
        setOpenModalUpdate(true)
        await getQuestByID(token, id)
            .then(res => {
                setQuest(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        formUpdate.setFieldsValue({
            category_questId: quest.category_questId,
            quest_name: quest.quest_name
        })
    })


    //Update Quest
    const handleUpdateQuests = async (fieldValue) => {
        const values = {
            ...fieldValue,
            id: quest.id
        }
        await updateQuest(token, values)
            .then(res => {
                toast.success(res.data.message)
                loadListQuests(token)
                setOpenModalUpdate(false)
            })
            .catch(err => {
                console.log(err.response.data.message)
                toast.error(err.response.data.message)
            })
    }


    //remove data
    const handleRemoveData = async (id) => {
        confirm({
            title: 'คุณต้องการลบข้อมูลหรือไม่?',
            icon: <ExclamationCircleFilled />,
            onOk() {
                removeQuest(token, id)
                    .then(res => {
                        toast.success(res.data.message)
                        loadListQuests(token)
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
            <div className='flex justify-center items-center text-2xl font-bold mb-8 text-green-600'>
                <Grid2x2Check /> <p className='ml-2'>ข้อมูลเกณฑ์การประเมินหลัก</p>
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
                                        onClick={showCreateModal}
                                    >
                                        <p className='flex px-1 text-white items-center'>
                                            <Plus className='' /> เพิ่ม
                                        </p>
                                    </button>
                                    <p style={{ fontSize: '14px', marginLeft: '5px' }}>จำนวนทั้งหมด {searchQuery.length} รายการ</p>
                                </div>
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
                            <div className='p-2'>
                                <Table
                                    dataSource={dataSource}
                                    columns={columns}
                                    size='small'
                                    bordered
                                />
                            </div>
                        </>
                }

                <Modal
                    title={
                        <div className='flex justify-center'>
                            <ExclamationCircleFilled className='text-green-600' /> &nbsp;
                            <span className='text-xl font-bold'>เพิ่มคำถามหลัก</span>
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
                        onFinish={handleCreateQuests}
                        onFinishFailed={onFinishFailed}
                        className='mt-2'
                        autoComplete='off'
                        initialValues={{
                            items: [{}]
                        }}
                    >
                        <Form.List name="items">
                            {(fields, { add, remove }) => (
                                <div
                                >
                                    {fields.map((field) => (
                                        <Card
                                            size="small"
                                            // title={`Item ${field.name + 1}`}
                                            key={field.key}
                                        >
                                            <Form.Item
                                                label="ด้านการประเมิน"
                                                name={[field.name, 'category_questId']}
                                            >
                                                <Select options={options} placeholder='กรุณาเลือกด้านการประเมิน...' />
                                            </Form.Item>

                                            {/* Nest Form.List */}
                                            <Form.Item label="คำถามหลัก">
                                                <Form.List name={[field.name, 'list']}>
                                                    {(subFields, subOpt) => (
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                rowGap: 16,
                                                            }}
                                                        >
                                                            {subFields.map((subField) => (
                                                                <Space key={subField.key}>
                                                                    <Form.Item noStyle name={[subField.name, 'quest_name']}>
                                                                        <Input.TextArea
                                                                            placeholder="ระบุคำถาม...."
                                                                            style={{ width: 350 }}
                                                                        />
                                                                    </Form.Item>
                                                                    <CloseOutlined
                                                                        onClick={() => {
                                                                            subOpt.remove(subField.name);
                                                                        }}
                                                                    />
                                                                </Space>
                                                            ))}
                                                            <Button type="dashed" onClick={() => subOpt.add()} block>
                                                                + เพิ่มคำถามหลัก
                                                            </Button>
                                                        </div>
                                                    )}
                                                </Form.List>
                                            </Form.Item>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </Form.List>
                    </Form>
                </Modal>

                <Modal
                    title={
                        <div className='flex justify-center'>
                            <ExclamationCircleFilled className='text-yellow-600' /> &nbsp;
                            <span className='text-xl font-bold'>แก้ไขคำถามหลัก</span>
                        </div>
                    }
                    open={openModalUpdate}
                    onOk={formUpdate.submit}
                    onCancel={closeModal}
                    width={450}
                    style={{ top: 20 }}
                >
                    <Form
                        name='formCreate'
                        form={formUpdate}
                        layout='vertical'
                        onFinish={handleUpdateQuests}
                        onFinishFailed={onFinishFailed}
                        className='mt-2'
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
                            hasFeedback
                            className='mb-3'
                        >
                            <Select options={options} />
                        </Form.Item>
                        <Form.Item
                            name='quest_name'
                            label={<b>คำถามหลัก</b>}
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาระบุคำถามหลัก',
                                }
                            ]}
                            hasFeedback
                            className='mb-3'
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>


            </div>
        </div>
    )
}

export default FormQuest