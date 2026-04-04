import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import AuthDataProvider from './context/authContext.jsx'
import { ToastContainer, Bounce } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
// import UserDataProvider from './context/userContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthDataProvider>
    {/* <UserDataProvider> */}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
        />
      <App />
    {/* </UserDataProvider> */}
    </AuthDataProvider>
    
    </BrowserRouter>
  </StrictMode>
)
