import React from 'react'
import FormEvaluateInfraStructure from '../../../components/user/responder/FormEvaluateInfraStructure'
import UseTitle from '../../../utills/UseTitle'

const EvaluateInfraStructure = () => {

  UseTitle('ประเมินผลด้านโครงสร้าง')
  return (
    <div>
      <FormEvaluateInfraStructure />
    </div>
  )
}

export default EvaluateInfraStructure