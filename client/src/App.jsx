import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Products from './components/Products'
import Cart from './components/Cart'
import Registration from './components/Registration'
import Bot from './components/Bot'
import("./App.css")
const App = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Bot/>
        <Routes>
           <Route path='/' element = {< Home/>}/>
           <Route path='/login' element = {< Login/>}/>
           <Route path='/registration' element = {< Registration/>}/>
           <Route path='/products' element = {< Products/>}/>
           <Route path='/cart' element = {< Cart/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
