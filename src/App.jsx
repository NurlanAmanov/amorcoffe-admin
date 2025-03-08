import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './Context/Authlogin'; // Adjust the import path as needed
import Layout from './layout/Layout';
import Userlist from './component/Main-admin/Userlist';
import Productlist from './component/Product/Productlist';
import AddProduct from './component/Product/Addproduct';
import Categoryalist from './component/Cetogry/Categoryalist';
import AddPromoCode from './component/Main-admin/Usersetting';
import Categoryadd from './component/Cetogry/Categoryadd';
import Headbanner from './component/siteayarlar/Headbanner';
import Slogan from './component/Main-admin/Slogan';
import Tagsetting from './component/Main-admin/Tagsetting';
import Variantsetting from './component/Main-admin/Variantsetting';
import Logoupload from './component/Main-admin/Logoupload';
import Adminhome from './component/Main-admin/Adminhome';
import SocialMedia from './component/Main-admin/Socialmedia';
import Silder from './component/Main-admin/Silder';
import Promcode from './component/Main-admin/Promcode';
import Silderlist from './component/Main-admin/Silderlist';
import LogoList from './component/Main-admin/Logolist';
import Listpromkod from './component/Main-admin/Promkodlist';
import Inbox from './component/Main-admin/İnbox';
import Notfaciton from './component/Main-admin/Notfaciton';
import Calendar from './component/Main-admin/Calendar';
import Qrnotfaciton from './component/Qrmenucompent/Qrnotfaciton';
import LoginPage from './component/admin-login/Loginpage';
import RegisterPage from './component/admin-login/Registr';
import Zodiac from './component/Main-admin/Zodiac';

// Create a Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      {/* Login as the initial route */}
      <Route path="/" element={<LoginPage />} />
      
      {/* Protected Layout Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        {/* Dashboard as the index route for authenticated users */}
        <Route index element={<Adminhome />} />
        
        {/* All other admin routes */}
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
        <Route path="SocialMedia" element={<SocialMedia />} />
        <Route path="Silder" element={<Silder />} />
        <Route path="Silderlist" element={<Silderlist />} />
        <Route path="Promakod" element={<Promcode />} />
        <Route path="Promkodlist" element={<Listpromkod />} />
        <Route path="LogoList" element={<LogoList />} />
        <Route path="inbox" element={<Inbox />} />
        <Route path="notfaciton" element={<Notfaciton />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="Qrnotfaciton" element={<Qrnotfaciton />} />
        <Route path="Registeradmin" element={<RegisterPage />} />
        <Route path="Zodiac" element={<Zodiac />} />
      </Route>
    </Routes>
  );
}

export default App;