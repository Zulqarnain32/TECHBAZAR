import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './global/AuthContext.jsx'
import store from './store/index.jsx'
import { Provider } from "react-redux"
createRoot(document.getElementById('root')).render(
   <AuthProvider>
    <Provider store = {store}>
      <App/>
    </Provider>
   </AuthProvider>
)
