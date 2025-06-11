import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../global/AuthContext";

const Favorite = () => {
  const [favorites, setFavorites] = useState(null); // Initially null to differentiate between loading and empty
  const { user } = useContext(AuthContext);
  const userId = user?.id || user?._id;

  useEffect(() => {
    if (!userId) return;

    axios
      // .get(`http://localhost:5000/api/favorites/userfavorite/${userId}`)
      .get(`https://tech-bazaar-backend.vercel.app/api/favorites/userfavorite/${userId}`)
      .then((result) => {
        console.log("Fetched favorites:", result.data.favorites);
        setFavorites(result.data.favorites);
      })
      .catch((err) => console.log("Error fetching favorites product:", err));
  }, [userId]);

  useEffect(() => {
    if (favorites !== null) {
      console.log("Updated favorites:", favorites);
      console.log("Favorites length:", favorites.length);
    }
  }, [favorites]);

  // ✅ Function to remove product from favorites
  const removeFromFavorites = (productId) => {
    axios
      // .delete("http://localhost:5000/api/favorites/remove", {
      .delete("https://tech-bazaar-backend.vercel.app/api/favorites/remove", {
        data: { userId, productId },
      })
      .then((result) => {
        console.log("Updated favorites after removal:", result.data.favorites);
        setFavorites(result.data.favorites); // Update state correctly
      })
      .catch((err) => console.log("Error removing product:", err));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-[calc(100vh-70px)]">
      <h1 className="text-3xl font-bold text-center mb-6">
        Your Favorite Products
      </h1>

      {favorites === null ? (
        <p className="text-center text-gray-500 text-lg">Loading...</p>
      ) : favorites.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 z-0">
          {favorites.map((item) => (
            <div key={item.productId} className="bg-white shadow-lg rounded-lg p-5 transition-transform transform z-0">
              <img src={item.image} className="w-[150px] mx-auto mb-2" alt={item.name} />
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
