import React, { useState, useEffect } from 'react'
import useGlobalStore from '../../../../store/global-store'
import { changeStatus, getListUsersByZone } from '../../../../api/User'
import { UserCog } from 'lucide-react'
import { Input, Switch, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import dayjs from 'dayjs';
import 'dayjs/locale/th'
import buddhistExtra from 'dayjs/plugin/buddhistEra'
import { toast } from 'react-toastify';


dayjs.extend(buddhistExtra)

const FormUsermanagement_Zone = () => {

  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)
  const [listUserByZone, setListUserByZone] = useState([])
  const [searchQuery, setSearchQuery] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const zone = user.zone

  useEffect(() => {
    loadListUserZone(token, zone)
  }, [])

  const loadListUserZone = async () => {
    setIsLoading(true)
    await getListUsersByZone(token, zone)
      .then(res => {
        // console.log(res.data)
        setListUserByZone(res.data)
        setSearchQuery(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }

  const handleFilter = (e) => {
    setSearchQuery(listUserByZone.filter(f =>
      f.hcode.toLowerCase().includes(e.target.value) ||
      f.hname_th.toLowerCase().includes(e.target.value) ||
      f.firstname_th.toLowerCase().includes(e.target.value)
    ))
  }

  const data = searchQuery.map((item, index) => ({
    ...item,
    key: index
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
          <span style={{ fontSize: '14px', marginLeft:'5px' }}>{title_th} {firstname_th} {lastname_th}</span>
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
      render: (level) =>
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
      render: (role) =>
        <>
          <p style={{ fontSize: '14px' }}>{role}</p>
        </>
    },
    {
      title: 'ประเภท',
      dataIndex: 'objective',
      align: 'center',
      width: '10%',
      render: (objective) =>
        <>
          <p style={{ fontSize: '14px' }}>
            {
              objective === 'responder'
                ? 'ผู้ประเมิน รพ.'
                : objective === 'prov_approve'
                  ? 'คกก.สสจ.'
                  : objective === 'zone_approve'
                    ? 'คกก.เขตฯ'
                    : null
            }
          </p>
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
    {
      title: 'วันที่แก้ไข',
      align: 'center',
      render: ({ updatedAt }) =>
        <>
          <p style={{ fontSize: '14px' }}>
            {dayjs(updatedAt).locale('th').format('DD MMM BB')}
          </p>
        </>
    },
    // {
    //   title: 'จัดการ',
    //   align: 'center',
    //   render: ({ id }) =>
    //     <>
    //       <button
    //         className='px-4 border rounded-full py-1 bg-red-500 hover:bg-red-600 shadow-md text-white'
    //         onClick={() => handleRemove(id)}
    //       >
    //         <Trash2 size={16} />
    //       </button>
    //     </>
    // }
  ];


  const handleChangeStatus = (e, id) => {
    const values = {
      id: id,
      enabled: e
    }
    changeStatus(token, values)
      .then(res => {
        toast.success(res.data.message)
        loadListUserZone(token, zone)
      })
      .catch(err => {
        console.log(err)
      })
  }



  return (
    <div>
      <div className='flex justify-center items-center text-2xl font-bold mb-8 text-green-600'>
        <UserCog /> <p className='ml-2'>จัดการ user คกก.รพ.อัจฉริยะ ระดับจังหวัด</p>
      </div>
      <div className='border rounded-md p-2 bg-white shadow-md'>
        <div className='flex justify-between items-center p-3'>
          <div>
            <p style={{ fontSize: '14px' }}>
              จำนวนบัญชีทั้งหมด {searchQuery.length} รายการ
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
      </div>
    </div>
  )
}

export default FormUsermanagement_Zone