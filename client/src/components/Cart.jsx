import React, { useState, useEffect } from "react";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // 🟢 Retrieve cart data from localStorage
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    return (
        <div>
            <h2>Cart Items</h2>
            {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                    <div key={index} className="cart-item">
                        <img src={item.image} alt={item.name} width="50" />
                        <h3>{item.name}</h3>
                        <p>Price: Rs {item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                    </div>
                ))
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
};

export default Cart;
