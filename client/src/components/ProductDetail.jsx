import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import axios from "axios";
import { AuthContext } from "../global/AuthContext";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("");
  const { user } = useContext(AuthContext);
  const userId = user?.id || user?._id;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      // .get(`http://localhost:5000/api/products/${id}`)
      .get(`https://tech-bazaar-backend.vercel.app/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setImage(response.data.image);
        console.log("image ",response.data.image)
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  const handleAddToCart = (product) => {
    axios
      // .post("http://localhost:5000/api/cart/add", {
      .post("https://tech-bazaar-backend.vercel.app/api/cart/add", {
        userId,
        productId: product._id,
      })
      .then((result) => {
        if (result.data.message === "Product added") {
          toast.success("Product has been added to your cart!");
          navigate("/cart");
        }
        if (result.data.message === "product already exist") {
          toast.info("Product already exists in your cart");
          navigate("/cart");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddToFavorite = (product) => {
    axios
      // .post("http://localhost:5000/api/favorites/add", {
      .post("https://tech-bazaar-backend.vercel.app/api/favorites/add", {
        userId,
        productId: product._id,
      })
      .then((result) => {
        if (result.data.message === "Product added") {
          toast.success("Product has been added to your favorites!");
          navigate("/favorite");
        }
        if (result.data.message === "product already exist") {
          toast.info("Product already exists in your favorites");
          navigate("/favorite");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeImage = (imageAddress) => {
    setImage(imageAddress);
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FadeLoader color="#3B82F6" />
      </div>
    );
  }

  return (
    <div className="w-full py-5 px-4">
      <div className="flex flex-col lg:flex-row justify-center items-start gap-10">
        {/* Image Section */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <div className="text-center">
            <img
              src={image}
              alt="Product"
              className="w-[400px] max-w-full border-2 rounded-3xl mx-auto"
            />
            <div className="flex justify-center space-x-3 mt-3 flex-wrap">
              {product.gallary.map((img, i) => (
                <div
                  key={i}
                  tabIndex={0}
                  className="border-2 rounded-lg p-1 border-gray-200 cursor-pointer focus:border-blue-400"
                  onClick={() => changeImage(img)}
                >
                  <img src={img} className="w-[40px] mx-auto" alt="thumb" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detail Section */}
        <div className="w-full lg:w-1/3">
          <h1 className="font-semibold text-3xl">{product.name}</h1>

          <div className="flex space-x-3 bg-orange-100 mt-2 w-fit px-3 h-[30px] rounded-lg items-center">
            <div className="flex text-yellow-400 space-x-1">
              {[...Array(5)].map((_, i) => (
                <IoIosStar key={i} className="mt-1" />
              ))}
            </div>
            <div className="text-sm text-gray-800">5.0 (13 Reviews)</div>
          </div>

          <h2 className="mt-4 text-gray-400">Techbazar Price</h2>
          <div className="text-3xl font-bold text-orange-500 mt-1">
            Rs {product.price}
          </div>

          <div className="mt-3 flex items-center gap-6">
            <div className="text-gray-500 line-through text-sm">
              Rs {product.oldPrice}
            </div>
            <div className="bg-green-100 text-green-600 px-3 py-1 rounded-md text-sm">
              {product.off}% OFF
            </div>
          </div>

          <h1 className="mt-5 mb-2 font-medium">Colors</h1>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((color, i) => (
              <div
                key={i}
                tabIndex={0}
                className="w-[80px] border-2 border-gray-200 text-gray-600 focus:text-blue-500 focus:border-blue-400 rounded-lg cursor-pointer text-center py-3 px-2"
                onClick={() => changeImage(color)}
              >
                <img src={color} className="w-[40px] mx-auto" alt="color" />
                <div className="text-xs mt-2">{product.colorName[i]}</div>
              </div>
            ))}
          </div>

          {/* Gift Wrap */}
          <div className="bg-orange-100 h-[80px] w-[350px] mt-6 flex items-center justify-between px-4 rounded">
            <input type="checkbox" className="w-4 h-4" />
            <div className="text-sm ml-2">
              Cost: Rs 199 <br />
              Make it Memorable - Add Gift Wrapping!
            </div>
            <img src="/assets/gift.webp" className="w-[60px]" alt="gift" />
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              className="bg-orange-500 text-white px-6 py-2 rounded text-sm"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded text-sm"
              onClick={() => handleAddToFavorite(product)}
            >
              Add to Favorite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
