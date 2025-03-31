import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ImBin2 } from "react-icons/im";
import { AuthContext } from "../global/AuthContext";

const Cart = () => {
  const [cart, setCart] = useState(null); // Initially null to differentiate between loading and empty
  const { user } = useContext(AuthContext);
  const userId = user?.id || user?._id; // Ensure it works for both normal & Google users

  useEffect(() => {
    if (!userId) {
      console.log("user id is missing")
    };

    axios
      .get(`http://localhost:5000/api/cart/usercart/${userId}`, { withCredentials: true })
      .then((result) => {
        console.log("Fetched cart:", result.data.cart);
        setCart(result.data.cart);
      })
      .catch((err) => console.log("Error fetching cart:", err));
  }, [userId]);

  useEffect(() => {
    if (cart !== null) {
      console.log("Updated cart:", cart);
      console.log("Cart length:", cart.length);
    }
  }, [cart]);

  // ✅ Function to remove product from cart
  const removeFromCart = (productId) => {
    axios
      .delete("http://localhost:5000/api/cart/remove", {
        data: { userId, productId },
        withCredentials: true, // Ensure cookies are sent with the request
      })
      .then((result) => {
        console.log("Cart after removal:", result.data.cart);
        setCart(result.data.cart);
      })
      .catch((err) => console.log("Error removing product:", err));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart</h1>
      <div className="flex items-center">
        <div className="w-[70%]">Contact Information</div>

        <div className="w-[30%]">
          {cart === null ? (
            <p className="text-center text-gray-500 text-lg">Loading...</p>
          ) : cart.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {cart.map((item) => (
                <div key={item.productId} className="flex items-center space-x-4 border-b py-2">
                  <img src={item.image} alt={item.name} className="w-20 object-cover" />
                  <div className="w-full pr-4 flex flex-col justify-between h-full">
                    <div className="flex justify-between">
                      <h2 className="text-md font-semibold">{item.name}</h2>
                      <div onClick={() => removeFromCart(item.productId)}>
                        <ImBin2 className="mt-1 cursor-pointer text-red-500" />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-bold text-xl">Rs {item.price}</div>
                      <div className="flex space-x-3 select-none">
                        <div className="h-6 w-6 border cursor-pointer hover:bg-gray-200 leading-4 text-center text-2xl">
                          -
                        </div>
                        <div>{item.quantity}</div>
                        <div className="h-6 w-6 border cursor-pointer hover:bg-gray-200 leading-5 text-center">
                          +
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart