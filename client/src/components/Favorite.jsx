import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../global/AuthContext";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthContext);
  const userId = user?.id; // Ensure userId is defined
//   console.log("user fav ", user)
  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:5000/api/favorites/userfavorite/${userId}`)
      .then((result) => {
        console.log("favorite resuolt " ,result)
        setFavorites(result.data.favorites);
        console.log(favorites.length )
      })
      .catch((err) => console.log("Error fetching favorites product:", err));
  }, [userId]);

  // Function to remove product from cart
  const removeFromFavorites = (productId) => {
    axios
      .delete("http://localhost:5000/api/favorites/remove", {
        data: { userId, productId }, // Send data in `data` object for DELETE request
      })
      .then((result) => {
        setFavorites(result.data.cart); // Update state with new cart
      })
      .catch((err) => console.log("Error removing product:", err));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Favorite Products</h1>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div
              key={item.productId}
              className="bg-white shadow-lg rounded-lg p-5 transition-transform transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-600">Category: {item.category}</p>
              <p className="text-gray-700 font-bold">Price: ${item.price}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
              <p className={`text-sm font-medium ${item.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                {item.stock > 0 ? `In Stock: ${item.stock}` : "Out of Stock"}
              </p>
              <button
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                onClick={() => removeFromFavorites(item.productId)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">Your Favorite is Empty.</p>
      )}
    </div>
  );
};

export default Favorite;