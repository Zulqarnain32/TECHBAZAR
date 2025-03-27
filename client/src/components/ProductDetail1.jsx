import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../global/EarbirdsData";
import { IoIosStar } from "react-icons/io";
import { AuthContext } from "../global/AuthContext";
import axios from "axios"
const ProductDetail1 = () => {
    const { id } = useParams();
    const product = data.find((item) => item.id === parseInt(id));
    const navigate = useNavigate();
    const { user, addToCart } = useContext(AuthContext); // Get addToCart from context

    const [image, setImage] = useState([product.image]);

    const changeImage = (imageAddress) => {
        setImage([imageAddress]);
    };
    
    if (!product) {
      return <h1 className="text-center text-red-500">Product Not Found</h1>;
    }
    
    const { cart, setCart } = useContext(AuthContext);

    const handleAddToCart = async (product) => {
      if (!user || !user.id) {
          alert("Please log in to add items to your cart.");
          return;
      }
  
      try {
          const response = await axios.post("http://localhost:5000/api/cart/add-to-cart", {
              userId: user.id,
              product: product,
          });
  
          setCart(response.data.cart); // Update the cart in context
          localStorage.setItem("cart", JSON.stringify(response.data.cart));
      } catch (error) {
          console.error("Error adding to cart:", error);
      }
  };
  
    

    return (
        <div className="xs:w-[95%]">
            <div className="flex justify-center items-center xs:flex-wrap h-[calc(100vh-70px)] space-x-5">
                <div className="w-1/2 xs:w-full flex justify-end xs:justify-center">
                    <div>
                        <img src={image} className="w-[400px] mx-auto border-2 rounded-3xl" />
                        <div className="flex justify-center space-x-5 mt-2">
                            {product.gallary.map((prod, i) => (
                                <div key={i} className="border-2 rounded-lg p-1" onClick={() => changeImage(product.gallary[i])}>
                                    <img src={product.gallary[i]} className="w-[40px] mx-auto" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-1/2 xs:w-full">
                    <div>
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
                        <h1 className="mt-4 text-gray-400">Techbazar Price</h1>
                        <div className="text-2xl relative font-semibold">Rs <span className="text-4xl absolute top-3 left-8">{product.price}</span></div>
                        <div className="mt-7 flex space-x-16">
                            <div className="relative text-gray-400">Rs  <span className="absolute top-1 left-5"><strike> {product.oldPrice}</strike></span></div>
                            <div className="bg-green-100 text-green-600 px-3 py-1 rounded-md ">{product.off}% OFF</div>
                        </div>
                        <div className=" mt-3 space-x-2">
                            <button className="bg-orange-500 text-white w-[170px] py-2 text-sm" onClick={handleAddToCart}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail1;