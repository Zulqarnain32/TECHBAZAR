import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from "./store/index.jsx"
import { Provider } from 'react-redux'
import { AuthProvider } from './global/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
   <AuthProvider store = {store}>
    <Provider store={store}>
     <App/>
    </Provider>
   </AuthProvider>
)
