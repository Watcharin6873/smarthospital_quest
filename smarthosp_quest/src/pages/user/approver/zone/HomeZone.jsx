import React from 'react'
import UseTitle from '../../../../utills/UseTitle'
import FormHomeZone from '../../../../components/user/approver/zone/FormHomeZone'

const HomeZone = () => {
    UseTitle('Dashboard-zone')
  return (
    <div>
        <FormHomeZone />
    </div>
  )
}

export default HomeZone