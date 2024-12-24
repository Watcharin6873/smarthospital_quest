import React from 'react'
import FormUserManageMent_SSJ from '../../../../components/user/approver/prov/FormUserManageMent_SSJ'
import UseTitle from '../../../../utills/UseTitle'

const SSJ_UserManagement = () => {
    UseTitle('จัดการผู้ใช้งาน (รพ.จังหวัด)')
  return (
    <div>
        <FormUserManageMent_SSJ />
    </div>
  )
}

export default SSJ_UserManagement