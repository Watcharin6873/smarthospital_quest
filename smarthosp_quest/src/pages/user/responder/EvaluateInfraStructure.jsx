import React from 'react'
import FormEvaluateInfraStructure from '../../../components/user/responder/FormEvaluateInfraStructure'
import UseTitle from '../../../utills/UseTitle'
import FormEvaluateInfraStructure_v2 from '../../../components/user/responder/FormEvaluateInfraStructure_v2'

const EvaluateInfraStructure = () => {

  UseTitle('ประเมินผลด้านโครงสร้าง')
  return (
    <div>
      <FormEvaluateInfraStructure />
    </div>
  )
}

export default EvaluateInfraStructure