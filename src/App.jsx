
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Userlist from './component/Main-admin/Userlist';
import Productlist from './component/Product/Productlist';
import AddProduct from './component/Product/Addproduct';
import Categoryalist from './component/Cetogry/Categoryalist';
import AddPromoCode from './component/Main-admin/Usersetting';
import Loginadmin from './component/Main-admin/Loginadmin';
import Categoryadd from './component/Cetogry/Categoryadd';
import Headbanner from './component/siteayarlar/Headbanner';
import Slogan from './component/Main-admin/Slogan';
import Tagsetting from './component/Main-admin/Tagsetting';
import Variantsetting from './component/Main-admin/Variantsetting';
import Logoupload from './component/Main-admin/Logoupload';
import Adminhome from './component/Main-admin/Adminhome';


function App() {


  return (
<>

{/* <Routes>
      {!isAuthenticated ? (
        <Route path="*" element={<Loginadmin setIsAuthenticated={setIsAuthenticated} />} />
      ) : (
        <Route path="/" element={<Layout />}>
          <Route path="users" element={<Userlist />} />
          <Route path="addmehsul" element={<AddProduct />} />
          <Route path="Productlist" element={<Productlist />} />
          <Route path="Categoryalist" element={<Categoryalist />} />
          <Route path="AddPromoCode" element={<AddPromoCode />} />
        </Route>
      )}
    </Routes> */}

<Routes>
    
    

        <Route path="/" element={<Layout />}>
          <Route path="users" element={<Userlist />} />
          <Route path="addmehsul" element={<AddProduct />} />
          <Route path="Productlist" element={<Productlist />} />
          <Route path="Categoryalist" element={<Categoryalist />} />
          <Route path="AddPromoCode" element={<AddPromoCode />} />
          <Route path="Categoryadd" element={<Categoryadd />} />
          <Route path="Headbanner" element={<Headbanner />} />
          <Route path="Tagadd" element={<Tagsetting />} />
          <Route path="Slogan" element={<Slogan />} />
          <Route path="Variantsetting" element={<Variantsetting />} />
          <Route path="Logoupload" element={<Logoupload />} />
          <Route path="Adminhome" element={<Adminhome />} />
      
        </Route>
 
    </Routes>
</>

    
  );
}

export default App;
