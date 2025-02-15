import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Userlist from './component/Main-admin/Userlist'
import Productlist from './component/Product/Productlist'
import AddProduct from './component/Product/Addproduct'
import Categoryalist from './component/Cetogry/Categoryalist'




function App() {
  return (
    <>
<Routes>
  <Route path="/" element={<Layout />}>
  <Route path='users' element={<Userlist/>} />
  <Route path='addmehsul' element={<AddProduct/>} />
  <Route path='Productlist' element={<Productlist/>} />
  <Route path='Categoryalist' element={<Categoryalist/>} />
  </Route>
</Routes>

    </>
  )
}

export default App