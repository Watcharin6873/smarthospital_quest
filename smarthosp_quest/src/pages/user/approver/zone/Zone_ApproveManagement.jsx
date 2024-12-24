import React from 'react'
import FormApproveManagement_Zone from '../../../../components/user/approver/zone/FormApproveManagement_Zone'
import UseTitle from '../../../../utills/UseTitle'

const Zone_ApproveManagement = () => {
  UseTitle('อนุมัติด้านบริหารจัดการ')
  return (
    <div>
      <FormApproveManagement_Zone />
    </div>
  )
}

export default Zone_ApproveManagement