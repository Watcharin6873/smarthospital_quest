import React from 'react'
import { Button, Form, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const UploadFile = ({sub_questId}) => {

    console.log('SET: ',sub_questId)

    const handleChange = (e) =>{
        console.log(e.file)
    }

    return (
        <div>
            <Form>
                <Form.Item>
                    <Upload customRequest={({onSuccess})=> onSuccess('ok')} onChange={handleChange}>
                        <Button icon={<UploadOutlined />}>
                            Upload
                        </Button>
                    </Upload>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UploadFile