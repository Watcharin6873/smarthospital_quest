import React from 'react'
import FormApprovePeople_SSJ from '../../../../components/user/approver/prov/FormApprovePeople_SSJ'
import UseTitle from '../../../../utills/UseTitle'

const SSJ_ApprovePeople = () => {
  UseTitle('อนุมัติด้านบุคลากร')
  return (
    <div>
      <FormApprovePeople_SSJ />
    </div>
  )
}

export default SSJ_ApprovePeople