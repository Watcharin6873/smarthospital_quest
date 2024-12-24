import React, { useState, useEffect } from 'react'
import useGlobalStore from '../../../../store/global-store'
import { getListEvaluateByZone } from '../../../../api/Evaluate'
import { Button, Divider, Empty, Form, Select } from 'antd'

const FormApproveInfrastructure_Zone = () => {

  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)
  const zone = user.zone
  const [formSearch] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [evaluateByZone, setEvaluateByZone] = useState([])
  const [searchQuery, setSearchQuery] = useState([])
  const [values, setValues] = useState({ provcode: "" })
  const [clientReady, setClientReady] = useState(false);



  useEffect(() => {
    loadListEvaluateByZone(token, zone)
    setClientReady(true);
  }, [])

  const loadListEvaluateByZone = async () => {
    setIsLoading(true)
    await getListEvaluateByZone(token, zone)
      .then(res => {
        setEvaluateByZone(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }


  const category1 = evaluateByZone.filter(f => f.category_questId === 1)

  const uniqueProv = [...new Map(category1.map(item => [item['provcode', 'provname'], item])).values()]
  const uniqueHosp = [...new Map(category1.map(item => [item['hcode', 'hospital_name'], item])).values()]

  const optionProv = uniqueProv.sort((a, b) => a - b).map((item) => ({
    value: item.provcode,
    label: item.provname
  }))

  const optionHosp = uniqueHosp.map((item) =>
    values.provcode === item.provcode
      ?
      {
        value: item.hcode,
        label: item.hospital_name + ' [' + item.hcode + ']'
      }
      : <Empty  image={Empty.PRESENTED_IMAGE_SIMPLE} />
  )

  const handleChange = (provcode) => {
    setValues({ provcode: provcode })
  }

  const handleSubmit = (fieldValue) => {
    const provcode = fieldValue.provcode
    const hcode = fieldValue.hcode
    setSearchQuery(category1.filter(f => f.provcode === provcode && f.hcode === hcode))
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Fialed: ', errorInfo)
  }
  console.log('Data: ', searchQuery)


  return (
    <div>
      <div className='flex justify-center items-center text-2xl font-bold mb-8 text-green-600'>
        <p className='ml-2'>Approve ด้านโครงสร้าง</p>
      </div>

      <div className='bg-white rounded-md shadow-md p-3'>
        <div className='flex justify-center space-x-2'>
          <Form
            name='formSearch'
            form={formSearch}
            layout='inline'
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name='provcode'
              rules={[
                {
                  required: true,
                  message: 'กรุณาเลือกจักหวัด'
                }
              ]}
            >
              <Select
                showSearch
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                placeholder='กรุณาเลือกจังหวัด...'
                options={optionProv}
                onSelect={(provcode) => handleChange(provcode)}
                style={{ width: '200px' }}
              />
            </Form.Item>
            <Form.Item
              name='hcode'
              rules={[
                {
                  required: true,
                  message: 'กรุณาเลือกหน่วยบริการ'
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
                options={optionHosp}
                style={{ width: '250px' }}
              />
            </Form.Item>
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !clientReady ||
                    !formSearch.isFieldsTouched(true) ||
                    !!formSearch.getFieldsError().filter(({ errors }) => errors.length).length
                  }
                >
                  ค้นหา
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
        <Divider />
      </div>
    </div>
  )
}

export default FormApproveInfrastructure_Zone