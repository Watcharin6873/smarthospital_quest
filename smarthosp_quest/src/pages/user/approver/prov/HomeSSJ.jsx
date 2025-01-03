import React from 'react'
import FormHomeSSJ from '../../../../components/user/approver/prov/FormHomeSSJ'
import UseTitle from '../../../../utills/UseTitle'

const HomeSSJ = () => {
  UseTitle('Dashboard')
  return (
    <div>
      <FormHomeSSJ />
    </div>
  )
}

export default HomeSSJ