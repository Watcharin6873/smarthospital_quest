import React from 'react'
import FormReportHosp from '../../components/reports/FormReportHosp'
import UseTitle from '../../utills/UseTitle'



const ReportHosp = () => {

  UseTitle('รายงานผลการประเมิน')

  


  return (
    <div>
      <FormReportHosp />
    </div>
  )
}

export default ReportHosp