import React from 'react'
import { Outlet } from 'react-router-dom'
// import Adminheaders from '../component/Admin-Header/Adminheaders'
import Siderbar from '../component/Admin-Header/Siderbar'


function Layout() {
  return (
    <>
    
    <div className="flex items-start justify-center mx-auto w-full">
    <Siderbar/>
    <Outlet/>
    </div>
   

    </>
  )
}

export default Layout