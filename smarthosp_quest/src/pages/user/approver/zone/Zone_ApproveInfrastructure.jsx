import React from 'react'
import FormApproveInfrastructure_Zone from '../../../../components/user/approver/zone/FormApproveInfrastructure_Zone'
import UseTitle from '../../../../utills/UseTitle'

const Zone_ApproveInfrastructure = () => {
  UseTitle('อนุมัติด้านโครงสร้าง')
  return (
    <div>
      <FormApproveInfrastructure_Zone />
    </div>
  )
}

export default Zone_ApproveInfrastructure