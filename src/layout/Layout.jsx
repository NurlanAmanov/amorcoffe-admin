import React from 'react'
import { Outlet } from 'react-router-dom'
import Adminheaders from '../component/Admin-Header/Adminheaders'


function Layout() {
  return (
    <>
    <Adminheaders/>
    <Outlet/>
   

    </>
  )
}

export default Layout