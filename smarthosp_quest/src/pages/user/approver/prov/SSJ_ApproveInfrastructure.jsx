import React from 'react'
import FormApproveInfrastructure_SSJ from '../../../../components/user/approver/prov/FormApproveInfrastructure_SSJ'
import UseTitle from '../../../../utills/UseTitle'

const SSJ_ApproveInfrastructure = () => {
  UseTitle('อนุมัติด้านโครงสร้าง')
  return (
    <div>
      <FormApproveInfrastructure_SSJ />
    </div>
  )
}

export default SSJ_ApproveInfrastructure