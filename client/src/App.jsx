import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Products from './components/Products'
import Cart from './components/Cart'
import Registration from './components/Registration'
import Bot from './components/Bot'
import Dashboard from './components/Dashboard'
import { useCookies } from 'react-cookie'
import("./App.css")
const App = () => {
  const [cookies,setCookies] = useCookies(["access_token"])
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Bot/>
        <Routes>
           <Route path='/' element = {< Home/>}/>
           <Route path='/login' element = {< Login/>}/>
           <Route path='/registration' element = {< Registration/>}/>
           <Route path='/products' element = {cookies.access_token ? <Products/>:<Home/>}/>
           <Route path='/cart' element = {< Cart/>}/>
           <Route path='/dashboard' element = {< Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
