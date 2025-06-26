import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ImBin2 } from "react-icons/im";
import { AuthContext } from "../global/AuthContext";
import Swal from "sweetalert2";

const Cart = () => {
  const [cart, setCart] = useState(null); // Initially null to differentiate between loading and empty
  const [totalItem, setTotalItem] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [infoSaved, setInfoSaved] = useState(false);

  const { user } = useContext(AuthContext);
  const userId = user?.id || user?._id; // Ensure it works for both normal & Google users
  const [whatsApp, setWhatsApp] = useState("");
  const [address, setAddress] = useState("");

  console.log("cart Page ", user.username || user.displayName);

  useEffect(() => {
    if (!userId) {
      console.log("user id is missing");
    }

    axios
      // .get(`http://localhost:5000/api/cart/usercart/${userId}`, {
        .get(`https://tech-bazaar-backend.vercel.app/api/cart/usercart/${userId}`, {
        withCredentials: true,
      })
      .then((result) => {
        console.log("Fetched cart:", result.data.cart);
        setCart(result.data.cart);
      })
      .catch((err) => console.log("Error fetching cart:", err));
  }, [userId]);

  const getTotalItem = () => {
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItem(total);
    localStorage.setItem("totalItem", total);
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: total }));
  };

  const getTotalPrice = () => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  useEffect(() => {
    if (cart !== null) {
      console.log("Updated cart:", cart);
      console.log("Cart length:", cart.length);
      getTotalItem();
      getTotalPrice();
    }
  }, [cart]);

  // ✅ Function to remove product from cart
  const removeFromCart = (productId) => {
    axios
      // .delete("http://localhost:5000/api/cart/remove", {
        .delete("https://tech-bazaar-backend.vercel.app/api/cart/remove", {
        data: { userId, productId },
        withCredentials: true, // Ensure cookies are sent with the request
      })
      .then((result) => {
        console.log("Cart after removal:", result.data.cart);
        setCart(result.data.cart);
      })
      .catch((err) => console.log("Error removing product:", err));
  };

  const incrQuantity = (productId) => {
    axios
      .put(
        // "http://localhost:5000/api/cart/increase",
        "https://tech-bazaar-backend.vercel.app/api/cart/increase",
        { userId, productId },
        { withCredentials: true }
      )
      .then((result) => {
        console.log("Cart after increment:", result.data.cart);
        setCart(result.data.cart);
      })
      .catch((err) => console.log("Error increasing quantity:", err));
  };

  const decrQuantity = (productId) => {
    axios
      .put(
        // "http://localhost:5000/api/cart/decrease",
        "https://tech-bazaar-backend.vercel.app/api/cart/decrease",
        { userId, productId },
        { withCredentials: true }
      )
      .then((result) => {
        console.log("Cart after decrement:", result.data.cart);
        setCart(result.data.cart);
      })
      .catch((err) => console.log("Error decreasing quantity:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form data");

    axios
      // .post("http://localhost:5000/api/cart/data", {
      .post("https://tech-bazaar-backend.vercel.app/api/cart/data", {
        whatsApp,
        address,
        userId,
      })
      .then((res) => {
        console.log(res);
        console.log("frontend ok");

        // ✅ Mark info as saved
        setInfoSaved(true);

        Swal.fire({
          icon: "success",
          title: "Info Saved!",
          text: "Your WhatsApp and address were saved.",
          timer: 2000,
        });
      })
      .catch((err) => {
        console.log("error while sending data ", err);

        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Could not save your info.",
        });
      });
  };

  const confirmOrder = () => {
    if (!infoSaved) {
      Swal.fire({
        icon: "warning",
        title: "Info Not Saved",
        text: "Please save your WhatsApp number and address before placing the order.",
      });
      return;
    }

    // Proceed with checkout
    axios
      // .post("http://localhost:5000/api/cart/checkout", {
      .post("https://tech-bazaar-backend.vercel.app/api/cart/checkout", {
        userId,
        cart,
        totalPrice,
        whatsApp,
        address,
      })
      .then((res) => {
        console.log("Order response:", res.data);
        Swal.fire({
          title: "Order Placed Successfully!",
          text: "The order has been placed successfully.",
          icon: "success",
          confirmButtonText: "Continue Shopping",
          timer: 3000,
        });

        setCart([]);
        setTotalItem(0);
        setTotalPrice(0);
        localStorage.setItem("totalItem", 0);
        window.dispatchEvent(new CustomEvent("cartUpdated", { detail: 0 }));
        setInfoSaved(false); // Optional: reset after order
      })
      .catch((err) => {
        console.log("Error placing order:", err);
        Swal.fire({
          title: "Error",
          text: "Failed to place order.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex  space-x-5 mt-6 xs:flex-wrap">
        <div className="w-[70%] xs:w-[100%]">
          <form onSubmit={handleSubmit}>
            <div className=" p-6 bg-gray-200">
              <input
                className="py-1 px-2 w-[250px] text-sm h-10  border-2 focus:border-black focus:ring-7 outline-none"
                placeholder="Whatsapp Number"
                type="number"
                onChange={(e) => setWhatsApp(e.target.value)}
              />

              <div className="mt-6"></div>
            </div>
            <div className="bg-gray-200 mt-6 p-6">
              <p>Contact Information</p>
              <div>
                <input
                  className="mt-3 h-10 px-3 text-gray-400 w-full"
                  type="text"
                  value={user.username || user.displayName}
                />
                <br />
                <input
                  className="mt-3 h-10 px-3 text-gray-400 w-full"
                  type="text"
                  value={user.email}
                />
              </div>
              {/* } */}
            </div>
            <div className="bg-gray-200 mt-6 p-6">
              <p>Address Information</p>
              <div>
                <input
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  type="text"
                  className=" mt-3 h-10 px-3  w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-400 mt-4 text-white  cursor-pointer w-[100px] h-8 mx-auto"
              >
                Save
              </button>
            </div>
          </form>
        </div>

        <div className="w-[30%] xs:w-[100%] xs:mt-5">
          {cart === null ? (
            <p className="text-center text-gray-500 text-lg">
              cart is empty...
            </p>
          ) : cart.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center space-x-4 border-b py-2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 object-cover"
                  />
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
                        <div
                          onClick={() => decrQuantity(item.productId)}
                          className="h-6 w-6 border cursor-pointer hover:bg-gray-200 leading-4 text-center text-2xl"
                        >
                          -
                        </div>
                        <div>{item.quantity}</div>
                        <div
                          onClick={() => incrQuantity(item.productId)}
                          className="h-6 w-6 border cursor-pointer hover:bg-gray-200 leading-5 text-center"
                        >
                          +
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between w-[200px] mx-auto">
                <h1 className="font-bold">Total Item</h1>
                <h1 className="font-bold">{totalItem}</h1>
              </div>
              <div className="flex justify-between w-[200px] mx-auto">
                <h1 className="font-bold">Total Price</h1>
                <h1 className="font-bold">{totalPrice}</h1>
              </div>

              <button
                onClick={confirmOrder}
                disabled={!infoSaved}
                className={`w-[200px] h-10 mx-auto text-white ${
                  !infoSaved
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-400 cursor-pointer"
                }`}
              >
                Check Out
              </button>

              {!infoSaved && (
                <p className="text-sm text-red-500 text-center mt-2">
                  Please save your WhatsApp number and address first.
                </p>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg">
              Your cart is empty.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
