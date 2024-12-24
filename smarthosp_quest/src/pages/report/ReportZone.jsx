import React from 'react'
import FormReportZone from '../../components/reports/FormReportZone'
import UseTitle from '../../utills/UseTitle'

const ReportZone = () => {
  UseTitle('รายงานผลระดับเขตฯ')
  return (
    <div>
      <FormReportZone />
    </div>
  )
}

export default ReportZone