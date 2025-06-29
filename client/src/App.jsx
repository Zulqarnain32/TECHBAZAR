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
import Favorite from './components/Favorite'
import ProductDetail from './components/ProductDetail'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Orders from './components/Orders'

import("./App.css")
const App = () => {
  const {user} = useContext(AuthContext)
  let isSuperAdmin = user?.role === "superAdmin";
  let isAdmin = user?.role === "admin";
  let isManager = user?.role === "manager"; 
  return (
    <>
      <BrowserRouter>
      <ToastContainer 
        position="top-center" 
        autoClose={2000}
      />
      <Navbar/>
      <Bot/>
        <Routes>
           <Route path='/' element = {< Home/>}/>
           <Route path='/login' element = {< Login/>}/>
           <Route path='/registration' element = {< Registration/>}/>
           <Route path='/products' element = {user ? <Products/>:<Login/>}/>
           {/* <Route path='/products' element = {<Products/>}/> */}
           <Route path='/products/:id' element = {<ProductDetail/>}/>
           <Route path='/cart' element = {user? < Cart/>:<Login/>}/>
           <Route path='/dashboard' element = {isAdmin && <Dashboard/>}/>
           <Route path='/favorite' element = {<Favorite/>}/>
           <Route path='/orders' element = {<Orders/>}/>
           <Route path='/forgot-password' element = {< ForgotPassword/>}/>
           <Route path="/resetPassword/:token" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
