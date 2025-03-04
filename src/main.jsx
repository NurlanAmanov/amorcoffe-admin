import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import USERCONTEXT from './Context/Listuser.jsx';
import MEHSULLARSIYAHI from './Context/ProductContext.jsx';

import SettingContex from './Context/SettingContex.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Google Provider import et
import { CustomAuthProvider } from './Context/Authlogin.jsx';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="536404887411-a5dli2k6es2ah2qrao0vfbs0b3teviro.apps.googleusercontent.com">
    <BrowserRouter>
      <MEHSULLARSIYAHI>
        <CustomAuthProvider>
          <USERCONTEXT>
            <SettingContex>
              <App />
            </SettingContex>
          </USERCONTEXT>
        </CustomAuthProvider>
      </MEHSULLARSIYAHI>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
