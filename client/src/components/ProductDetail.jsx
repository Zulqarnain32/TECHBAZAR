import React, { useEffect, useState,useContext } from "react";
import { useParams } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import axios from "axios";
import { AuthContext } from "../global/AuthContext"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("");
  const { user } = useContext(AuthContext);
  const userId = user?.id || user?._id;
  const navigate = useNavigate()


  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setImage(response.data.image);
        // console.log("detail page ", response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  const handleAddToCart = (product) => {
    console.log(product._id)
    axios
      .post("http://localhost:5000/api/cart/add", {
        userId,
        productId: product._id,
      })
      .then((result) => {
        // console.log(result.data.cart);
        if (result.data.message === "Product added") {
          console.log("product added");
          toast.success("Product has been added to your cart!");
          navigate("/cart")
        }
        if (result.data.message === "product already exist") {
          console.log("product already exist");
          toast.info("Product already exists in your cart")
          navigate("/cart")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddToFavorite = (product) => {
    console.log("favorite ", product._id)
    axios
      .post("http://localhost:5000/api/favorites/add", {
        userId,
        productId: product._id,
      })
      .then((result) => {
        console.log(result.data.favorites);
        if (result.data.message === "Product added") {
          console.log("product added");
          toast.success("product has added to your favorite")
          navigate("/favorite")
        }
        if (result.data.message === "product already exist") {
          console.log("product already exist");
          toast.info("product has already exists to your favorite")
          navigate("/favorite")
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
    return <h1 className="text-center text-red-500">Loading Product...</h1>;
  }

  return (
    <div className="xs:w-[95%]">
      <div className="flex justify-center items-center xs:flex-wrap h-[calc(100vh-70px)] space-x-5">
        <div className="w-1/2 xs:w-full flex justify-end xs:justify-center">
          <div>
            <div>
              <img
                src={image}
                className="w-[400px] mx-auto border-2 rounded-3xl"
              />
              <div className="flex justify-center space-x-5 mt-2">
                {product.gallary.map((prod, i) => (
                  <div
                    key={i}
                    tabIndex={0}
                    className="border-2 rounded-lg p-1 border-gray-200  cursor-pointer focus:border-blue-400"
                    onClick={() => changeImage(product.gallary[i])}
                  >
                    <img
                      src={product.gallary[i]}
                      className="w-[40px] mx-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 xs:w-full">
          <h1 className="font-semibold text-3xl">{product.name}</h1>
          <div className="flex space-x-3 bg-orange-100 mt-2 w-[250px] px-1 h-[30px] rounded-lg leading-[30px]">
            <div className="flex text-yellow-400 leading-[30px] space-x-1">
              <IoIosStar className="mt-1.5" />
              <IoIosStar className="mt-1.5" />
              <IoIosStar className="mt-1.5" />
              <IoIosStar className="mt-1.5" />
              <IoIosStar className="mt-1.5" />
            </div>
            <div>5.0</div>
            <div>13 Reviews</div>
          </div>
          {/* <h2 className="text-2xl font-semibold">Rs {product.price}</h2> */}
          <h1 className="mt-4 text-gray-400">Techbazar Price</h1>
          <div className="text-2xl relative font-semibold">
            Rs{" "}
            <span className="text-4xl absolute top-3 left-8">
              {product.price}
            </span>
          </div>
          <div className="mt-7 flex space-x-16">
            <div className="relative text-gray-400">
              Rs{" "}
              <span className="absolute top-1 left-5">
                <strike> {product.oldPrice}</strike>
              </span>
            </div>
            <div className="bg-green-100 text-green-600 px-3 py-1 rounded-md ">
              {product.off}% OFF
            </div>
          </div>
          <h1 className="mt-3 mb-2">Colors</h1>
            <div className="flex space-x-3">
              {
                product.colors.map((prod, i) => (
                  <div
                    key={i}
                    tabIndex={0}
                    className="w-[80px] border-2 border-gray-200 text-gray-400 focus:text-blue-500 focus:border-blue-400 rounded-lg cursor-pointer text-center py-3 px-2"
                    onClick={() => changeImage(product.colors[i])}
                  >
                    <img src={product.colors[i]} className="w-[40px] mx-auto" />
                    <div className="text-xs text-center mt-2">
                      {product.colorName[i]}
                    </div>
                  </div>
                ))
              }
            </div>


          <div className="bg-orange-100 h-[80px] w-[400px] mt-5 flex items-center justify-between px-2">
            <div>
              <input type="checkbox" className="w-6 h-6" />
            </div>
            <div className="text-sm">
              Add Gift Wrap <br />
              Cost: Rs 199 <br />
              Make it Memorable - Add Gift Wrapping!
            </div>

            <div>
              <img src="/assets/gift.webp" className="w-[80px]" />
            </div>
          </div>

          <button
            className="bg-orange-500 text-white w-[170px] py-2 text-sm mt-3"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
          <button
            className="bg-blue-500 text-white w-[170px] py-2 text-sm mt-3 ml-2"
            onClick={() => handleAddToFavorite(product)}
          >
            Add to Favorite
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
