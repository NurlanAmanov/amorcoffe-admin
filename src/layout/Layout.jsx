import React from 'react'
import { Outlet } from 'react-router-dom'
// import Adminheaders from '../component/Admin-Header/Adminheaders'
import Siderbar from '../component/Admin-Header/Siderbar'
import Header from '../component/Admin-Header/Header'


function Layout() {
  return (
    <>
    <Header/>
    <div className="flex">
    <Siderbar/>
    <Outlet/>
    </div>
   

    </>
  )
}

export default Layout