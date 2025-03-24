import React, { useState } from "react";
import { useParams } from "react-router-dom";
import data from "../global/EarbirdsData";
import { IoIosStar } from "react-icons/io";
import { useDispatch } from "react-redux"
import { addProduct } from "../store/slices/ProductSlices";
import { addToFav } from "../store/slices/FavoriteSlices";


const ProductDetail = () => {
  const { id } = useParams();
  const product = data.find((item) => item.id === parseInt(id));
  const [image, setImage] = useState([product.image])

  const dispatch = useDispatch()

  const handleAddToCart = (id) => {
    console.log("you click on ", data[id].name);
    dispatch(addProduct(data[id]))
  }


  const changeImage = (imageAddress) => {
    setImage([imageAddress])
  }




  const handleAddToFavorite = async (id) => {
    console.log("you clicked on ", data[id].name);
    dispatch(addToFav(data[id]))

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
                    <img src={product.gallary[i]} className="w-[40px] mx-auto" />
                  </div>

                ))
              }

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
              <div><input type="checkbox" className="w-6 h-6" /></div>
              <div className="text-sm">Add Gift Wrap  <br />
                Cost: Rs 199  <br />
                Make it Memorable - Add Gift Wrapping!</div>

              <div><img src="/assets/gift.webp" className="w-[80px]" /></div>
            </div>
            <div className=" mt-3 space-x-2">
              <button className="bg-orange-500 text-white w-[170px] py-2 text-sm" onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
              <button className="bg-blue-500 text-white w-[170px] py-2 text-sm" onClick={() => handleAddToFavorite(product.id)}>Add to Favorite</button>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default ProductDetail;

