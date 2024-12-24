import React from 'react'
import FormEvaluateManagement from '../../../components/user/responder/FormEvaluateManagement'
import UseTitle from '../../../utills/UseTitle'

const EvaluateManagement = () => {
  UseTitle('ประเมินด้านบริหารจัดการ')
  return (
    <div>
      <FormEvaluateManagement />
    </div>
  )
}

export default EvaluateManagement