import React, { useContext } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Products from './components/Products'
import Cart from './components/Cart'
import Registration from './components/Registration'
import Bot from './components/Bot'
import Dashboard from './components/Dashboard'
import ForgotPassword from './components/ForgotPassword'
import { useCookies } from 'react-cookie'
import ResetPassword from './components/ResetPassword'
import { AuthContext } from './global/AuthContext'
import("./App.css")
const App = () => {
  const {user} = useContext(AuthContext)
  const [cookies,setCookies] = useCookies(["access_token"])
  let isSuperAdmin = user?.role === "superAdmin";
  let isAdmin = user?.role === "admin";
  let isManager = user?.role === "manager"; 
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Bot/>
        <Routes>
           <Route path='/' element = {< Home/>}/>
           <Route path='/login' element = {< Login/>}/>
           <Route path='/registration' element = {< Registration/>}/>
           <Route path='/products' element = {cookies.access_token ? <Products/>:<Login/>}/>
           <Route path='/cart' element = {< Cart/>}/>
           {/* <Route path='/dashboard' element = {< Dashboard/>}/> */}
           <Route path='/dashboard' element = {isAdmin && <Dashboard/>}/>
           <Route path='/forgot-password' element = {< ForgotPassword/>}/>
           <Route path="/resetPassword/:token" element={<ResetPassword />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
