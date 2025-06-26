import React, { useState, useContext, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../global/AuthContext";
import { FadeLoader } from "react-spinners";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      // .get("http://localhost:5000/api/products/fetch")
      .get("https://tech-bazaar-backend.vercel.app/api/products/fetch")
      .then((result) => {
        const shuffled = [...result.data];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setProducts(shuffled);
        setFiltered(shuffled);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const handleCategory = (category) => {
    setActiveCategory(category);
    if (category === "all") {
      setFiltered(products);
    } else {
      const filteredItems = products.filter((p) => p.category === category);
      setFiltered(filteredItems);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FadeLoader color="#3B82F6" />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-5 min-h-screen">
      <div className="w-[95%] mx-auto">
        {/* Mobile: Horizontal Category Bar */}
        <div className="lg:hidden sticky top-[70px] z-2 bg-gray-100 py-2">
          <div className="grid grid-cols-4 gap-2 px-2">
            {["all", "mobile", "watch", "earbuds"].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`px-2 py-2 rounded text-sm font-medium capitalize text-center ${
                  activeCategory === cat
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {cat === "all" ? "All" : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Sidebar: Categories (Desktop) */}
          <div className="hidden lg:block w-[17%]">
            <div className="bg-white rounded p-4 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto shadow-md">
              <h2 className="font-semibold text-lg mb-4">Categories</h2>
              <ul className="space-y-2">
                {["all", "mobile", "watch", "earbuds"].map((cat) => (
                  <li
                    key={cat}
                    onClick={() => handleCategory(cat)}
                    className={`cursor-pointer px-3 py-2 rounded text-sm font-medium capitalize ${
                      activeCategory === cat
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-100 text-gray-700"
                    }`}
                  >
                    {cat === "all" ? "All Products" : cat}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Product Grid */}
          <div className="w-full lg:w-[83%]">
            {filtered.length === 0 ? (
              <p className="text-center text-gray-600">No products found.</p>
            ) : (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xs:gap-1">
                {filtered.map((product) => (
                  <div
                    key={product._id}
                    className="border bg-white p-4 rounded shadow-sm hover:shadow-md transition"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-contain mb-3"
                    />
                    <h1 className="text-sm mb-2 truncate">{product.name}</h1>
                    <div className="flex justify-between items-center text-sm">
                      <h1 className="font-semibold">RS {product.price}</h1>
                      <span className="bg-green-200 rounded px-2 py-1 flex items-center">
                        {product.rating}
                        <FaStar className="text-yellow-400 ml-1" />
                      </span>
                    </div>
                    <div className="mt-3">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white w-full py-2 rounded text-sm"
                        onClick={() => navigate(`/products/${product._id}`)}
                      >
                        Detail
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
