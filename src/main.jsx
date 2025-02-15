import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import USERCONTEXT from './Context/Listuser.jsx'
import MEHSULLARSIYAHI from './Context/ProductContext.jsx'


createRoot(document.getElementById('root')).render(

<BrowserRouter>
<MEHSULLARSIYAHI>
<USERCONTEXT>
<App />
</USERCONTEXT>
</MEHSULLARSIYAHI>
 </BrowserRouter>

)