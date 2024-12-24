import React from 'react'
import FormReportProv from '../../components/reports/FormReportProv'
import UseTitle from '../../utills/UseTitle'

const ReportProv = () => {
  UseTitle('รายงานผลระดับจังหวัด')
  return (
    <div>
      <FormReportProv />
    </div>
  )
}

export default ReportProv