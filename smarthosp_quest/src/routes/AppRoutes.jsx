import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../layouts/Layout'
import Home from '../pages/Home'
import CheckList from '../pages/CheckList'
import UserGuide from '../pages/UserGuide'
import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'
import ContactUs from '../pages/ContactUs'
import ProtectRouteUser from '../routes/ProtectRouteUser'
import ProtectRouteAdmin from '../routes/ProtectRoteAdmin'
import LayoutUser from '../layouts/LayoutUser'
import HomeUser from '../pages/user/HomeUser'
import LayoutAdmin from '../layouts/LayoutAdmin'
import ManageUser from '../pages/admin/ManageUser'
import ManageTopic from '../pages/admin/ManageTopic'
import ManageQuest from '../pages/admin/ManageQuest'
import ManageSubQuest from '../pages/admin/ManageSubQuest'
import ReportCentre from '../pages/report/ReportCentre'
import LayoutUserResponder from '../layouts/LayoutUserResponder'
import LayoutProvApprover from '../layouts/LayoutProvApprover'
import LayoutZoneApprover from '../layouts/LayoutZoneApprover'
import EvaluateInfraStructure from '../pages/user/responder/EvaluateInfraStructure'
import EvaluateManagement from '../pages/user/responder/EvaluateManagement'
import EvaluateService from '../pages/user/responder/EvaluateService'
import EvaluatePeople from '../pages/user/responder/EvaluatePeople'
import ReportHosp from '../pages/report/ReportHosp'
import SSJ_UserManagement from '../pages/user/approver/prov/SSJ_UserManagement'
import SSJ_ApproveInfrastructure from '../pages/user/approver/prov/SSJ_ApproveInfrastructure'
import SSJ_ApproveManagement from '../pages/user/approver/prov/SSJ_ApproveManagement'
import SSJ_ApproveService from '../pages/user/approver/prov/SSJ_ApproveService'
import SSJ_ApprovePeople from '../pages/user/approver/prov/SSJ_ApprovePeople'
import ReportProv from '../pages/report/ReportProv'
import Zone_UserManangement from '../pages/user/approver/zone/Zone_UserManangement'
import Zone_ApproveInfrastructure from '../pages/user/approver/zone/Zone_ApproveInfrastructure'
import Zone_ApproveManagement from '../pages/user/approver/zone/Zone_ApproveManagement'
import Zone_ApprovePeople from '../pages/user/approver/zone/Zone_ApprovePeople'
import Zone_ApproveService from '../pages/user/approver/zone/Zone_ApproveService'
import ReportZone from '../pages/report/ReportZone'
import HomeSSJ from '../pages/user/approver/prov/HomeSSJ'



const router = createBrowserRouter([
  {
    path: '/smarthosp-quest/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'checklist', element: <CheckList /> },
      { path: 'user-guide', element: <UserGuide /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'contact-us', element: <ContactUs /> },
    ]
  },
  {
    path: '/smarthosp-quest/user',
    element: <ProtectRouteUser element={<LayoutUser />} />,
    children: [
      { index: true, element: <HomeUser /> },
      { path: 'contact-us', element: <ContactUs /> },
    ]
  },
  {
    path: '/smarthosp-quest/user/responder',
    element: <ProtectRouteUser element={<LayoutUserResponder />} />,
    children: [
      { index: true, element: <HomeUser /> },
      { path: 'evaluate-infrastructure', element: <EvaluateInfraStructure /> },
      { path: 'evaluate-management', element: <EvaluateManagement /> },
      { path: 'evaluate-service', element: <EvaluateService /> },
      { path: 'evaluate-people', element: <EvaluatePeople /> },
      { path: 'report-hosp', element: <ReportHosp /> },
      { path: 'contact-us', element: <ContactUs /> },
    ]
  },
  {
    path: '/smarthosp-quest/user/prov-approve',
    element: <ProtectRouteUser element={<LayoutProvApprover />} />,
    children: [
      { index: true, element: <HomeSSJ /> },
      { path: 'ssj-usermanagement', element: <SSJ_UserManagement /> },
      { path: 'ssj-approve-infrastructure', element: <SSJ_ApproveInfrastructure />},
      { path: 'ssj-approve-management', element: <SSJ_ApproveManagement /> },
      { path: 'ssj-approve-service', element: <SSJ_ApproveService /> },
      { path: 'ssj-approve-people', element: <SSJ_ApprovePeople /> },
      { path: 'report-prov', element: <ReportProv /> },
      { path: 'contact-us', element: <ContactUs /> },
    ]
  },
  {
    path: '/smarthosp-quest/user/zone-approve',
    element: <ProtectRouteUser element={<LayoutZoneApprover />} />,
    children: [
      { index: true, element: <HomeUser /> },
      {path:'zone-usermanagement', element: <Zone_UserManangement />},
      {path:'zone-approve-infrastructure', element: <Zone_ApproveInfrastructure />},
      {path:'zone-approve-management', element: <Zone_ApproveManagement />},
      {path:'zone-approve-service', element: <Zone_ApproveService />},
      {path:'zone-approve-people', element: <Zone_ApprovePeople />},
      {path:'report-zone', element: <ReportZone />},
      { path: 'contact-us', element: <ContactUs /> },
    ]
  },
  {
    path: '/smarthosp-quest/admin',
    element: <ProtectRouteAdmin element={<LayoutAdmin />} />,
    children: [
      { index: true, element: <HomeUser /> },
      { path: 'manage-user', element: <ManageUser /> },
      { path: 'manage-topic', element: <ManageTopic /> },
      { path: 'manage-quest', element: <ManageQuest /> },
      { path: 'manage-sub-quest', element: <ManageSubQuest /> },
      { path: 'report-centre', element: <ReportCentre /> },
      { path: 'contact-us', element: <ContactUs /> },
    ]
  }
])



const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default AppRoutes