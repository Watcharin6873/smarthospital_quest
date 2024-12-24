import React from 'react'
import FormApprovePeople_Zone from '../../../../components/user/approver/zone/FromApprovePeople_Zone'
import UseTitle from '../../../../utills/UseTitle'

const Zone_ApprovePeople = () => {
  UseTitle('อนุมัติด้านบุคลากร')
  return (
    <div>
      <FormApprovePeople_Zone />
    </div>
  )
}

export default Zone_ApprovePeople