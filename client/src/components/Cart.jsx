import React from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {
  const cartData = useSelector((state) => {
    return state.products
  })
  console.log(cartData);
  
  return (
    <>
      <h1>Cart page</h1>
    </>
  )
}

export default Cart
