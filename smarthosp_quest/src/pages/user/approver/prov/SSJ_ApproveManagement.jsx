import React from 'react'
import FromApproveManagement_SSJ from '../../../../components/user/approver/prov/FormApproveManagement_SSJ'
import UseTitle from '../../../../utills/UseTitle'

const SSJ_ApproveManagement = () => {
  UseTitle('อนุมัติด้านบริหารจัดการ')
  return (
    <div>
      <FromApproveManagement_SSJ />
    </div>
  )
}

export default SSJ_ApproveManagement