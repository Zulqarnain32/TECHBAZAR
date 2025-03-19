import React, { useState } from "react";
import { useParams } from "react-router-dom";
import data from "../global/EarbirdsData";

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const product = data.find((item) => item.id === parseInt(id));
  // console.log("entire product data ", product);
  const [image,setImage] = useState([product.image])

  const changeImage = (imageAddress) => {
    setImage([imageAddress])
  }

  if (!product) {
    return <h1 className="text-center text-red-500">Product Not Found</h1>;
  }

  return (
    <div className="xs:w-[95%]">
      <div className="flex justify-center items-center xs:flex-wrap h-[calc(100vh-70px)]  space-x-5">
        <div className="w-1/2 xs:w-full  flex justify-end xs:justify-center">
          <div>
            <img
              src={image}
              className="w-[400px] mx-auto border-2 rounded-3xl"
            />
            <div className="flex justify-center space-x-5 mt-2">
              {
                product.gallary.map((prod, i) => (
                  <div 
                    key={i}
                    className="border-2 rounded-lg p-1"
                    onClick={() => changeImage(product.gallary[i])}>
                    <img src={product.gallary[i]}  className="w-[40px] mx-auto" />
                  </div>
                 
                ))
              }
               
            </div>
          </div>
        </div>
        <div className="w-1/2 xs:w-full">
          <div>
            <h1 className="font-semibold text-3xl">{product.name}</h1>
            <div className="flex space-x-3 bg-orange-50 mt-2 w-[250px] px-1">
              <div >
                ⭐⭐⭐⭐ <span>⭐</span>
              </div>
              <div>5.0</div>
              <div>13 Reviews</div>
            </div>
            <h1 className="mt-4 text-gray-400">Techbazar Price</h1>
            <div className="text-2xl relative font-semibold">Rs <span className="text-4xl absolute top-3 left-8">{product.price}</span></div>
            <div className="mt-7 flex space-x-16">
              <div className="relative text-gray-400">Rs  <span className="absolute top-1 left-5"><strike> 14,999</strike></span></div>
              <div className="bg-green-100 text-green-600 px-3 py-1 rounded-md ">68% OFF</div>
            </div>
            <h1 className="mt-3 mb-2">Colors</h1>
            <div className="flex space-x-3">
              <div className="w-[70px] border border-blue-600 rounded-md text-center py-1">
                <img src={product.image} className="w-[40px] mx-auto" />
                <div className="text-xs">Flame Orange</div>
              </div>
              <div className="w-[70px] border border-blue-600 rounded-md text-center py-1">
                <img src={product.image} className="w-[40px] mx-auto" />
                <div className="text-xs">Flame Orange</div>
              </div>
              <div className="w-[70px] border border-blue-600 rounded-md text-center py-1">
                <img src={product.image} className="w-[40px] mx-auto" />
                <div className="text-xs">Flame Orange</div>
              </div>
              <div className="w-[70px] border border-blue-600 rounded-md text-center py-1">
                <img src={product.image} className="w-[40px] mx-auto" />
                <div className="text-xs">Flame Orange</div>
              </div>
            </div>
            <div className="bg-orange-50 h-[80px] w-[308px] mt-5"></div>
            <div className=" mt-3 space-x-2">
              <button className="bg-orange-500 text-white w-[150px] py-1 text-sm">Add to Cart</button>
              <button className="bg-blue-500 text-white w-[150px] py-1 text-sm">Compare</button>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default ProductDetail;
