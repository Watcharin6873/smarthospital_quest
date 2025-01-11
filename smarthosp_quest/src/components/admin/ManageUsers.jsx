import React, { useState, useEffect } from 'react'
import { Ellipsis, LoaderCircle, Search, Trash2, UserPen } from 'lucide-react'
import { Button, Form, Input, Modal, Select, Space, Switch, Table, Tag } from 'antd';
import useGlobalStore from '../../store/global-store';
import { changeObjective, changeRole, changeStatus, getListUsers, getListUsersZoneApprove, removeUser } from '../../api/User';
import dayjs from 'dayjs';
import 'dayjs/locale/th'
import buddhistExtra from 'dayjs/plugin/buddhistEra'
import { toast } from 'react-toastify';
import { ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons';



dayjs.extend(buddhistExtra)

const { confirm } = Modal

const ManageUsers = () => {

    const token = useGlobalStore((state) => state.token)
    const [listUsers, setListUsers] = useState([])
    const [searchQuery, setSearchQuery] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [formSearch] = Form.useForm()
    const [clientReady, setClientReady] = useState(false)

    useEffect(() => {
        loadListUsers(token)
    }, [])

    const dataOfZone = [
        { id: 1, zone: '01', zone_name: 'เขตสุขภาพที่ 1' },
        { id: 2, zone: '02', zone_name: 'เขตสุขภาพที่ 2' },
        { id: 3, zone: '03', zone_name: 'เขตสุขภาพที่ 3' },
        { id: 4, zone: '04', zone_name: 'เขตสุขภาพที่ 4' },
        { id: 5, zone: '05', zone_name: 'เขตสุขภาพที่ 5' },
        { id: 6, zone: '06', zone_name: 'เขตสุขภาพที่ 6' },
        { id: 7, zone: '07', zone_name: 'เขตสุขภาพที่ 7' },
        { id: 8, zone: '08', zone_name: 'เขตสุขภาพที่ 8' },
        { id: 9, zone: '09', zone_name: 'เขตสุขภาพที่ 9' },
        { id: 10, zone: '10', zone_name: 'เขตสุขภาพที่ 10' },
        { id: 11, zone: '11', zone_name: 'เขตสุขภาพที่ 11' },
        { id: 12, zone: '12', zone_name: 'เขตสุขภาพที่ 12' }
    ]

    const data1 = dataOfZone.sort((a, b) => (a.id > b.id) ? 1 : -1).map((item) => ({ ...item }))

    const optionOfZone = data1.map((item) => ({
        key: item.id,
        value: item.zone,
        label: item.zone_name
    }))

    const onFinishFailed = async (errorInfo) => {
        console.log('Failed: ', errorInfo)
    }

    const loadListUsers = async (token) => {
        setIsLoading(true)
        await getListUsersZoneApprove(token)
            .then(res => {
                console.log(res.data)
                setListUsers(res.data)
                setSearchQuery(res.data)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
            .finally(() => setIsLoading(false))
    }

    const handleSearch = (searchValue) => {
        console.log(searchValue)
        setSearchQuery(listUsers.filter(f => f.zone === searchValue.zone))
    }

    const handleFilter = (e) => {
        setSearchQuery(listUsers.filter(f =>
            f.hcode.toLowerCase().includes(e.target.value) ||
            f.hname_th.toLowerCase().includes(e.target.value) ||
            f.firstname_th.toLowerCase().includes(e.target.value)
        ))
    }

    const data = searchQuery.map((item, index) => ({
        ...item,
        key: index
    }))

    const roleData = [
        {
            role: "user",
            role_name: <Tag className='w-full bg-orange-300 text-center text-white'>User</Tag>
        },
        {
            role: "admin",
            role_name: <Tag className='w-full bg-green-500 text-center text-white'>Admin</Tag>
        }
    ]

    const optionRole = roleData.map((item) => ({
        value: item.role,
        label: item.role_name
    }))

    const objectiveData = [
        {
            type: 'Administrator',
            type_name: <Tag className='w-full bg-green-500 text-center text-white'>ผู้ดูแลระบบ</Tag>
        },
        {
            type: 'zone_approve',
            type_name: <Tag className='w-full bg-blue-500 text-center text-white'>คคก.เขตสุขภาพ</Tag>
        },
        {
            type: 'prov_approve',
            type_name: <Tag className='w-full bg-orange-300 text-center text-white'>คคก.จังหวัด</Tag>
        },
        {
            type: 'responder',
            type_name: <Tag className='w-full bg-yellow-400 text-center text-white'>ผู้ประเมิน รพ.</Tag>
        }
    ]

    const optionObjective = objectiveData.map((item) => ({
        value: item.type,
        label: item.type_name
    }))

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
            title: 'ชื่อ-นามสกุล',
            render: ({ title_th, firstname_th, lastname_th }) =>
                <>
                    <span style={{ fontSize: '14px' }}>{title_th} {firstname_th} {lastname_th}</span>
                </>

        },
        {
            title: <p className='text-center'>หน่วยบริการ</p>,
            render: ({ hname_th, hcode }) =>
                <>
                    <span style={{ fontSize: '14px' }}>{hname_th} [{hcode}]</span>
                </>

        },
        {
            title: <p className='text-center'>เขตสุขภาพ</p>,
            render: ({ zone }) =>
                <>
                    <span style={{ fontSize: '14px' }}>เขตสุขภาพที่ {Number(zone)}</span>
                </>

        },
        {
            title: <p className='text-center'>ตำแหน่ง</p>,
            render: ({ position, position_id }) =>
                <>
                    <span style={{ fontSize: '14px' }}>{position} [{position_id}]</span>
                </>

        },
        {
            title: 'ระดับ',
            dataIndex: 'level',
            align: 'center',
            render: (level, { id }) =>
                <>
                    <p style={{ fontSize: '14px' }}>
                        {
                            level == 1
                                ? 'ส่วนกลาง'
                                : level == 2
                                    ? 'เขตสุขภาพ'
                                    : level == 3
                                        ? 'จังหวัด'
                                        : level == 4
                                            ? 'หน่วยบริการ'
                                            : ''

                        }
                    </p>
                </>
        },
        {
            title: 'สิทธิ',
            dataIndex: 'role',
            align: 'center',
            render: (role, { id }) =>
                <>
                    <Select
                        options={optionRole}
                        className='w-28'
                        defaultValue={role}
                        onChange={(e) => handleChangeRole(e, id)}
                    />
                </>
        },
        {
            title: 'ประเภท',
            dataIndex: 'objective',
            align: 'center',
            width: '10%',
            render: (objective, { id }) =>
                <>
                    <Select
                        options={optionObjective}
                        className='w-full'
                        defaultValue={objective}
                        onChange={(e) => handleChangeObjective(e, id)}
                    />
                </>
        },
        {
            title: 'การอนุมัติ',
            align: 'center',
            render: ({ enabled, id }) =>
                <>
                    <Switch size='small' checked={enabled} onChange={(e) => handleChangeStatus(e, id)} />
                </>
        },
        {
            title: 'วันที่เพิ่ม',
            align: 'center',
            render: ({ createdAt }) =>
                <>
                    <p style={{ fontSize: '14px' }}>
                        {dayjs(createdAt).locale('th').format('DD MMM BB')}
                    </p>
                </>
        },
        // {
        //     title: 'วันที่แก้ไข',
        //     align: 'center',
        //     render: ({ updatedAt }) =>
        //         <>
        //             <p style={{ fontSize: '14px' }}>
        //                 {dayjs(updatedAt).locale('th').format('DD MMM BB')}
        //             </p>
        //         </>
        // },
        {
            title: 'จัดการ',
            align: 'center',
            render: ({ id }) =>
                <>
                    <button
                        className='px-4 border rounded-full py-1 bg-red-500 hover:bg-red-600 shadow-md text-white'
                        onClick={() => handleRemove(id)}
                    >
                        <Trash2 size={16} />
                    </button>
                </>
        }
    ];


    const handleChangeRole = (e, id) => {
        const values = {
            id: id,
            role: e
        }
        changeRole(token, values)
            .then(res => {
                toast.success(res.data.message)
                loadListUsers(token)
            })
            .catch(err => {
                console.log(err)
            })
    }


    const handleChangeObjective = (e, id) => {
        const values = {
            id: id,
            objective: e
        }
        changeObjective(token, values)
            .then(res => {
                toast.success(res.data.message)
                loadListUsers(token)
            })
            .catch(err => {
                toast.error(err.response.data.message)
            })
    }


    const handleChangeStatus = (e, id) => {
        const values = {
            id: id,
            enabled: e
        }
        changeStatus(token, values)
            .then(res => {
                toast.success(res.data.message)
                loadListUsers(token)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleRemove = (id) => {
        confirm({
            title: 'คุณต้องการลบข้อมูลหรือไม่?',
            icon: <ExclamationCircleFilled />,
            onOk() {
                removeUser(token, id)
                    .then(res => {
                        toast.error(res.data.message)
                        loadListUsers(token)
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
            <div className='flex justify-center items-center text-2xl font-bold mb-8 text-green-600'>
                <UserPen /> <p className='ml-1'> จัดการข้อมูลผู้ใช้งาน</p>
            </div>

            <div className='border rounded-md p-2 bg-white shadow-md'>

                {/* <div className='flex justify-center items-center'>
                    <LoaderCircle className='w-16 h-16 text-blue-400 animate-spin' />
                </div> */}
                <div className='flex justify-center items-center p-1'>
                    <Form
                        name='formSearch'
                        form={formSearch}
                        onFinish={handleSearch}
                        onFinishFailed={onFinishFailed}
                        layout='inline'
                    >
                        <Form.Item
                            name='zone'
                            label='เลือกเขตสุขภาพ'
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาเลือกเขตสุขภาพ'
                                }
                            ]}
                        >
                            <Select
                                showSearch
                                optionFilterProp="label"
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                placeholder='กรุณาเลือกหน่วยบริการ...'
                                style={{ width: '250px' }}
                            >
                                {
                                    dataOfZone.map((item)=>(
                                        <Select.Option key={item.id} value={item.zone}>{item.zone_name}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                ค้นหา
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className='flex justify-between items-center p-3'>
                    <div>
                        <p style={{ fontSize: '14px' }}>
                            จำนวนบัญชี คกก.เขตสุขภาพ ทั้งหมด {searchQuery.length} รายการ
                        </p>
                    </div>
                    <div>
                        <Input
                            placeholder='ค้นหาด้วย hcode, ชื่อ, ชื่อหน่วยบริการ...'
                            className='rounded-full'
                            style={{ width: 250 }}
                            prefix={<SearchOutlined />}
                            onChange={handleFilter}
                        />
                    </div>
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    size='small'
                    pagination={{ pageSize: 12 }}
                />
                {/* <table className='w-full text-left table-fixed text-slate-800'>
                    <thead>
                        <tr className='text-md text-slate-500 border border-l border-r border-slate-300 bg-slate-50'>
                            <th className='text-center p-2 border-r'>ลำดับ</th>
                            <th className='text-center p-2 border-r w-32'>ชื่อ-นามสกุล</th>
                            <th className='text-center p-2 border-r w-32'>หน่วยบริการ</th>
                            <th className='text-center p-2 border-r w-32'>เขตสุขภาพ</th>
                            <th className='text-center p-2 border-r w-32'>ตำแหน่ง</th>
                            <th className='text-center p-2 border-r w-32'>ระดับ</th>
                            <th className='text-center p-2 border-r w-32'>สิทธิ</th>
                            <th className='text-center p-2 border-r w-32'>ประเภท</th>
                            <th className='text-center p-2 border-r w-32'>การอนุมัติ</th>
                            <th className='text-center p-2 border-r w-32'>วันที่เพิ่ม</th>
                            <th className='text-center p-2 border-r w-32'>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table> */}
            </div>

        </div>
    )
}

export default ManageUsers