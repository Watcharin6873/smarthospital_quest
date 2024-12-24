import React from 'react'
import FormApproveService_Zone from '../../../../components/user/approver/zone/FormApproveService_Zone'
import UseTitle from '../../../../utills/UseTitle'

const Zone_ApproveService = () => {
  UseTitle('อนุมัติด้านบริการ')
  return (
    <div>
      <FormApproveService_Zone />
    </div>
  )
}

export default Zone_ApproveService