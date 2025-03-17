import React from 'react';
import { useParams } from 'react-router-dom';
import data from '../global/EarbirdsData';

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const product = data.find(item => item.id === parseInt(id));
  console.log("entire product data ", product);
  console.log("image ", product.image);
   // Find the product by ID

  if (!product) {
    return <h1 className="text-center text-red-500">Product Not Found</h1>;
  }

  return (
    <div className="w-[95%] mx-auto my-10 bg-white p-5 shadow-md">
      <img src={product.image} alt={product.name} className="w-[200px] mx-auto" />
      <img src={product.gallary[0]} alt={product.name} className="w-[200px] mx-auto" />
      <img src={product.gallary[1]} alt={product.name} className="w-[200px] mx-auto" />

      <h1 className="text-2xl font-bold text-center mt-4">{product.name}</h1>
      <p className="text-gray-600 text-center">{product.description}</p>
      <h2 className="text-lg font-semibold text-center mt-2">RS {product.price}</h2>
      <h3 className="text-green-500 text-center">{product.rating} ⭐</h3>
    </div>
  );
};

export default ProductDetail;
