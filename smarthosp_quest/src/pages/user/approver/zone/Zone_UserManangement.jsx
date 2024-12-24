import React from 'react'
import FormUsermanagement_Zone from '../../../../components/user/approver/zone/FormUsermanagement_Zone'
import UseTitle from '../../../../utills/UseTitle'

const Zone_UserManangement = () => {
  UseTitle('จัดการผู้ใช้งาน (จังหวัด)')
  return (
    <div>
      <FormUsermanagement_Zone />
    </div>
  )
}

export default Zone_UserManangement