import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { incrProduct, decrProduct, removeProduct } from "../redux/productSlice";
import { incrProduct, decrProduct, removeProduct } from "../store/slices/ProductSlices"

const Cart = () => {
  const cart = useSelector((state) => state.products);
  const dispatch = useDispatch();
  console.log(cart);
  

  return (
    <>
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cart?.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 border-b py-2">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                    <div>
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                        <p>Price: Rs {item.price}</p>
                    </div>
                </div>
            ))}
        </div>
    </>
  );
};

export default Cart;