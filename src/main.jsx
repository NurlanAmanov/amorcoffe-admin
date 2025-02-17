import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import USERCONTEXT from './Context/Listuser.jsx'
import MEHSULLARSIYAHI from './Context/ProductContext.jsx'
import { CustomAuthProvider } from './Context/Authlogin.jsx'
import SettingContex from './Context/SettingContex.jsx'


createRoot(document.getElementById('root')).render(

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

)